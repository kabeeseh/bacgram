import Link from "next/link";

export default function Nav() {
    return <nav className="flex items-center justify-center pt-[3vh]">
        <Link href="/home" className="navBtn">Home</Link>
        <Link href="/add" className="navBtn">Add</Link>
        <Link href="/profile" className="navBtn">Profile</Link>
        <button className="navBtn">LogOut</button>
    </nav>
}