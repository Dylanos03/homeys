import { api } from "~/trpc/server";
import Sidebar from "./_components/sidebar";
import Link from "next/link";
import { timeSince } from "~/utils/timeSinceCalc";

export type Post = {
  id: number;
  name: string;
  desc: string;
  housePost: boolean;
  AuthorId: string;
  createdAt: Date;
};

const CreatePostButton = () => {
  return (
    <Link
      href="/create-post"
      className="fixed bottom-12 right-12 z-50 rounded bg-brandOrange px-4 py-2 text-brandLight shadow-md"
    >
      Create Post
    </Link>
  );
};

function PostCard(props: Post) {
  const timeSincePost = timeSince(props.createdAt);

  return (
    <div className=" mt-8 w-full border-b-2 border-slate-100 px-4">
      <div className="flex justify-between">
        <h3 className="text-2xl font-semibold">{props.name}</h3>
        <span className="text-slate-400">Posted {timeSincePost}</span>
      </div>

      <p className="text-md font-medium">{props.desc}</p>
    </div>
  );
}

export default async function Home() {
  const data = await api.post.getAll.query();
  if (!data) return null;
  return (
    <main className="relative m-0 flex min-h-screen w-screen justify-center px-4 ">
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
