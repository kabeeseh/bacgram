import Link from "next/link";

export default function Nav() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
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
            <button className="btn btn-ghost">LogOut</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
