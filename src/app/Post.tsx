import { ReactNode, useEffect, useState } from "react";
import type { Post, User } from "./types";
import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { getCookie } from "cookies-next";
export default function Post({ post, user }: { post: Post; user: User }) {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (post.likedUsers.some((u) => u.id === user.id)) {
      setLiked(true);
    }
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="max-w-sm"
      key={post.id as number}
    >
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardDescription>Username: {post.author.username}</CardDescription>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-[2vh]">
          <p className="text-left">{post.content}</p>
          <p>Likes: {post.likes as number}</p>
          {post.imageUrl != "" && (
            <img src={post.imageUrl as string} alt="Post Image" width={1000} />
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
  );
}
