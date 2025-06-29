import { verify, decode } from "jsonwebtoken";
import { prisma } from "../prisma";
import { isEmpty } from "../isEmpty";

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

    const { title, content } = await req.json();

    if (!title || !content || isEmpty([title, content])) {
      return new Response("Title and content are required", { status: 400 });
    }

    const decoded: any = await decode(authHeader);

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: decoded.id,
      },
    });

    return Response.json(post, { status: 201 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
