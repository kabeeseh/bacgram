"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRef, useState } from "react";
import Loading from "../custom/Loading";
import Nav from "../Nav";

export default function Add() {
  const title = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLInputElement>(null);
  const image = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  return loading ? (
    <Loading className="mt-[40vh]" />
  ) : (
    <>
      <Nav />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center w-screen"
      >
        <form
          className="flex items-center justify-center h-screen flex-col w-full max-w-sm gap-[2vh]"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            const formData = new FormData();
            formData.append("title", title.current?.value as string);
            formData.append("content", content.current?.value as string);
            if (image.current?.files?.[0]) {
              formData.append("image", image.current.files[0]);
            }
            axios
              .post("/api/posts", formData, {
                headers: {
                  Authorization: `Bearer ${getCookie("token")}`,
                },
              })
              .then((res) => {
                alert("Added");
              })
              .finally(() => setLoading(false));
          }}
        >
          <Input type="text" placeholder="Title" ref={title} />
          <Input type="text" placeholder="Content" ref={content} />
          <Input type="file" placeholder="Image" ref={image} accept="image/*" />
          <Button type="submit">Add</Button>
        </form>
      </motion.div>
    </>
  );
}
