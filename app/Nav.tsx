import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Nav() {
    const router = useRouter()
    return <nav className="flex items-center justify-center pt-[3vh]">
        <Link href="/home" className="navBtn">Home</Link>
        <Link href="/add" className="navBtn">Add</Link>
        <Link href="/profile" className="navBtn">Profile</Link>
        <button className="navBtn" onClick={() => {
            deleteCookie("token")
            router.push("/")
        }}>LogOut</button>
    </nav>
}