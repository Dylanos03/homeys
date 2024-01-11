"use client";
import { UserButton, useUser, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

function Navbar() {
  const { isSignedIn } = useUser();
  return (
    <div className="fixed z-40 flex h-20 w-screen items-center justify-between border-b-2 border-b-slate-200 bg-brandLight px-8">
      <h1>Homeys</h1>
      <div className="flex gap-4">
        <Link href="/">Houses</Link>
        <Link href="/">People</Link>
      </div>
      {isSignedIn ? <UserButton afterSignOutUrl="/" /> : <SignInButton />}
    </div>
  );
}

export default Navbar;
