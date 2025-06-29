"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRef, useState } from "react";
import Loading from "../custom/Loading";
import Nav from "../Nav";

export default function Add() {
  const title = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  return loading ? (
    <Loading className="mt-[40vh]" />
  ) : (
    <>
      <Nav />
      <div className="flex justify-center w-screen">
        <form
          className="flex items-center justify-center h-screen flex-col w-full max-w-sm gap-[2vh]"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            axios
              .post(
                "/api/posts",
                {
                  title: title.current?.value,
                  content: content.current?.value,
                },
                {
                  headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                  },
                }
              )
              .then((res) => {
                alert("Added");
              })
              .finally(() => setLoading(false));
          }}
        >
          <Input type="text" placeholder="Title" ref={title} />
          <Input type="text" placeholder="Content" ref={content} />
          <Button>Add</Button>
        </form>
      </div>
    </>
  );
}
