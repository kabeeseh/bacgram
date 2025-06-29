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
  const fetchPosts = async () => {
    await axios
      .get("/api/posts/", {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        setPosts((posts) => [...posts, ...res.data]);
        setHasMore(false);
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
        {<Error error={error} />}
        {posts.map((post) => (
          <Card className="w-full max-w-sm">
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
      </InfiniteScroll>
    </>
  );
}
