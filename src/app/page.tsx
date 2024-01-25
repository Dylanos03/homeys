import { api } from "~/trpc/server";
import Sidebar from "./_components/sidebar";
import Link from "next/link";
import { timeSince } from "~/utils/timeSinceCalc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

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

function PostCard(props: Post) {
  const timeSincePost = timeSince(props.createdAt);

  return (
    <div className="mt-8 flex w-full flex-col gap-3 border-b-2 border-slate-100 px-4">
      <div className="flex items-center gap-4">
        <Image
          src={props.authorImage}
          width={50}
          height={50}
          alt={props.authorName}
          className="rounded-full outline outline-2 outline-offset-4  outline-brandOrange"
        />
        <Link href={`/users/${props.authorId}`}>
          <h1 className="text-xl font-bold underline">{props.authorName}</h1>
        </Link>

        <span className="h-1 w-1 rounded-full bg-slate-400"></span>
        <span className="text-slate-400">Posted {timeSincePost}</span>
      </div>
      <div>
        <h3 className="text-2xl font-semibold">{props.name}</h3>
        <p className="text-md font-medium">{props.desc}</p>
      </div>
      <div className="flex justify-between text-slate-500">
        <span>Like</span>
        <span>Comment</span>
        <span>Save</span>
      </div>
    </div>
  );
}

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
