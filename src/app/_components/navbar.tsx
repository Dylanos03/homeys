"use client";
import { UserButton, useUser, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.webp";

function Navbar() {
  const { isSignedIn } = useUser();
  return (
    <div className="fixed z-40 flex h-20 w-screen items-center justify-between border-b-2 border-b-slate-200 bg-brandLight px-8">
      <Image src={logo} alt="logo" height={70} width={120} />
      <div className="flex gap-4 font-bold">
        <Link href="/">Houses</Link>
        <Link href="/">People</Link>
      </div>
      {isSignedIn ? <UserButton afterSignOutUrl="/" /> : <SignInButton />}
    </div>
  );
}

export default Navbar;
