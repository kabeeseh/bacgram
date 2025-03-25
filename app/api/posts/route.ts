import { decode, verify } from "jsonwebtoken"
import { prisma, storage } from "../init"
import { isEmpty } from "../isEmpty"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

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

        const formData = await req.formData()
        const title = formData.get("title") as string
        const content = formData.get("content") as string
        const file: File = formData.get("file") as File

        if (!title || !content || isEmpty([title, content])) return new Response("Bad Body", { status: 400 })
            
        const decoded: any = await decode(authHeader)

        let post = await prisma.post.create({
            data: {
                title: title,
                content: content,
                authorId: decoded.id
            }
        });
        if (file) {
            const fileBuffer = await file.arrayBuffer()
            const fileRef = ref(storage, `/images/${post.id}`)
            const snapshot = await uploadBytes(fileRef, Buffer.from(fileBuffer))

            await prisma.post.update({
                where: {
                    id: post.id
                }, data: {
                    imageUrl: await getDownloadURL(snapshot.ref)
                }
            })
        }

        return Response.json(post)
    } catch (error: any) {
        return new Response(error, { status: 500 })
    }
}