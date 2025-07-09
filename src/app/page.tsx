"use client";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { useEffect } from "react";

function Nav() {
  return (
    <nav className="flex justify-between items-center p-[2vw] mb-[20vh] text-[#d9d9d9] fixed w-screen">
      <Link href={"#home"} className="text-[1.66rem] font-bold">
        Bacgram
      </Link>
      <div className="text-[1.6rem] flex items-center justify-center gap-[5vw]">
        <div className="relative inline-block group">
          <Link href={"#home"}>Home</Link>
          <span className="bg-[#d9d9d9] h-0.5 w-0 absolute left-0 bottom-0 group-hover:w-full transition-all duration-200 ease-in-out"></span>
        </div>
        <div className="relative inline-block group">
          <Link href={"#about"}>About</Link>
          <span className="bg-[#d9d9d9] h-0.5 w-0 absolute left-0 bottom-0 group-hover:w-full transition-all duration-200 ease-in-out"></span>
        </div>
        <div className="relative inline-block group">
          <Link href={"#contact"}>Contact</Link>
          <span className="bg-[#d9d9d9] h-0.5 w-0 absolute left-0 bottom-0 group-hover:w-full transition-all duration-200 ease-in-out"></span>
        </div>
      </div>
    </nav>
  );
}
function Home() {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="flex items-center flex-col gap-[4vh]"
      id="home"
    >
      <h1 className="text-center text-[3.3rem] font-bold mt-[15vh]">
        Socialize Within Your School
      </h1>
      <p className="text-center md:w-[47vw] w-full text-[1.6rem]">
        <span className="important">Connect</span>,{" "}
        <span className="important">share</span>, and{" "}
        <span className="important">stay updated</span> with your classmates.
        Bacgram is THE school's private space to{" "}
        <span className="important">post moments</span>,{" "}
        <span className="important">join discussions</span>, and build{" "}
        <span className="important">lasting memories</span> throughout the
        academic year.
      </p>
      <button
        className="flex items-center group justify-between border-[#4F2DFA] border px-[4vw] py-[1vh] rounded-3xl bg-[#4F2DFA] gap-[.5vw] font-bold text-[1.6rem] hover:bg-transparent transition-colors duration-300 ease-in-out hover:text-[#4F2DFA] hover:border-[#4F2DFA] text-[#d9d9d9]"
        onClick={() => {
          router.push("/login");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="fill-[#d9d9d9] flex md:w-[2vw] w-[5vw] group-hover:fill-[#4F2DFA] transition-colors duration-300 ease-in-out"
        >
          <path d="M156.6 384.9L125.7 354c-8.5-8.5-11.5-20.8-7.7-32.2c3-8.9 7-20.5 11.8-33.8L24 288c-8.6 0-16.6-4.6-20.9-12.1s-4.2-16.7 .2-24.1l52.5-88.5c13-21.9 36.5-35.3 61.9-35.3l82.3 0c2.4-4 4.8-7.7 7.2-11.3C289.1-4.1 411.1-8.1 483.9 5.3c11.6 2.1 20.6 11.2 22.8 22.8c13.4 72.9 9.3 194.8-111.4 276.7c-3.5 2.4-7.3 4.8-11.3 7.2l0 82.3c0 25.4-13.4 49-35.3 61.9l-88.5 52.5c-7.4 4.4-16.6 4.5-24.1 .2s-12.1-12.2-12.1-20.9l0-107.2c-14.1 4.9-26.4 8.9-35.7 11.9c-11.2 3.6-23.4 .5-31.8-7.8zM384 168a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
        </svg>
        Get Started Now
      </button>
    </motion.div>
  );
}
function About() {
  return (
    <div>
      <div
        className="mt-[10vw] flex flex-col items-center justify-center gap-[4vh]"
        id="about"
      >
        <h1 className="text-center text-[3.3rem] font-bold mt-[15vh]">
          What Is Bacgram?
        </h1>
        <p className="text-[1.6rem] text-center md:w-[47vw] w-full">
          <span className="important">Bacgram</span> is a social platform
          designed exclusively for students at BAC, It allows users to{" "}
          <span className="important">share posts</span> , and{" "}
          <span className="important">stay connected</span> through a familiar,
          secure interface. Whether you're documenting school events, starting
          conversations, or just keeping in touch, Bacgram helps bring our
          student community closer together.
        </p>
      </div>
    </div>
  );
}
function Contact() {
  return (
    <div className="mt-[10vh] mb-[10vh] p-[2vw]">
      <div className="flex items-center justify-center max-w-fit gap-[.5vw]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="fill-[#d2d2d2] w-[1.5vw]"
        >
          <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
        </svg>
        <div className="group relative">
          <Link href={"tel:+96181195890"} className="text-[1.25rem]">
            +96181195890
          </Link>
          <span className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300 bg-[#d2d2d2] inline-block"></span>
        </div>
      </div>
      <div className="flex items-center justify-center max-w-fit gap-[.5w]">
        <div className="relative flex items-center justify-center gap-[.5vw]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-[1.5vw] fill-[#d2d2d2]"
          >
            <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
          </svg>
          <div className="group max-w-fit relative">
            <Link href={"mailto:jadkoneissi@gmail.com"}>
              jadkoneissi@gmail.com
            </Link>
            <span className="absolute h-0.5 w-0 bottom-0 left-0 group-hover:w-full transition-all duration-300 bg-[#d9d9d9] inline-block"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function Page() {
  return (
    <>
      <Nav />
      <Home />
      <About />
      <Contact />
    </>
  );
}
