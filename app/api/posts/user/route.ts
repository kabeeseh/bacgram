import { decode, verify } from "jsonwebtoken";
import { prisma } from "../../init";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization")?.split(" ")[1];
    const page = parseInt(req.nextUrl.searchParams.get("page") as any) || 1;
    const limit = parseInt(req.nextUrl.searchParams.get("limit") as any) || 5;

    const skip = (page - 1) * limit;
    if (!authHeader || !verify(authHeader, "secret"))
      return new Response("Unauthorized");

    const decoded: any = await decode(authHeader);

    const posts = await prisma.post.findMany({
      where: {
        authorId: {
          equals: decoded.id,
        },
      },
      include: {
        author: true,
        viewedUsers: true,
      },
      skip: skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    if (posts.length == 0)
      return new Response("No Posts Found", { status: 404 });

    return Response.json(posts);
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}
