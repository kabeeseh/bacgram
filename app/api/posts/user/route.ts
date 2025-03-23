import { decode, verify } from "jsonwebtoken"
import { prisma } from "../../prisma"

export async function GET(req: Request) {
    try {
        const authHeader = req.headers.get("Authorization")?.split(' ')[1]

        if (!authHeader || !verify(authHeader, process.env.SECRET as string)) return new Response("Unauthorized", { status: 401 })

        const decoded: any = await decode(authHeader)

        const posts = await prisma.post.findMany({
            where: {
                authorId: decoded.id
            },
            include: {
                author: true
            }
        })

        if (posts.length == 0) return new Response("User has not posted any posts", { status: 404 })

        return Response.json(posts)
    } catch (error: any) {
        return new Response(error, { status: 500 })
    }
}