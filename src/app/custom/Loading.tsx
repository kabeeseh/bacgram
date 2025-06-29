import { motion } from "motion/react";
export default function Loading({ className }: { className?: string }) {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        animate={{ scaleX: [1, 0.5, 1], scaleY: [1, 0.5, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className={`w-fit h-fit text-[1.5rem] text-center ${className}`}
      >
        Loading...
      </motion.div>
    </div>
  );
}
