import { decode, verify } from "jsonwebtoken"
import { prisma } from "../../init"

export async function GET(req: Request, context: { params: { id: String }}) {
    const authHeader = req.headers.get("Authorization")?.split(' ')[1]

    if (!authHeader || !verify(authHeader, process.env.SECRET as string)) return new Response("Unauthorized")
    const id: any = await context.params.id

    const post = await prisma.post.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            author: true
        }
    })

    if (!post) return new Response("Post not found", { status: 404 })

    

    return Response.json(post)
}