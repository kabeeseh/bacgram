import Link from "next/link";
import ButtonCustom from "./custom/ButtonCustom";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function Nav({ className }: { className?: string }) {
  const router = useRouter();
  return (
    <nav
      className={`flex justify-between items-center px-[3vw] fixed w-screen z-50 h-[10vh] top-0 left-0 ${className}`}
    >
      <h1 className="justify-start font-bold text-[1.5rem]">Bacgram</h1>
      <div className="flex items-center justify-center gap-[7vw]">
        <div className="inline-block relative h-fit group pointer-events-auto">
          <Link href={"/home"}>Home</Link>
          <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-[#d9d9d9] group-hover:w-full group-active:w-full transition-all duration-300 pointer-events-none"></span>
        </div>
        <div className="inline-block relative h-fit group pointer-events-auto">
          <Link href={"/add"}>Add</Link>
          <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-[#d9d9d9] group-hover:w-full group-active:w-full transition-all duration-300 pointer-events-none"></span>
        </div>
        <div className="inline-block relative h-fit group pointer-events-auto">
          <Link href={"/profile"}>Profile</Link>
          <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-[#d9d9d9] group-hover:w-full group-active:w-full transition-all duration-300 pointer-events-none"></span>
        </div>
        <div className="inline-block relative group">
          <button
            onClick={() => {
              deleteCookie("token");
              router.push("/");
            }}
          >
            LogOut
          </button>
          <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-[#d9d9d9] group-hover:w-full group-active:w-full transition-all duration-300 pointer-events-none"></span>
        </div>
      </div>
    </nav>
  );
}
