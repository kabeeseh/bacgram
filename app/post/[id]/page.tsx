"use client"
import { Error } from "@/app/Error";
import { Loading } from "@/app/loadingComp";
import Nav from "@/app/Nav";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
    const [post, setPost] = useState<any>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const fetchPost = async () => {
        setError("")
        setLoading(true)
        await axios.get(`/api/posts/${params.id}`, {
            headers:{
                Authorization: `Bearer ${getCookie("token")}`
            }
        }).then((res) => {
            setPost(res.data)
        }).catch((err) => {
            setError(err.response.data)
        }).finally(() => {
            setLoading(false)
        })
    }
    useEffect(() => {
        fetchPost()
    }, [])

    return <>
        <Nav />
        {post ? 
        <div className="p-[5vw] flex flex-col gap-[2vh] items-center justify-center">
            <div className="flex items-center justify-center gap-2 @container">
            <div className="avatar">
                <div className="rounded-full sm:w-[8vw] lg:w-[4vw] md:w-[7vw]">
                    <img src={post.author.profileUrl} alt="" />
                </div>
            </div>
            <h1 className="sm:text-[1.2rem] sm:whitespace-nowrap">Username: {post.author.username}</h1>
            </div>
            <h1 className="text-[1.5rem]">Title: {post.title}</h1>
            <p className="text-[1.2rem]">Content: {post.content}</p>
            {post.imageUrl ? <img src={post.imageUrl} /> : null}
        </div>
         : loading ? <Loading /> : <Error error={error}/>}
    </>
}