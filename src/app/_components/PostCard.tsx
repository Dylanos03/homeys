"use client";

import Image from "next/image";
import { timeSince } from "~/utils/timeSinceCalc";
import type { Post } from "../page";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useRef, useState } from "react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import WarningPopUp from "./Warning";
import { useForm } from "react-hook-form";

type PostDataUpdate = {
  title: string;
  desc: string;
};

// component for the options box
function OptionBox(props: {
  handleClick: (i: number) => void;
  handleClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const closeMenu = (e: MouseEvent) => {
    if (!ref.current?.contains(e.target as Node)) {
      if (props.handleClose) {
        document.removeEventListener("mousedown", closeMenu);
        props.handleClose();
      }
    }
  };

  document.addEventListener("mousedown", closeMenu);

  return (
    <div
      ref={ref}
      className="absolute right-0 top-6 flex flex-col gap-2 rounded-md bg-white p-4 shadow-md"
    >
      <button className="text-left" onClick={() => props.handleClick(0)}>
        Edit
      </button>
      <button className="text-left" onClick={() => props.handleClick(1)}>
        Delete
      </button>
    </div>
  );
}

// component for the edit post
function PostEditForm(props: {
  title: string;
  text: string;
  id: number;
  handleClose: (i: number) => void;
}) {
  const router = useRouter();
  const { handleSubmit, register } = useForm<PostDataUpdate>();
  const { mutate } = api.post.editPost.useMutation({
    onSuccess: () => {
      props.handleClose(2);
    },
  });

  return (
    <div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-brandDark bg-opacity-15">
      <form
        className="relative flex w-[720px] flex-col gap-4 rounded-lg bg-brandLight p-12"
        onSubmit={handleSubmit((data) => {
          mutate({
            id: props.id,
            name: data.title,
            desc: data.desc,
          });
        })}
      >
        <button
          className="absolute left-3 top-3 font-extrabold"
          type="button"
          onClick={() => props.handleClose(0)}
        >
          X
        </button>
        <input
          type="text"
          defaultValue={props.title}
          {...register("title")}
          className="w-full rounded-md border-2 border-slate-100 p-2"
        />
        <textarea
          defaultValue={props.text}
          {...register("desc")}
          rows={10}
          className="w-full rounded-md border-2 border-slate-100 p-2"
        />
        <button
          type="submit"
          className="rounded-lg bg-brandOrange px-6 py-3 font-semibold text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

// component for the post card
export default function PostCard(props: Post) {
  const router = useRouter();
  const { user } = useUser();
  const timeSincePost = timeSince(props.createdAt);
  const [options, setOptions] = useState(false);
  const [warning, setWarning] = useState(false);
  const [edit, setEdit] = useState(false);

  const { mutate } = api.post.deletePost.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  function handleOptions() {
    setOptions(!options);
  }

  const clickHandler = (j: number) => {
    if (j === 0) {
      setEdit(!edit);
      setOptions(false);
      return;
    }
    if (j === 1) {
      setWarning(true);
      return;
    }
    setEdit(false);
    router.refresh();
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
      {edit && (
        <PostEditForm
          handleClose={(n) => clickHandler(n)}
          id={props.id}
          title={props.name}
          text={props.desc}
        />
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
        {options && (
          <OptionBox
            handleClose={handleOptions}
            handleClick={(e) => clickHandler(e)}
          />
        )}
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
