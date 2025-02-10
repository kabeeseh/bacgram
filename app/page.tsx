import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome To Bacgram!</h1>
            <p className="py-6">
              The best social media platform for BAC students to connect
            </p>
            <div className="flex gap-[3vw] items-center justify-center">
              <Link href={"/login"} className="btn btn-primary">
                LogIn
              </Link>
              <h1 className="font-bold text-[1.6rem]">OR</h1>
              <Link href={"/signup"} className="btn btn-primary">
                SignUp
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
