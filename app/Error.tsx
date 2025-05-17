import { ReactNode } from "react";

export function Error({
  className,
  children,
}: {
  className?: String;
  children: ReactNode;
}) {
  return (
    <div
      className={`text-red-500 text-center flex items-center justify-center ${className}`}
    >
      {children}
    </div>
  );
}
