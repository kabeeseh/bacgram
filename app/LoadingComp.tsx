import { motion } from "motion/react";
export default function LoadingComp() {
  return (
    <motion.h1
      className="text-[2.5rem] font-bold text-center h-[90vh] flex items-center justify-center"
      animate={{ scale: [0.85, 1.05, 0.85] }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
      }}
    >
      Loading...
    </motion.h1>
  );
}
