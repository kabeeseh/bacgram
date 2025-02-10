"use client";
import { Post } from "@prisma/client";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../loadingComp";
import Error from "../Error";
import axios from "axios";
import { getCookie } from "cookies-next";
import Nav from "../nav";

export default function Profile() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [_, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const fetchPosts = async () => {
    await axios
      .get(`/api/posts/user?page=${page}&limit=5`, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
        setPage((prev) => prev + 1);
      })
      .catch((err) => {
        setError(err.response.data);
        console.log(err);
        setLoading(false);
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
        hasMore
        loader={<Loading />}
        endMessage={<Error error={error} />}
        className="flex items-center flex-col mt-[30vh] gap-[3vh]"
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
