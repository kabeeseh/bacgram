"use client";
import Link from "next/link";
import ButtonCustom from "./custom/ButtonCustom";
import { motion } from "motion/react";
export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.1 }}
      className="flex items-center justify-center gap-[2vh] h-[90vh] flex-col text-center"
    >
      <h1 className="text-[3.5rem] font-bold text-center">
        Welcome To Bacgram!
      </h1>
      <p className="text-[1.3rem]">
        The best app for BAC students to connect and socialize
      </p>
      <div className="flex items-center justify-center gap-[8vh]">
        <ButtonCustom className="text-[1.5rem]">
          <Link href={"/login"}>LogIn</Link>
        </ButtonCustom>
        <h1 className="text-[2rem] font-bold">OR</h1>
        <ButtonCustom className="text-[1.5rem]">
          <Link href={"/signup"}>SignUp</Link>
        </ButtonCustom>
      </div>
    </motion.div>
  );
}
