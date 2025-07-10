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
export default function Home() {
  const [error, setError] = useState("");
  const [posts, setPosts] = useState<TPost[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useUser();
  const fetchPosts = async () => {
    await axios
      .get("/api/posts/", {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        setPosts((posts) => [...posts, ...res.data]);
        setHasMore(posts.length == 0);
        console.log(res);
        localStorage.setItem("posts", JSON.stringify(res.data));
      })
      .catch((err) => {
        setError(err.response.data);
        setHasMore(false);
        console.log(err);
      });
  };
  useEffect(() => {
    if (localStorage.getItem("posts")) {
      setPosts((prev) => [
        ...prev,
        ...JSON.parse(localStorage.getItem("posts") as string),
      ]);
    }
    fetchPosts();
  }, []);
  return (
    <>
      <Nav />
      <InfiniteScroll
        next={fetchPosts}
        hasMore={hasMore}
        loader={<Loading className="mt-[0vh]" key={1} />}
        className="flex flex-col items-center gap-[5vh] pt-[20vh]"
        dataLength={posts.length}
      >
        {posts.map((post) => (
          <Post post={post} user={user as User} key={post.id as number} />
        ))}
        {<Error error={error} />}
      </InfiniteScroll>
    </>
  );
}
