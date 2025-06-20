import { decode, verify } from "jsonwebtoken"
import { prisma } from "../prisma"

export async function GET(req: Request) {
    try {
        const authHeader = req.headers.get("Authorization")?.split(' ')[1]

        if (!authHeader || !verify(authHeader, process.env.SECRET as string)) return new Response("Unauthorized", { status: 401 })

        const decoded: any = await decode(authHeader)
        const posts = await prisma.post.findMany({
            where: {
                viewedUsers:{
                    none: {
                        id: decoded.id
                    }
                },
                authorId: {
                    not: {
                        equals: decoded.id
                    }
                }
            },
            include: {
                author: true,
                viewedUsers: true
            }
        })

        if (posts.length == 0) return new Response("Posts not found", { status: 404 })

        await posts.map(async (post) => {
            await prisma.post.update({
                where: {
                    id: post.id
                },
                data: {
                    viewedUsers: {
                        connect: {
                            id: decoded.id
                        }
                    }
                }
            })
        })

        return Response.json(posts)
    } catch (error: any) {
        return new Response(error, { status: 500 })
    }
}