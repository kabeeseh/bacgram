import { decode, verify } from "jsonwebtoken";
import { prisma, supabase } from "../init";
import { isEmpty } from "../isEmpty";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization")?.split(" ")[1];

    if (!authHeader || !verify(authHeader, "secret"))
      return new Response("Unauthorized");

    const decoded: any = await decode(authHeader);

    const posts = await prisma.post.findMany({
      where: {
        authorId: {
          not: {
            equals: decoded.id,
          },
        },
        viewedUsers: {
          none: {
            id: decoded.id,
          },
        },
      },
      include: {
        author: true,
        viewedUsers: true,
      },
    });

    if (posts.length == 0)
      return new Response("No Posts Found", { status: 404 });

    return Response.json(posts);
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization")?.split(" ")[1];

    if (!authHeader || !verify(authHeader, "secret"))
      return new Response("Unauthorization", { status: 401 });

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    if (!title || !content || isEmpty([title, content]))
      return new Response("Bad Body", { status: 400 });

    const decoded: any = await decode(authHeader);

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: decoded.id,
      },
    });

    const file = formData.get("file");

    if (file) {
      const handleUpload = async () => {
        const { error } = await supabase.storage
          .from("image")
          .upload(`${post.id}`, file, {
            cacheControl: "3600",
            upsert: false,
          });

        console.log(error);

        const { data: publicUrlData } = await supabase.storage
          .from("image")
          .getPublicUrl(`${post.id}`);

        await prisma.post.update({
          where: {
            id: post.id,
          },
          data: {
            imageLink: publicUrlData.publicUrl,
          },
        });
      };

      await handleUpload();
    }

    return new Response("Created");
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}
