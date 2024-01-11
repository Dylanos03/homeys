import { api } from "~/trpc/server";
import Sidebar from "./_components/sidebar";
import Link from "next/link";

type Post = {
  id: number;
  name: string;
  desc: string;
  housePost: boolean;
  userId: string;
  createdAt: Date;
};

function timeSince(date: Date) {
  let overHour = false;
  let overDay = false;
  let diffHr = 0;
  let diffDay = 0;

  const dateNow = new Date();
  const diff = dateNow.getTime() - date.getTime();
  const diffMin = Math.round(diff / 60000);
  if (diffMin >= 60) {
    diffHr = Math.round(diffMin / 60);
    overHour = true;
    return diffHr + ` hour${diffHr! > 1 ? "'s" : ""} ago`;
  }
  if (diffHr >= 24) {
    overDay = true;
    diffDay = Math.round(diffHr / 24);
    return diffDay + ` day${diffHr! > 1 ? "'s" : ""} ago`;
  }
  return diffMin + " mins ago";
}

const CreatePostButton = () => {
  return (
    <Link
      href="/create-post"
      className="absolute bottom-12 right-12 z-50 rounded bg-brandOrange px-4 py-2 text-brandLight shadow-md"
    >
      Create Post
    </Link>
  );
};

const PostCard = (props: Post) => {
  const timeSincePost = timeSince(props.createdAt);

  return (
    <div className=" mt-8 w-full border-b-2 border-slate-100">
      <div className="flex justify-between">
        <h3 className="text-2xl font-semibold">{props.name}</h3>
        <span className="text-slate-400">Posted {timeSincePost}</span>
      </div>

      <p className="text-md font-medium">{props.desc}</p>
    </div>
  );
};

export default async function Home() {
  const data = await api.post.getAll.query();
  return (
    <main className="relative flex min-h-screen w-screen justify-center ">
      <Sidebar />
      <CreatePostButton />
      <div className="mt-20 flex max-w-5xl flex-col">
        {data.map((post) => (
          <PostCard {...post} key={post.id} />
        ))}
      </div>
    </main>
  );
}
