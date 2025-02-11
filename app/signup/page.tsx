"use client";
import { useContext, useRef, useState } from "react";
import Loading from "../loadingComp";
import Error from "../Error";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { AuthContext } from "../AuthContext";

export default function Signup() {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const avatar = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const userContext = useContext(AuthContext);
  const { setUser }: any = userContext;
  return loading ? (
    <Loading />
  ) : (
    <form
      className="flex flex-col items-center justify-center gap-[3vh] h-screen"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const formData = new FormData();
        formData.append("username", username.current?.value as string);
        formData.append("password", password.current?.value as string);
        formData.append("file", avatar.current?.files?.[0] as any);
        await axios
          .post("/api/signup", formData)
          .then((res) => {
            setCookie("token", res.data.token);
            router.push("/home");
            setUser(res.data.user);
          })
          .catch((err) => {
            setError(err.response.data);
          })
          .finally(() => setLoading(false));
      }}
    >
      {error && <Error error={error} />}
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          type="text"
          className="grow"
          placeholder="Username"
          ref={username}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="password"
          className="grow"
          placeholder="Password"
          ref={password}
        />
      </label>
      <input
        type="file"
        className="input input-bordered text-center "
        accept="image/*"
        placeholder="Avatar"
        ref={avatar}
        required
      />

      <button className="btn btn-primary">SignUp</button>
    </form>
  );
}
