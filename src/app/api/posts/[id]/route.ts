import { verify } from "jsonwebtoken";
import { prisma } from "../../prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get("Authorization")?.split(" ")[1];
    if (!authHeader || !verify(authHeader, process.env.SECRET as string)) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { id } = await params;

    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        author: true,
        likedUsers: true,
        viewedUsers: true,
      },
    });
    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    return Response.json(post);
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}
