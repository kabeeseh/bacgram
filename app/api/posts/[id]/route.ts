import { decode, verify } from "jsonwebtoken";
import { prisma } from "../../init";

export async function POST(
  req: Request,
  { context }: { context: { params: { id: string } } }
) {
  try {
    const authHeader = req.headers.get("Authorization")?.split(" ")[1];
    if (!authHeader || !verify(authHeader, "secret"))
      return new Response("Unauthorized", { status: 401 });

    const { id } = context.params;

    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) return new Response("Post Not found", { status: 404 });

    const decoded: any = await decode(authHeader);

    if (post.authorId != decoded.id)
      return new Response("Action not allowed", { status: 401 });

    await prisma.post.delete({
      where: {
        id,
      },
    });

    return new Response("Deleted");
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}
