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
      className="flex items-center justify-center h-[90vh] flex-col gap-[7vh]"
    >
      <h1 className="text-[2.5rem] text-center">LogIn</h1>
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
            })
            .finally(() => setLoading(false));
        }}
      >
        {error && <Error error={error} />}
        <Input placeholder="Username" type="text" ref={username} />
        <Input placeholder="Password" type="password" ref={password} />
        <ButtonCustom>LogIn</ButtonCustom>
      </form>
    </motion.div>
  );
}
