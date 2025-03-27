import { verify } from "jsonwebtoken"

export async function GET(req: Request, { params }: { params: Promise<{id: Number}>}) {
    try {
        const authHeader = req.headers.get("Authorization")?.split(' ')[1]

        if (!authHeader || !verify(authHeader, process.env.SECRET as string)) return new Response("Unauthorized", { status: 401 })

        const { id } = await params
        return new Response(id as any)
    } catch (error: any) {
        return new Response(error, { status: 500 })
    }
}