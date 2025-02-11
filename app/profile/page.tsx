"use client";
import { Post } from "@prisma/client";
import { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../loadingComp";
import Error from "../Error";
import axios from "axios";
import { getCookie } from "cookies-next";
import Nav from "../nav";
import { Modal } from "../Modal";
import PostComp from "../Post";
import { AuthContext } from "../AuthContext";

export default function Profile() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [_, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const userContext = useContext(AuthContext);
  const { user, setUser }: any = userContext;
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
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user") as any));
    }
  }, []);
  if (!user) {
    return <Loading />;
  }
  return (
    <>
      <Nav />
      <div className="w-screen flex justify-center items-center gap-[2vw]">
        <div className="avatar">
          <div className="w-20 rounded-full">
            <img src={user.avatarLink ? user.avatarLink : ""} />
          </div>
        </div>
        <h1 className="font-semibold text-[1.6rem]">
          Username: {user.username}
        </h1>
      </div>
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
