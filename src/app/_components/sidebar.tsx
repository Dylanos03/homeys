"use client";

import { SignOutButton, useUser } from "@clerk/nextjs";
import { Span } from "next/dist/trace";
import Link from "next/link";
import { api } from "~/trpc/react";

function Sidebar() {
  const { user } = useUser();
  const isProfile = api.profile.findOne.useQuery(user?.id ?? "");

  if (isProfile.isLoading) return <p>Loading...</p>;

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
        {isProfile.data == null ? (
          <Link href={`/users/create-profile`} className="">
            Create Profile{" "}
            {isProfile.data == null && (
              <span className="rounded-full bg-brandOrange px-4 text-brandLight">
                !
              </span>
            )}
          </Link>
        ) : (
          <Link href={`/users/${user.id}`}>My Profile</Link>
        )}

        <Link href={"/"}>Home</Link>
        <Link href={"/"}>Home</Link>
      </div>
      <SignOutButton />
    </aside>
  );
}

export default Sidebar;
