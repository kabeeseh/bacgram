import { verify } from "jsonwebtoken";
import { prisma } from "../../prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const authHeader = req.headers.get('Authorization')?.split(' ')[1];

        if (!authHeader || !verify(authHeader, process.env.SECRET as string)) return new Response('Unauthorized', { status: 401 });

        const user = await prisma.user.findFirst({
            where: {
                id: parseInt(params.id)
            },
            include: {
                posts: true,
                viewedPosts: true
            }
        })

        if (!user) return new Response("User not found", { status: 404 })

        return Response.json(user)
    } catch (error: any) {
        return new Response(error, { status: 500 })
    }
}