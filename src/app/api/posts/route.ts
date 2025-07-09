import { verify, decode } from "jsonwebtoken";
import { prisma } from "../prisma";
import { isEmpty } from "../isEmpty";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/app/firebase";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization")?.split(" ")[1];

    if (!authHeader || !verify(authHeader, process.env.SECRET as string)) {
      return new Response("Unauthorized", { status: 401 });
    }

    const decoded: any = decode(authHeader) as {
      username: string;
      id: number;
    };

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
        viewedUsers: true,
        author: true,
        likedUsers: true,
      },
    });

    if (posts.length === 0) {
      return new Response("No posts found", { status: 404 });
    }

    await posts.map(async (post) => {
      await prisma.post.update({
        where: {
          id: post.id,
        },
        data: {
          viewedUsers: {
            connect: {
              id: decoded.id,
            },
          },
        },
      });
    });

    return Response.json(posts);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization")?.split(" ")[1];

    if (!authHeader || !verify(authHeader, process.env.SECRET as string)) {
      return new Response("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const image = formData.get("image") as File | null;

    if (!title || !content || isEmpty([title, content])) {
      return new Response("Title and content are required", { status: 400 });
    }

    const decoded: any = await decode(authHeader);

    const fileRef = ref(
      storage,
      `${process.env.imagesDir}/${image?.name}-${Date.now()}`
    );
    const snapshot = await uploadBytes(fileRef, image as Blob);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: decoded.id,
        imageUrl: image ? downloadUrl : null,
      },
    });

    return Response.json(post, { status: 201 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
