import Link from "next/link";
import ButtonCustom from "./custom/ButtonCustom";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter();
  return (
    <nav className="flex px-[2vw] justify-between">
      <h1 className="justify-start font-bold text-[1.5rem]">Bacgram</h1>
      <Link href={"/home"}>
        <ButtonCustom variant={"ghost"}>Home</ButtonCustom>
      </Link>
      <Link href={"/add"}>
        <ButtonCustom variant={"ghost"}>Add</ButtonCustom>
      </Link>
      <Link href={"/profile"}>
        <ButtonCustom variant={"ghost"}>Profile</ButtonCustom>
      </Link>
      <ButtonCustom
        variant={"ghost"}
        onClick={() => {
          deleteCookie("token");
          router.push("/");
        }}
      >
        LogOut
      </ButtonCustom>
    </nav>
  );
}
