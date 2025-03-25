"use client"

import axios from "axios"
import { useRef, useState } from "react"
import { Loading } from "../loadingComp"
import { Error } from "../Error"
import { setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import Nav from "../Nav"

export default function Signup() {
    const username = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const file = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()
    return <>
    {loading ? <Loading /> :  <>
        <form className="flex flex-col items-center justify-center h-screen gap-[2vh]" onSubmit={(e) => {
            e.preventDefault()
            setLoading(true)
            setError("")
            const formData = new FormData()
            formData.append("username", username.current?.value as any)
            formData.append("password", password.current?.value as any)
            formData.append("file", file.current?.files?.[0] as any)
            axios.post("/api/signup", formData).then((res) => {
                setCookie("token", res.data.token)
                router.push('/home')
            }).catch((err) => {
                setError(err.response.data)
                console.log(err);
                
            }).finally(() => setLoading(false))
        }}>
            <h1 className="text-[2rem] font-bold">SignUp</h1>
            {error ? <Error error={error} className="text-[1.5rem]" /> : null}
            <input type="text" className="input bg-transparent" placeholder="Username" ref={username} />
            <input type="password" className="input bg-transparent" placeholder="Password" ref={password} />
            <input type="file" className="input bg-transparent" placeholder="Profile Picture" ref={file} />
            <button className="btn btn-primary btn-outline">SignUp</button>
        </form>
    </>}
    </>
}