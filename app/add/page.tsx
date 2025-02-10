"use client";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRef, useState } from "react";
import Nav from "../nav";
import Loading from "../loadingComp";

export default function Add() {
  const title = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLInputElement>(null);
  const userImage = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Nav />
      {loading ? (
        <Loading />
      ) : (
        <form
          className="flex flex-col items-center justify-center gap-[2vh] h-screen"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            const formData = new FormData();
            formData.append("title", title.current!.value);
            formData.append("content", content.current!.value);
            formData.append("file", userImage.current!.files![0]);

            await axios
              .post("/api/posts", formData, {
                headers: {
                  Authorization: `Bearer ${getCookie("token")}`,
                },
              })
              .then(() => {
                alert("Post Added");
              })
              .catch(() => {
                alert("Error");
              })
              .finally(() => {
                setLoading(false);
              });
          }}
        >
          <input
            type="text"
            ref={title}
            placeholder="Title"
            className="input input-bordered"
          />
          <input
            type="text"
            placeholder="Content"
            className="input input-bordered"
            ref={content}
          />
          <input
            type="file"
            accept="image/*"
            ref={userImage}
            placeholder="Image"
            className="input input-bordered"
          />
          <button className="btn">Add</button>
        </form>
      )}
    </>
  );
}
