"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Post } from "../types";
import InfiniteScroll from "react-infinite-scroller";
import Loading from "../custom/Loading";
import axios from "axios";
import { getCookie } from "cookies-next";
import Error from "../Error";
import Nav from "../Nav";
export default function Home() {
  const [error, setError] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
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
  return (
    <>
      <Nav />
      <InfiniteScroll
        loadMore={fetchPosts}
        hasMore={hasMore}
        loader={<Loading className="mt-[0vh]" key={1} />}
        className="flex flex-col items-center gap-[5vh] mt-[20vh]"
      >
        {posts.map((post) => (
          <Card className="w-full max-w-sm" key={post.id as number}>
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
        ))}
        {posts.length == 0 && <Error error={error} />}
      </InfiniteScroll>
    </>
  );
}
