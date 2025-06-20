import { decode, verify } from "jsonwebtoken"
import { prisma } from "@/app/api/prisma"

export async function GET(req: Request, { params }: { params: { page: string } }) {
    try {

        const authHeader = req.headers.get("Authorization")?.split(' ')[1]

        if (!authHeader || !verify(authHeader, process.env.SECRET as string)) return new Response("Unauthorized", { status: 401 })

        const decoded: any = await decode(authHeader)
        const page = params.page ? parseInt(params.page) : 1
        const skip = (page - 1) * 5;
        const posts = await prisma.post.findMany({
            where: {
                authorId: {
                        equals: decoded.id
                }
            },
            include: {
                author: true,
                viewedUsers: true
            },
            take: 5,
            skip: skip,
            orderBy: {
                createdAt: 'desc'
            }
        })

        if (posts.length == 0) return new Response("Posts not found", { status: 404 })


        return Response.json(posts)
    } catch (error: any) {
        return new Response(error, { status: 500 })
    }
}