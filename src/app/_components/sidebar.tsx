"use client";

import { SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

function Sidebar() {
  const { isSignedIn } = useUser();
  return (
    <aside className="fixed left-0 top-0 flex h-full flex-col justify-between border-r-2 border-slate-200 p-8 pt-20">
      <div className="flex flex-col">
        <Link href={"/"}>Home</Link>
        <Link href={"/"}>Home</Link>
        <Link href={"/"}>Home</Link>
        <Link href={"/"}>Home</Link>
      </div>
      {isSignedIn && <SignOutButton />}
    </aside>
  );
}

export default Sidebar;
