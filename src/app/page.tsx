import Sidebar from "./_components/sidebar";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Feed from "./_components/Feed";
import Navbar from "./_components/navbar";
import { TopBar } from "./_components/Header";
import type { Group, Profile } from "@prisma/client";

type groupT = Group & {
  members: Profile[];
};

export type Post = {
  id: number;
  name: string;
  desc: string;
  housePost: boolean;
  authorId: string;
  createdAt: Date;
  authorName: string;
  authorImage: string;
  group: groupT | null;
  userLocation: string;
  userUniversity: string;
};

const CreatePostButton = () => {
  return (
    <Link
      href="/create-post"
      className=" fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded bg-brandOrange px-6 py-3 text-xl text-brandLight shadow-md md:bottom-12 md:right-12"
    >
      <span className="hidden md:flex">Create Post</span>
      <span className="flex md:hidden">New</span>

      <FontAwesomeIcon icon={faPenToSquare} className="w-6 " />
    </Link>
  );
};

export default async function Home() {
  return (
    <main>
      <TopBar />
      <section className="relative m-0 flex min-h-screen w-screen justify-center lg:px-4 ">
        <Sidebar />
        <Navbar name="Home" />
        <Feed />
      </section>
    </main>
  );
}
