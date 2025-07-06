import { hash } from "bcrypt";
import { isEmpty } from "../isEmpty";
import { prisma } from "../prisma";
import { sign } from "jsonwebtoken";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/app/firebase";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const profilePicture = formData.get("profile") as File;
    if (!username || !password || isEmpty([username, password])) {
      return new Response("Username and password are required", {
        status: 400,
      });
    }

    const userCheck = await prisma.user.findUnique({
      where: { username },
    });

    if (userCheck) {
      return new Response("Username already exists", { status: 400 });
    }

    const storageRef = ref(storage, `${process.env.profilePicDir}/${username}`);
    const snapshot = await uploadBytes(storageRef, profilePicture);
    const profileUrl = await getDownloadURL(snapshot.ref);
    const user = await prisma.user.create({
      data: {
        username,
        password: await hash(password, 10),
        profileUrl: profileUrl,
      },
    });

    const token = await sign(
      { id: user.id, username },
      process.env.SECRET as string
    );
    return Response.json({ token, user });
  } catch (error: any) {
    console.log(error);

    return new Response(error.message, { status: 500 });
  }
}
