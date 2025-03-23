import { compare } from "bcrypt"
import { isEmpty } from "../isEmpty"
import { prisma } from "../prisma"
import { sign } from "jsonwebtoken"

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json()

        if (!username || !password || isEmpty([username, password])) return new Response("Bad Body", { status: 400 })

        const user = await prisma.user.findFirst({
            where: {
                username
            }
        })

        if (!user) return new Response("No User Found", { status: 404 })

        const passMatches = await compare(password, user.password)

        if (!passMatches) return new Response("Password Incorrect", { status: 404 })

        const token = await sign({ id: user.id, username }, process.env.SECRET as string)

        return Response.json({ token })
    }catch (error: any) {
        return new Response(error, { status: 500 })
    }
}