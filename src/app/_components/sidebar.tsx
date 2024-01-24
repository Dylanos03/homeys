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
        <div className="flex flex-col gap-4 text-xl font-semibold">
          <Image
            src={logo}
            alt="logo"
            className="-translate-x-3"
            height={100}
            width={160}
          />
          <Link className="flex items-center gap-2" href={"/"}>
            <FontAwesomeIcon icon={faHouse} />
            Home
          </Link>

          <Link
            className="flex items-center gap-2"
            href={`/users/create-profile`}
          >
            <FontAwesomeIcon icon={faUser} />
            My Profile
          </Link>

          <Link className="flex items-center gap-2" href={"/"}>
            <FontAwesomeIcon icon={faMessage} />
            Messages
          </Link>
          <Link className="flex items-center gap-2" href={"/"}>
            <FontAwesomeIcon icon={faUserGroup} />
            Groups
          </Link>
        </div>
        <SignInButton>
          <div className="flex cursor-pointer items-center gap-2">
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
    <aside className="sticky top-0 hidden h-screen flex-col justify-between border-slate-200 bg-brandLight p-8  md:flex">
      <div className="flex flex-col gap-4 text-xl font-semibold">
        <Image
          src={logo}
          alt="logo"
          className="-translate-x-3"
          height={100}
          width={160}
        />
        <Link className="flex items-center gap-2" href={"/"}>
          <FontAwesomeIcon icon={faHouse} />
          Home
        </Link>
        {isProfile.data == null ? (
          <Link
            className="flex items-center gap-2"
            href={`/users/create-profile`}
          >
            <FontAwesomeIcon icon={faUser} />
            Create Profile{" "}
            {isProfile.data == null && (
              <span className="rounded-full bg-brandOrange px-4 text-brandLight">
                !
              </span>
            )}
          </Link>
        ) : (
          <Link className="flex items-center gap-2" href={`/users/${user.id}`}>
            <FontAwesomeIcon icon={faUser} />
            My Profile
          </Link>
        )}
        <Link className="flex items-center gap-2" href={"/"}>
          <FontAwesomeIcon icon={faMessage} />
          Messages
        </Link>
        <Link className="flex items-center gap-2" href={"/"}>
          <FontAwesomeIcon icon={faUserGroup} />
          Groups
        </Link>
      </div>
      <SignOutButton>
        <div className="flex cursor-pointer items-center gap-2">
          <span className="text-xl font-semibold">Sign Out</span>
          <FontAwesomeIcon icon={faRightToBracket} />
        </div>
      </SignOutButton>
    </aside>
  );
}

export default Sidebar;
