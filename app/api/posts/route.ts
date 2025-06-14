import { decode, verify } from "jsonwebtoken";
import { prisma } from "../prisma";
import { isEmpty } from "../isEmpty";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization")?.split(" ")[1];

    if (!authHeader || !verify(authHeader, process.env.JWT_SECRET as string)) {
      return new Response("Unauthorized", { status: 401 });
    }

    const decoded = decode(authHeader) as { id: number; username: string };

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
      },
    });

    if (posts.length == 0)
      return new Response("No posts found", { status: 404 });

    await posts.map(async (post) => {
      await prisma.post.update({
        where: { id: post.id },
        data: {
          viewedUsers: {
            connect: { id: decoded.id },
          },
        },
      });
    });

    return Response.json(posts);
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization")?.split(" ")[1];

    if (!authHeader || !verify(authHeader, process.env.JWT_SECRET as string)) {
      return new Response("Unauthorized", { status: 401 });
    }

    const decoded = decode(authHeader) as { id: number; username: string };

    const { title, content } = await req.json();

    if (!title || !content || isEmpty([title, content]))
      return new Response("Invalid input", { status: 400 });

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: decoded.id,
      },
      include: {
        viewedUsers: true,
        author: true,
      },
    });

    return Response.json(post);
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}
