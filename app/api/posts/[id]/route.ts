import { verify } from "jsonwebtoken";
import { prisma } from "../../init";

export async function GET(req: Request, { context }: { context: { params: Promise<{id: number}> }}) {
    try {{}
        const authHeader = req.headers.get("Authorization")?.split(' ')[1];
        
        if (!authHeader || !verify(authHeader, process.env.SECRET as string)) {
            return new Response("Unauthorized", { status: 401 });
        }

        const { id } = await context.params;

        const post = await prisma.post.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                author: true
            }
        });

        if (!post) {
            return new Response("Post not found", { status: 404 });
        }

        return new Response(JSON.stringify(post), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (error: any) {
        return new Response(error, { status: 500 });
    }
}