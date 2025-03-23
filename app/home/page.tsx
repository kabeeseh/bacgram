'use client'

import axios from "axios"
import { getCookie } from "cookies-next"
import { useEffect, useState } from "react"
import { Error } from "../Error"
import { Loading } from "../loadingComp"
import Nav from "../Nav"

export default function Home() {
    const [posts, setPosts] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const fetchPosts = async () => {
        setLoading(true)
        await axios.get("/api/posts", {
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
    <Nav />
        {loading ? <Loading /> :
        <div className="flex flex-col items-center pt-[10vh] bg-[#0a0a0a]">
        {error ? <Error error={error} className="text-center text-[2rem] flex items-center justify-center h-screen" /> : null}
        {posts.map((post) => <div key={post.id} className="border border-solid w-fit h-fit p-[5vw] flex flex-col gap-[1vh]">
            <div className="flex items-center justify-center gap-2 @container">
            <div className="avatar">
                <div className="rounded-full sm:w-[8vw] lg:w-[4vw] md:w-[7vw]">
            <img src={post.author.profileUrl} />
                </div>
            </div>
            <h1 className="sm:text-[1.2rem] sm:whitespace-nowrap">Username: {post.author.username}</h1>
            </div>
            <h1 className="text-[1.5rem]">Title: {post.title}</h1>
            <p className="text-[1.2rem]">Content: {post.content}</p>
        </div>)}
        </div>
    }
    </>
}