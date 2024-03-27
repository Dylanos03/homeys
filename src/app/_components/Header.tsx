import Image from "next/image";
import Logo from "../../../public/LogoMd.webp";
import { SignInButton, auth } from "@clerk/nextjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import ProfBlip from "./profileBlip";
import { api } from "~/trpc/server";

export const TopBar = async () => {
  const { userId } = auth();

  if (!userId)
    return (
      <header className="sticky left-0 top-0 z-50 flex w-screen items-center justify-between border-b-[1px] bg-brandLight px-4 pb-2 pt-6 lg:hidden">
        <Image src={Logo} alt="logo" height={40} />

        <SignInButton>
          <div className="flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1 hover:bg-brandDark hover:bg-opacity-5">
            <span className="text-md font-semibold">Sign In</span>
            <FontAwesomeIcon icon={faRightToBracket} />
          </div>
        </SignInButton>
      </header>
    );
  const profile = await api.profile.findOne.query(userId);

  if (profile)
    return (
      <header className="sticky left-0 top-0 z-50 flex w-screen items-center justify-between border-b-[1px] bg-brandLight px-4 pb-2 pt-6 lg:hidden">
        <Image src={Logo} alt="logo" height={40} />

        <div className="flex items-center gap-2">
          <Link
            href={`/users/${userId}`}
            className="relative hover:cursor-pointer"
          >
            <Image
              src={profile.image}
              alt="profile"
              width={24}
              height={24}
              className="h-8 w-8 rounded-full"
            />
          </Link>

          <Link href={"/search"} className="items-center">
            <div className="flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1 hover:bg-brandDark hover:bg-opacity-5">
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </Link>
        </div>
      </header>
    );

  return (
    <header className="sticky left-0 top-0 z-50 flex w-screen items-center justify-between border-b-[1px] bg-brandLight px-4 pb-2 pt-6 lg:hidden">
      <Image src={Logo} alt="logo" height={40} />

      <div className="flex gap-2">
        <Link
          href={`/users/create-profile`}
          className="relative hover:cursor-pointer"
        >
          <ProfBlip />
          <FontAwesomeIcon icon={faUser} />
        </Link>
        <Link href={"/search"}>
          <div className="flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1 hover:bg-brandDark hover:bg-opacity-5">
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </Link>
      </div>
    </header>
  );
};
