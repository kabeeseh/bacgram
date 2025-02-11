import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter();
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Bacgram</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 items-center">
          <li>
            <Link href={"/home"}>Home</Link>
          </li>
          <li>
            <Link href={"/add"}>Add</Link>
          </li>
          <li>
            <Link href={"/profile"}>Profile</Link>
          </li>
          <li>
            <button
              className="btn btn-ghost"
              onClick={(e) => {
                e.preventDefault();
                deleteCookie("token");
                router.push("/");
              }}
            >
              LogOut
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
