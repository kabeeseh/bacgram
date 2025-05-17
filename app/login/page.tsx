"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import { btnProps } from "../ainmations";
import axios from "axios";
import { useRef, useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import LoadingComp from "../LoadingComp";
import { Error } from "../Error";

export default function Login() {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  return loading ? (
    <LoadingComp />
  ) : (
    <>
      <form
        className="flex flex-col gap-4 items-center justify-center h-[90vh]"
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          await axios
            .post("http://localhost:3000/api/login", {
              username: username.current?.value,
              password: password.current?.value,
            })
            .then((res) => {
              setCookie("token", res.data.token);
              router.push("/home");
            })
            .catch((err) => {
              console.log(err);

              setError(err.response.data.message);
            })
            .finally(() => setLoading(false));
        }}
      >
        {error && <Error className={""}>{error}</Error>}
        <Input
          type="text"
          placeholder="Username"
          className="w-full max-w-xs"
          ref={username}
        />
        <Input
          type="password"
          placeholder="Password"
          className="w-full max-w-xs"
          ref={password}
        />
        <motion.div
          whileHover={btnProps.whileHover}
          whileTap={btnProps.whileTap}
        >
          <Button>LogIn</Button>
        </motion.div>
      </form>
    </>
  );
}
