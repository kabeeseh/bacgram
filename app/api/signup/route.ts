import { hash } from "bcrypt";
import { prisma, supabase } from "../init";
import { isEmpty } from "../isEmpty";
import { sign } from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const username: string = formData.get("username") as any;
    const password: string = formData.get("password") as any;

    const file = formData.get("file");
    if (!username || !password || isEmpty([username, password]) || !file)
      return new Response("Bad Body", { status: 400 });

    const userCheck = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (userCheck) return new Response("Username Taken", { status: 400 });
    const user = await prisma.user.create({
      data: {
        username: username,
        password: await hash(password, 10),
        avatarLink: "",
      },
    });

    if (file != null) {
      const handleUpload = async () => {
        const { error } = await supabase.storage
          .from("image")
          .upload(`avatar/${user.id}`, file, {
            cacheControl: "3600",
            upsert: false,
          });

        console.log(error);

        const { data: publicUrlData } = await supabase.storage
          .from("image")
          .getPublicUrl(`avatar/${user.id}`);

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            avatarLink: publicUrlData.publicUrl,
          },
        });
      };

      await handleUpload();
    }

    const user2 = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    const token = await sign({ username, id: user.id }, "secret");

    return Response.json({
      token,
      user: {
        username: user2!.username,
        avatarLink: user2!.avatarLink,
      },
    });
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}
