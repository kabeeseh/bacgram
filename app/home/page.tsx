"use client";
import { Post } from "@prisma/client";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../loadingComp";
import Error from "../Error";
import axios from "axios";
import { getCookie } from "cookies-next";
import Nav from "../nav";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [_, setLoading] = useState(false);
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
            {post.imageLink && post.imageLink != "" ? (
              <figure>
                <img src={post.imageLink as string} alt="Post Image" />
              </figure>
            ) : null}
            <div className="card-body">
              <div className="flex items-center gap-[2vw]">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src={post.author.avatarLink} />
                  </div>
                </div>
                <h1 className="font-semibold">
                  Username: {post.author.username}
                </h1>
              </div>
              <h2 className="card-title">Title: {post.title}</h2>
              <p className="capitalize">{post.content}</p>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </>
  );
}
