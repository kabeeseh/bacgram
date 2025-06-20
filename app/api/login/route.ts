import { compare } from "bcrypt"
import { isEmpty } from "../isEmpty"
import { prisma } from "../prisma"
import { sign } from "jsonwebtoken"

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json()

        if (!username || !password || isEmpty([username, password])) return new Response("Username and Password are required", { status: 400 })

        const user = await prisma.user.findUnique({
            where: {
                username
            },
            include: {
                posts: true,
                viewedPosts: true
            }
        })

        if (!user) return new Response("Username Not Found", { status: 404 })

        const passValid = await compare(password, user.password)

        if (!passValid) return new Response("Incorrect Password", { status: 400 })

        const token = await sign({ id: user.id, username }, process.env.SECRET as string)

        return Response.json({ token })
    } catch (error: any) {
        return new Response(error, { status: 500 })
    }
}