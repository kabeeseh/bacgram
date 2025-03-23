import { hash } from "bcrypt"
import { isEmpty } from "../isEmpty"
import { prisma, storage } from "../init"
import { sign } from "jsonwebtoken"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

export async function POST(req: Request) {
    try {
        const formData = await req.formData()
        const username: string = formData.get("username") as string
        const password: string = formData.get("password") as string
        const file: File = formData.get("file") as File

        
        
        if (!username || !password || isEmpty([username, password])) return new Response("Bad Body", { status: 400 })

        const userCheck = await prisma.user.findFirst({
            where: {
                username
            }
        })

        if (userCheck) return new Response("Username Taken", { status: 409 })

            if (!file) return new Response("File not uploaded", { status: 400 })
                
                const fileBuffer = await file.arrayBuffer()
                const fileRef = ref(storage, `/profiles/${username}`)
                
                const snapshot = await uploadBytes(fileRef, Buffer.from(fileBuffer))

                const user = await prisma.user.create({
                    data: {
                        username,
                        password: await hash(password, 10),
                        profileUrl: await getDownloadURL(snapshot.ref)
                    }
                })
        const token = await sign({ id: user.id, username }, process.env.SECRET as string)

        return Response.json({ token })
    } catch (error: any) {
        return new Response(error, { status: 500 })
    }
}