"use client";

import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <div className="flex justify-center gap-[2vw]">
              <Link href="/signup" className="standardBtn">SignUp</Link>
              <h1 className="text-[1.7rem] font-bold">OR</h1>
              <Link href={"/login"} className="standardBtn">LogIn</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
