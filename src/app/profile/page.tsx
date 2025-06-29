"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "motion/react";
import { Post } from "../types";
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
  const [posts, setPosts] = useState<Post[]>([]);
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
          className="rounded-full w-[3vw] h-[3vw]"
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
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full max-w-sm"
            key={post.id as number}
          >
            <Card className="w-full">
              <CardHeader>
                <CardDescription>
                  Username: {post.author.username}
                </CardDescription>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{post.content}</p>
                {post.imageUrl != "" && (
                  <img
                    src={post.imageUrl as string}
                    alt="Post Image"
                    width={1000}
                  />
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
        {posts.length == 0 && <Error error={error} />}
      </InfiniteScroll>
    </>
  );
}
