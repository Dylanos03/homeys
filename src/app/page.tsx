import { api } from "~/trpc/server";
import Sidebar from "./_components/sidebar";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import PostCard from "./_components/PostCard";

export type Post = {
  id: number;
  name: string;
  desc: string;
  housePost: boolean;
  authorId: string;
  createdAt: Date;
  authorName: string;
  authorImage: string;
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
  const data = await api.post.getAll.query();

  return (
    <main className="relative m-0 flex min-h-screen w-screen justify-center  px-4 ">
      <Sidebar />
      <CreatePostButton />
      <div className="flex w-[720px] flex-col border-x-2">
        <div className="sticky top-0 flex w-full justify-between gap-3 border-b-2 border-slate-100 bg-brandLight px-4 font-semibold">
          <Link
            className="flex w-1/2 justify-center border-r-2 py-2 "
            href={"/"}
          >
            People
          </Link>
          <Link
            className="flex w-1/2 justify-center border-r-2 py-2"
            href={"/"}
          >
            Houses
          </Link>
          <button>
            <FontAwesomeIcon icon={faFilter} style={{ color: "#bd5103" }} />
          </button>
        </div>
        {data.length === 0 && (
          <div className="mt-8 flex w-full flex-col items-center gap-3 border-b-2 border-slate-100 p-4 px-4   text-brandDark">
            <h3>It&apos;s pretty quiet in here...</h3>
            <h4 className="text-2xl font-bold">
              Create a post and get the conversations started
            </h4>
            <Link
              href="/create-post"
              className=" flex items-center gap-3 rounded bg-brandOrange px-4 py-2 text-lg text-brandLight shadow-md md:bottom-12 md:right-12"
            >
              <span className="hidden md:flex">Create a Post</span>
              <span className="flex md:hidden">New Post</span>
            </Link>
          </div>
        )}
        {data.map((post) => (
          <PostCard {...post} key={post.id} />
        ))}
      </div>
    </main>
  );
}
