import { prisma } from "@/app/api/prisma";
import { decode, verify } from "jsonwebtoken";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = req.headers.get("Authorization")?.split(" ")[1];

    if (!authHeader || !verify(authHeader, process.env.SECRET as string)) {
      return new Response("Unauthorized", { status: 401 });
    }

    const decoded: { username: String; id: Number } = (await decode(
      authHeader
    )) as any;
    const userId = decoded.id;
    const { id } = await params;
    const postId = parseInt(id);

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: true,
        likedUsers: true,
        viewedUsers: true,
      },
    });

    if (!post) return new Response("Post not found", { status: 404 });

    const user = await prisma.user.findUnique({
      where: {
        id: userId as number,
      },
    });

    if (!user) return new Response("User not found", { status: 404 });

    if (post.likedUsers.some((u) => u.id == userId))
      return new Response("You already liked this post", { status: 400 });

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedUsers: {
          connect: {
            id: userId as number,
          },
        },
        likes: post.likes + 1,
      },
    });
    return Response.json(updatedPost);
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}
