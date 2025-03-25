"use client"

import axios from "axios"
import { useRef, useState } from "react"
import { Loading } from "../loadingComp"
import { Error } from "../Error"
import { getCookie, setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import Nav from "../Nav"

export default function Signup() {
    const title = useRef<HTMLInputElement>(null)
    const content = useRef<HTMLInputElement>(null)
    const file = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()
    return <>
    <Nav />
    {loading ? <Loading /> :  <>
        <form className="flex flex-col items-center justify-center h-screen gap-[2vh]" onSubmit={(e) => {
            e.preventDefault()
            setLoading(true)
            setError("")
            const formData = new FormData()
            formData.append("title", title.current?.value as any)
            formData.append("content", content.current?.value as any)
            formData.append("file", file.current?.files?.[0] as any)
            axios.post("/api/posts", formData, {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`
                }
            }).then((res) => {
                setCookie("token", res.data.token)
                router.push('/home')
            }).catch((err) => {
                setError(err.response.data)
                console.log(err);
                
            }).finally(() => setLoading(false))
        }}>
            <h1 className="text-[2rem] font-bold">Create Post</h1>
            {error ? <Error error={error} className="text-[1.5rem]" /> : null}
            <input type="text" className="input bg-transparent" placeholder="Title" ref={title} />
            <input type="content" className="input bg-transparent" placeholder="Content" ref={content} />
            <input type="file" className="input bg-transparent" placeholder="Post Image" ref={file} />

            <button className="btn btn-primary btn-outline">SignUp</button>
        </form>
    </>}
    </>
}