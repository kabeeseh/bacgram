"use client";
import { Input } from "@/components/ui/input";
import Loading from "../custom/Loading";
import ButtonCustom from "../custom/ButtonCustom";
import { useRef, useState } from "react";
import Error from "../Error";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

export default function SignUp() {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  return loading ? (
    <Loading className="mt-[40vh]" />
  ) : (
    <div className="flex items-center justify-center h-[90vh] flex-col gap-[7vh]">
      <h1 className="text-[2.5rem] text-center">SignUp</h1>
      <form
        className="flex items-center justify-center flex-col gap-[3vh]"
        onSubmit={(e) => {
          e.preventDefault();
          setError("");
          setLoading(true);
          axios
            .post("/api/signup", {
              username: username.current?.value,
              password: password.current?.value,
            })
            .then((res) => {
              setCookie("token", res.data.token);
              router.push("/home");
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
        <ButtonCustom>SignUp</ButtonCustom>
      </form>
    </div>
  );
}
