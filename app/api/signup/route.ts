import { hash } from "bcrypt"
import { isEmpty } from "../isEmpty"
import { prisma } from "../prisma"
import { sign } from "jsonwebtoken"

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json()

        if (!username || !password || isEmpty([username, password])) return new Response("Username and Password are required", { status: 400 })

        const userCheck = await prisma.user.findUnique({
            where: {username}
        })
        if (userCheck) return new Response("Username Is Taken", { status: 409})

        const user = await prisma.user.create({
            data: {
                username,
                password: await hash(password, 10)
            }
        })

        const token = await sign({ id: user.id, username }, process.env.SECRET as string)

        return Response.json({ token })
        
    } catch (error: any) {
        return new Response(error, { status: 500 })
    }
}