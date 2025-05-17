"use client";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Link from "next/link";
import { btnProps, dropIn } from "./ainmations";

export default function Home() {
  return (
    <motion.div className="flex flex-col gap-4 items-center justify-center h-[90vh]">
      <h1 className="text-[2.5rem] font-bold">Welcome To Bacgram!</h1>
      <p>THE social media platform for BAC students to connect</p>
      <div className="flex gap-4 items-center justify-center">
        <motion.div
          whileHover={btnProps.whileHover}
          whileTap={btnProps.whileTap}
        >
          <Link href={"/login"}>
            <Button>LogIn</Button>
          </Link>
        </motion.div>
        <h1 className="font-bold text-[1.3rem]">OR</h1>
        <motion.div
          whileHover={btnProps.whileHover}
          whileTap={btnProps.whileTap}
        >
          <Link href={"/signup"}>
            <Button>SignUp</Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
