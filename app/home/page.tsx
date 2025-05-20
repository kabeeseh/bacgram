import { useState } from "react";
import { Post } from "../types";
import InfinateScroll from "react-infinite-scroller";
import axios from "axios";
import { getCookie } from "cookies-next";
export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    axios
      .get("/api/posts", {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        setPosts((prev) => [...prev, ...res.data]);
      });
  };
  return (
    <>
      <InfinateScroll loadMore={fetchPosts}>
        {posts.map((post) => (
          <>
            <h1>{post.title}</h1>
          </>
        ))}
      </InfinateScroll>
    </>
  );
}
