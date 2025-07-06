"use client";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import Loading from "../custom/Loading";
import ButtonCustom from "../custom/ButtonCustom";
import { useRef, useState } from "react";
import Error from "../Error";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { useUser } from "../context/userContext";

export default function LogIn() {
  const { setUser } = useUser();
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  return loading ? (
    <Loading className="mt-[40vh]" />
  ) : (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="flex items-center justify-center md:justify-between h-[90vh] gap-[7vw] px-[3vw]"
    >
      <div className="hidden md:flex">
        <h1 className="text-[5.5rem] font-bold">Welcome Back!</h1>
      </div>
      <div className="mr-[3vw] flex flex-col gap-[3vh]">
        <h1 className="text-[2.5rem] text-center font-bold">LogIn</h1>
        <form
          className="flex items-center justify-center flex-col gap-[3vh] w-full max-w-sm"
          onSubmit={(e) => {
            e.preventDefault();
            setError("");
            setLoading(true);
            axios
              .post("/api/login", {
                username: username.current?.value,
                password: password.current?.value,
              })
              .then((res) => {
                setCookie("token", res.data.token);
                router.push("/home");
                setUser(res.data.user);
              })
              .catch((err: any) => {
                setError(err.response.data);
                setLoading(false);
              });
          }}
        >
          {error && <Error error={error} />}
          <input
            placeholder="Username"
            type="text"
            ref={username}
            className="px-[5vw] border py-[1vh] rounded-xl text-center"
          />
          <input
            placeholder="Password"
            type="password"
            ref={password}
            className="px-[5vw] border py-[1vh] rounded-xl text-center"
          />
          <button className="border px-[4vw] py-[1vh] bg-[#4F2DFA] border-[#4F2DFA] rounded text-[1.5rem] font-bold hover:bg-transparent transition-all duration-200">
            LogIn
          </button>
        </form>
      </div>
    </motion.div>
  );
}
