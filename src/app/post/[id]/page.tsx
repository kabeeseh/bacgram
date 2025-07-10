"use client";
import { useUser } from "@/app/context/userContext";
import Loading from "@/app/custom/Loading";
import Error from "@/app/Error";
import Nav from "@/app/Nav";
import { motion } from "motion/react";
import type { Post as TPost, User } from "@/app/types";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
export default function PostC({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [post, setPost] = useState<TPost>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUser();
  const [liked, setLiked] = useState<boolean>(false);
  const router = useRouter();
  const fetchPost = () => {
    setLoading(true);
    setError("");
    axios
      .get(`/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        setError(err.response.data);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    fetchPost();
  }, []);
  useEffect(() => {
    if (post && user) {
      if (post.likedUsers.some((u) => u.id == user.id)) {
        setLiked(true);
      }
    }
  }, [post, user]);
  return (
    <>
      <Nav />
      {loading ? (
        <Loading className="mt-[30vh]" />
      ) : error ? (
        <Error error={error} />
      ) : post == null ? (
        <Loading className="mt-[30vh]" />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen pt-[20vh]">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="max-w-sm text-center"
            key={post.id as number}
          >
            <Card className="w-full max-w-sm border-none flex flex-col gap-[5vh]">
              <CardHeader className="flex flex-col gap-[5vh] items-center">
                <CardDescription className="text-[1.2rem] flex items-center gap-[2vw] justify-center">
                  <img
                    src={post.author.profileUrl as string}
                    className="rounded-full w-[5vw] h-[5vw]"
                    alt=""
                  />
                  {post.author.username}
                </CardDescription>
                <CardTitle className="capitalize">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-[5vh]">
                <p className="text-left">{post.content}</p>
                <p>Likes: {post.likes as number}</p>
                {post.imageUrl != "" && (
                  <img
                    src={post.imageUrl as string}
                    alt="Post Image"
                    width={1000}
                  />
                )}
                {liked ? (
                  <button
                    onClick={() => {
                      setLiked(false);
                      post.likes = (post.likes as number) - 1;
                      axios.post(
                        `/api/posts/dislike/${post.id}`,
                        {},

                        {
                          headers: {
                            Authorization: `Bearer ${getCookie("token")}`,
                          },
                        }
                      );
                    }}
                    className="border px-[4vw] py-[1vh] bg-[#4F2DFA] border-[#4F2DFA] rounded text-[1.5rem] font-bold hover:bg-transparent transition-all duration-200"
                  >
                    Dislike
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setLiked(true);
                      post.likes = (post.likes as number) + 1;
                      axios.post(
                        `/api/posts/like/${post.id}`,
                        {},
                        {
                          headers: {
                            Authorization: `Bearer ${getCookie("token")}`,
                          },
                        }
                      );
                    }}
                    className="border px-[4vw] py-[1vh] bg-[#4F2DFA] border-[#4F2DFA] rounded text-[1.5rem] font-bold hover:bg-transparent transition-all duration-200"
                  >
                    Like
                  </button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </>
  );
}
