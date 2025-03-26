import { decode, verify } from "jsonwebtoken"
import { prisma } from "../../init"

export async function GET(req: Request, { context }: { context: { params: { id: number }}}) {
    try {
        
        const authHeader = req.headers.get("Authorization")?.split(' ')[1]
        
    if (!authHeader || !verify(authHeader, process.env.SECRET as string)) return new Response("Unauthorized")
    const { id } = await context.params

    const post = await prisma.post.findUnique({
        where: {
            id
        },
        include: {
            author: true
        }
    })

    if (!post) return new Response("Post not found", { status: 404 })

        
        
        return Response.json(post)
    } catch (error: any) {
        return new Response(error, { status: 500 })   
    }
}