"use client";
import { Post } from "@prisma/client";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../loadingComp";
import Error from "../Error";
import axios from "axios";
import { getCookie } from "cookies-next";
import Nav from "../nav";
import { Modal } from "../Modal";
import PostComp from "../Post";

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
          <PostComp post={post} key={post.id} />
        ))}
      </InfiniteScroll>
    </>
  );
}
