"use client";
import { Post } from "@prisma/client";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../loadingComp";
import Error from "../Error";
import axios from "axios";
import { getCookie } from "cookies-next";
import Image from "next/image";
import Nav from "../nav";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const fetchPosts = async () => {
    await axios
      .get("/api/posts", {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data);
        console.log(err);
        setLoading(false);
        setHasMore(false);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <>
      <Nav />
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
        loader={<Loading />}
        endMessage={<Error error={error} className={"text-[2rem]"} />}
        className="flex items-center flex-col mt-[10vh] gap-[3vh]"
      >
        {posts.map((post: any) => (
          <div
            className="card bg-base-100 w-96 shadow-2xl"
            key={post.id as string}
          >
            {post.imageLink && (
              <figure>
                <img src={post.imageLink as string} alt="Post Image" />
              </figure>
            )}
            <div className="card-body">
              <h1>Username: {post.author.username}</h1>
              <h2 className="card-title">Title: {post.title}</h2>
              <p className="capitalize">{post.content}</p>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </>
  );
}
