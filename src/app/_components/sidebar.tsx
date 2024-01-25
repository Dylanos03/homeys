"use client";

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMessage,
  faRightToBracket,
  faUser,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../public/Logo.webp";

import Link from "next/link";
import { api } from "~/trpc/react";

import Image from "next/image";

function Sidebar() {
  const { user } = useUser();

  if (!user) {
    return (
      <aside className="sticky top-0 hidden h-screen w-[240px] flex-col justify-between border-slate-200 bg-brandLight  p-8 md:flex">
        <div className="flex flex-col  text-xl font-semibold">
          <Image src={logo} alt="logo" className="" height={100} width={160} />
          <Link
            className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-brandDark hover:bg-opacity-5"
            href={"/"}
          >
            <FontAwesomeIcon icon={faHouse} />
            Home
          </Link>

          <Link
            className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-brandDark hover:bg-opacity-5"
            href={`/users/create-profile`}
          >
            <FontAwesomeIcon icon={faUser} />
            My Profile
          </Link>

          <Link
            className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-brandDark hover:bg-opacity-5"
            href={"/"}
          >
            <FontAwesomeIcon icon={faMessage} />
            Messages
          </Link>
          <Link
            className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-brandDark hover:bg-opacity-5"
            href={"/"}
          >
            <FontAwesomeIcon icon={faUserGroup} />
            Groups
          </Link>
        </div>
        <SignInButton>
          <div className="flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1 hover:bg-brandDark hover:bg-opacity-5">
            <span className="text-xl font-semibold">Sign In</span>
            <FontAwesomeIcon icon={faRightToBracket} />
          </div>
        </SignInButton>
      </aside>
    );
  }
  const isProfile = api.profile.findOne.useQuery(user?.id ?? "");
  if (isProfile.isLoading) return <p>Loading...</p>;
  return (
    <aside className="sticky top-0 hidden h-screen w-[240px] flex-col justify-between border-slate-200 bg-brandLight p-8  md:flex">
      <div className="flex flex-col  text-xl font-semibold">
        <Image src={logo} alt="logo" className="" height={100} width={160} />
        <Link
          className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-brandDark hover:bg-opacity-5"
          href={"/"}
        >
          <FontAwesomeIcon icon={faHouse} />
          Home
        </Link>
        {isProfile.data == null ? (
          <Link
            className="relative flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-brandDark hover:bg-opacity-5"
            href={`/users/create-profile`}
          >
            <FontAwesomeIcon icon={faUser} />
            Create Profile{" "}
            {isProfile.data == null && (
              <span className="absolute -right-1 top-0 h-4 w-4 rounded-full bg-brandOrange text-sm text-brandLight"></span>
            )}
          </Link>
        ) : (
          <Link
            className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-brandDark hover:bg-opacity-5"
            href={`/users/${user.id}`}
          >
            <FontAwesomeIcon icon={faUser} />
            My Profile
          </Link>
        )}
        <Link
          className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-brandDark hover:bg-opacity-5"
          href={"/"}
        >
          <FontAwesomeIcon icon={faMessage} />
          Messages
        </Link>
        <Link
          className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-brandDark hover:bg-opacity-5"
          href={"/"}
        >
          <FontAwesomeIcon icon={faUserGroup} />
          Group
        </Link>
      </div>
      <SignOutButton>
        <div className="flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1 hover:bg-brandDark hover:bg-opacity-5">
          <span className="text-xl font-semibold">Sign Out</span>
          <FontAwesomeIcon icon={faRightToBracket} />
        </div>
      </SignOutButton>
    </aside>
  );
}

export default Sidebar;
