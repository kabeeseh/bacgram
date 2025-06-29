import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { MouseEventHandler, ReactNode } from "react";
import { btnVariant } from "../types";
export default function ({
  children,
  className,
  variant,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  variant?: btnVariant;
  onClick?: MouseEventHandler;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={className}
      onClick={onClick}
    >
      <Button variant={variant}>{children}</Button>
    </motion.div>
  );
}
