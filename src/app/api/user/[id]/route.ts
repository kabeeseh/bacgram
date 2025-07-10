import { verify } from "jsonwebtoken";
import { prisma } from "../../prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = req.headers.get("Authorization")?.split(" ")[1];

    if (!authHeader || !verify(authHeader, process.env.SECRET as string)) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        post: {
          include: {
            author: true,
            likedUsers: true,
            viewedUsers: true,
          },
        },
      },
    });

    if (!user) return new Response("User not found", { status: 404 });

    return Response.json(user);
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}
