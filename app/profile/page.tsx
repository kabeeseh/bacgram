'use client'

import axios from "axios"
import { getCookie } from "cookies-next"
import { useEffect, useState } from "react"
import { Error } from "../Error"

export default function Home() {
    const [posts, setPosts] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const fetchPosts = async () => {
        setLoading(true)
        await axios.get("/api/posts/user", {
            headers: {
                Authorization: `Bearer ${getCookie("token")}`
            }
        }).then((res) => {
            setPosts([...posts, ...res.data])
        }).catch((err) => {
            setError(err.response.data)
        }).finally(() => setLoading(false))
    }
    useEffect(() => {
        fetchPosts()
    }, [])
    return <>
        {error ? <Error error={error} className="text-center text-[2rem] flex items-center justify-center h-screen" /> : null}
        {posts.map((post) => <div key={post.id} className="border border-solid w-fit h-fit p-[5vw]">
            {console.log(post) as any}
            <h1>Username: {post.author.username}</h1>
            <h1>Title: {post.title}</h1>
            <p>Content: {post.content}</p>
        </div>)}    
    </>
}