import { verify, decode } from "jsonwebtoken";
import { prisma } from "../../prisma";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization")?.split(" ")[1];

    if (!authHeader || !verify(authHeader, process.env.SECRET as string)) {
      return new Response("Unauthorized", { status: 401 });
    }

    const decoded: any = (await decode(authHeader)) as {
      username: string;
      id: number;
    };
    const searchParams = new URL(req.url).searchParams;
    const page = parseInt(searchParams.get("page") as any) || 1;
    const skip = (page - 1) * 5;
    const posts = await prisma.post.findMany({
      where: {
        authorId: {
          equals: decoded.id,
        },
      },
      include: {
        viewedUsers: true,
        author: true,
      },
      take: 5,
      skip: skip,
    });

    if (posts.length === 0) {
      return new Response("No posts found", { status: 404 });
    }

    return Response.json(posts);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
