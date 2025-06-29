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

export default function SignUp() {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const profilePicture = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = useUser();
  return loading ? (
    <Loading className="mt-[40vh]" />
  ) : (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1 }}
      className="flex items-center justify-center h-[90vh] flex-col gap-[7vh]"
    >
      <h1 className="text-[2.5rem] text-center">SignUp</h1>
      <form
        className="flex items-center justify-center flex-col gap-[3vh] w-full max-w-sm"
        onSubmit={(e) => {
          e.preventDefault();
          setError("");
          setLoading(true);
          const formData = new FormData();
          formData.append("username", username.current?.value as string);
          formData.append("password", password.current?.value as string);
          formData.append(
            "profile",
            profilePicture.current?.files?.[0] as File
          );
          axios
            .post("/api/signup", formData)
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
        <Input
          placeholder="Profile Picture"
          type="file"
          accept="image/*"
          ref={profilePicture}
        />
        <ButtonCustom>SignUp</ButtonCustom>
      </form>
    </motion.div>
  );
}
