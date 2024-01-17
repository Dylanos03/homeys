"use client";

import { SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

function Sidebar() {
  const { user } = useUser();
  if (!user) {
    return (
      <aside className="fixed left-0 top-0  hidden h-full flex-col justify-between border-r-2 border-slate-200 bg-brandLight p-8 pt-20 md:flex">
        <div className="flex flex-col">
          <Link href={"/"}>Home</Link>

          <Link href={"/"}>Home</Link>
          <Link href={"/"}>Home</Link>
        </div>
      </aside>
    );
  }
  return (
    <aside className="fixed left-0 top-0 hidden h-full flex-col justify-between border-r-2 border-slate-200 bg-brandLight p-8 pt-20 md:flex">
      <div className="flex flex-col">
        <Link href={"/"}>Home</Link>
        <Link href={`/users/${user.id}`}>My Profile</Link>
        <Link href={"/"}>Home</Link>
        <Link href={"/"}>Home</Link>
      </div>
      <SignOutButton />
    </aside>
  );
}

export default Sidebar;
