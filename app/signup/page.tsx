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

export default function SignUp() {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  return loading ? (
    <LoadingComp />
  ) : (
    <>
      <form
        className="flex flex-col gap-4 items-center justify-center h-[90vh]"
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          setError("");
          await axios
            .post("http://localhost:3000/api/signup", {
              username: username.current?.value,
              password: password.current?.value,
            })
            .then((res) => {
              console.log(res.data);
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
        <h1 className="text-[1.5rem] font-bold">SignUp</h1>
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
          <Button>SignUp</Button>
        </motion.div>
      </form>
    </>
  );
}
