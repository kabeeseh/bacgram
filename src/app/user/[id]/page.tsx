"use client";
import React, { SetStateAction, useEffect, useState } from "react";
import Post from "../../Post";
import type { User as TUser } from "../../types";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../custom/Loading";
import axios from "axios";
import { getCookie } from "cookies-next";
import Error from "../../Error";
import Nav from "../../Nav";
import { useUser } from "../../context/userContext";
export default function User({ params }: { params: Promise<{ id: string }> }) {
  const [error, setError] = useState("");
  const [user, setUser] = useState<TUser>();
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { id } = React.use(params);
  const userContext = useUser();
  const currentUser = userContext?.user;
  const fetchPosts = (currentPage: number) => {
    setLoading(true);
    axios
      .get(`/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        setHasMore(false);
        console.log(res.data);
      })
      .catch((err) => {
        setError(err.response.data);
        setHasMore(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchPosts(1);
  }, []);
  return (
    <>
      <Nav />
      {error && <Error error={error} className="mt-[30vh]" />}
      {user && (
        <>
          <div>
            <div className="flex flex-col items-center gap-[10vh] mb-[10vh]">
              <div className="mt-[20vh]">
                <div className="flex items-center justify-center gap-[1vw]">
                  <img
                    src={user?.profileUrl as string}
                    className="rounded-full md:w-[3vw] md:h-[3vw] h-[8vw] w-[8vw]"
                  />
                  <h1 className="text-[1.5rem] text-center font-semibold capitalize">
                    {user?.username}
                  </h1>
                </div>
              </div>
            </div>
            <InfiniteScroll
              dataLength={user.post.length as number}
              next={() => {}}
              hasMore={hasMore}
              loader={loading ? <Loading className="mt-[30vh]" /> : null}
              className="flex flex-col items-center gap-[2vh]"
            >
              {user &&
                user.post.map((post) => (
                  <Post
                    post={post}
                    user={currentUser as TUser}
                    key={post.id as number}
                  />
                ))}
            </InfiniteScroll>
            {user?.post.length == 0 && (
              <Error
                error={"This User Hasn't posted any posts"}
                className="mt-[20vh] text-[2rem]"
              />
            )}
          </div>
        </>
      )}
    </>
  );
}
