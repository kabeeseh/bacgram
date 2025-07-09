"use client";
import { useEffect, useState } from "react";
import Post from "../Post";
import type { Post as TPost, User } from "../types";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../custom/Loading";
import axios from "axios";
import { getCookie } from "cookies-next";
import Error from "../Error";
import Nav from "../Nav";
import { useUser } from "../context/userContext";
import Image from "next/image";
export default function Profile() {
  const [error, setError] = useState("");
  const [posts, setPosts] = useState<TPost[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { user } = useUser();
  const fetchPosts = async () => {
    await axios
      .get(`/api/posts/user?page=${page}`, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        setPosts((posts) => [...posts, ...res.data]);
        setHasMore(res.data.length > 0);
        setPage((page) => page + 1);
        console.log(res.data);
      })
      .catch((err) => {
        setError(err.response.data);
        setHasMore(false);
      });
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <>
      <Nav />
      <div className="flex items-center justify-center mt-[10vh] gap-[1vw]">
        <img
          src={user?.profileUrl as string}
          className="rounded-full md:w-[3vw] md:h-[3vw] h-[8vw] w-[8vw]"
        />
        <h1 className="text-[1.5rem] text-center font-semibold capitalize">
          {user?.username}
        </h1>
      </div>
      <InfiniteScroll
        next={fetchPosts}
        dataLength={posts.length}
        hasMore={hasMore}
        loader={<Loading className="mt-[0vh]" key={1} />}
        className="flex flex-col items-center gap-[5vh] mt-[15vh]"
      >
        {posts.map((post) => (
          <Post key={post.id as number} post={post} user={user as User} />
        ))}
        {posts.length == 0 && <Error error={error} />}
      </InfiniteScroll>
    </>
  );
}
