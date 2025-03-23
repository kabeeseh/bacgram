import { decode, verify } from "jsonwebtoken"
import { prisma } from "../init"
import { isEmpty } from "../isEmpty"

export async function GET(req: Request) {
    try {
        const authHeader = req.headers.get("Authorization")?.split(' ')[1]

        if (!authHeader || !verify(authHeader, process.env.SECRET as string)) return new Response("Unauthorized", { status: 401 })
            
        const decoded: any = await decode(authHeader)

        const posts = await prisma.post.findMany({
            where: {
                authorId: {
                    not: {
                        equals: decoded.id
                    }
                }
            },
            include: {
                author: true
            }
        })

        if (posts.length == 0) return new Response("No Posts Found", { status: 404 })

        return Response.json(posts)
        
    } catch (error: any) {
        return new Response(error, { status: 500 })
    }
}
export async function POST(req: Request) {
    try {
        const authHeader = req.headers.get("Authorization")?.split(' ')[1]

        if (!authHeader || !verify(authHeader, process.env.SECRET as string)) return new Response("Unauthorized", { status: 401 })

        const { title, content } = await req.json()

        if (!title || !content || isEmpty([title, content])) return new Response("Bad Body", { status: 400 })
            
        const decoded: any = await decode(authHeader)

        const post = await prisma.post.create({
            data: {
                title: title,
                content: content,
                authorId: decoded.id
            }
        })

        return Response.json(post)
    } catch (error: any) {
        return new Response(error, { status: 500 })
    }
}