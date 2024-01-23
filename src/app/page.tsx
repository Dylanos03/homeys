import { api } from "~/trpc/server";
import Sidebar from "./_components/sidebar";
import Link from "next/link";
import { timeSince } from "~/utils/timeSinceCalc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
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
  if (!data) return null;
  return (
    <main className="relative m-0 flex min-h-screen w-screen justify-center  px-4 ">
      <Sidebar />
      <CreatePostButton />
      <div className="mt-20 flex w-[720px] flex-col ">
        {data.map((post) => (
          <PostCard {...post} key={post.id} />
        ))}
      </div>
    </main>
  );
}
