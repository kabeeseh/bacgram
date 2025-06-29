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
      <h1 className="text-[1.5rem] text-center mt-[20vh] font-semibold capitalize">
        Hello {user?.username}!
      </h1>
      <InfiniteScroll
        next={fetchPosts}
        dataLength={posts.length}
        hasMore={hasMore}
        loader={<Loading className="mt-[0vh]" key={1} />}
        className="flex flex-col items-center gap-[5vh] mt-[5vh]"
      >
        {posts.map((post) => (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full max-w-sm"
          >
            <Card className="w-full" key={post.id as number}>
              <CardHeader>
                <CardDescription>
                  Username: {post.author.username}
                </CardDescription>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{post.content}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        {posts.length == 0 && <Error error={error} />}
      </InfiniteScroll>
    </>
  );
}
