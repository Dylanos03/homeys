"use client";

import Image from "next/image";
import { timeSince } from "~/utils/timeSinceCalc";
import type { Post } from "../page";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import WarningPopUp from "./Warning";

function OptionBox(props: { handleClick: () => void }) {
  return (
    <div className="absolute right-0 top-6 flex flex-col gap-2 rounded-md bg-white p-4 shadow-md">
      <button className="text-left">Edit</button>
      <button className="text-left" onClick={props.handleClick}>
        Delete
      </button>
    </div>
  );
}

export default function PostCard(props: Post) {
  const router = useRouter();
  const { user } = useUser();
  const timeSincePost = timeSince(props.createdAt);
  const [options, setOptions] = useState(false);
  const [warning, setWarning] = useState(false);

  const { mutate } = api.post.deletePost.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  function handleOptions() {
    setOptions(!options);
  }

  const clickHandler = () => {
    setWarning(true);
  };
  const responseHandler = (delRes: boolean) => {
    if (delRes) {
      console.log("delete");
      mutate(props.id);
    }
    setWarning(false);
  };

  return (
    <div className="mt-8 flex w-full flex-col gap-3 border-b-2 border-slate-100 px-4">
      {warning && (
        <WarningPopUp warningType="your post" responseFn={responseHandler} />
      )}
      <div className="relative flex items-center justify-between">
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
        {user?.id === props.authorId && (
          <button
            onClick={handleOptions}
            className={`-translate-y-1 px-2 font-bold text-slate-400 ${
              options && "rounded-full bg-slate-300"
            }`}
          >
            ...
          </button>
        )}
        {options && <OptionBox handleClick={clickHandler} />}
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
