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
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PostDataUpdate = {
  title: string;
  desc: string;
};

type UPostCardProps = Post & {
  handleClose: (arg: number) => void;
  timeSincePost: string;
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
function PostEditForm(props: UPostCardProps) {
  const router = useRouter();
  const { handleSubmit, register } = useForm<PostDataUpdate>();
  const { mutate } = api.post.editPost.useMutation({
    onSuccess: () => {
      props.handleClose(2);
    },
  });

  const onSubmit = (data: PostDataUpdate) => {
    mutate({ id: props.id, name: data.title, desc: data.desc });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 flex w-full flex-col gap-3 border-b-2 border-slate-100 px-4 pb-8"
    >
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2 lg:gap-4">
          <Link href={`/users/${props.authorId}`}>
            <Image
              src={props.authorImage}
              width={50}
              height={50}
              alt={props.authorName}
              className="w-8 rounded-full   lg:w-12"
            />
          </Link>
          <Link href={`/users/${props.authorId}`}>
            <h1 className="text-lg font-bold underline lg:text-xl">
              {props.authorName}
            </h1>
          </Link>

          <span className="h-1 w-1 rounded-full bg-slate-400"></span>
          <span className=" text-sm text-slate-400">{props.timeSincePost}</span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <input
          className="rounded border-2 bg-brandLight text-lg font-semibold focus:outline-none lg:text-3xl"
          {...register("title", { required: true })}
          defaultValue={props.name}
        ></input>

        <textarea
          className="text-md rounded border-2 bg-brandLight font-semibold focus:outline-none lg:text-lg"
          {...register("desc", { required: true })}
          defaultValue={props.desc}
          rows={5}
        ></textarea>
      </div>
      <div className="flex  items-center justify-end text-slate-500 lg:justify-between">
        <div>
          {props.group ? (
            <div className="flex items-center gap-2">
              <div className="flex  ">
                {props.group?.members.map((member, index) => (
                  <Image
                    src={member.image}
                    alt={member.fullName}
                    width={40}
                    height={40}
                    key={member.id}
                    className={` rounded-full ${index === 0 ? "-mr-4" : ""}`}
                  />
                ))}
                {props.group?.members.length > 2 && (
                  <span className="-ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-white">
                    +{props.group.members.length - 2}
                  </span>
                )}
              </div>

              <span className="">In group</span>
            </div>
          ) : (
            <span>Solo Student</span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="h-10 w-20 rounded border-2 border-brandOrange text-brandOrange"
            onClick={() => props.handleClose(2)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="h-10 w-20 rounded bg-brandOrange text-brandLight"
          >
            Save
          </button>
        </div>
      </div>
    </form>
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

  if (edit) {
    return (
      <PostEditForm
        {...props}
        handleClose={(n) => clickHandler(n)}
        timeSincePost={timeSincePost}
      />
    );
  }

  return (
    <div className="mt-8 flex w-full flex-col gap-3 border-b-2 border-slate-100 px-4 pb-8">
      {warning && (
        <WarningPopUp
          warningType="delete your post"
          responseFn={responseHandler}
        />
      )}

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2 lg:gap-4">
          <Link href={`/users/${props.authorId}`}>
            <Image
              src={props.authorImage}
              width={50}
              height={50}
              alt={props.authorName}
              className="w-8 rounded-full   lg:w-12"
            />
          </Link>
          <Link href={`/users/${props.authorId}`}>
            <h1 className="text-lg font-bold underline lg:text-xl">
              {props.authorName}
            </h1>
          </Link>

          <span className="h-1 w-1 rounded-full bg-slate-400"></span>
          <span className=" text-sm text-slate-400">{timeSincePost}</span>
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
        <h3 className="text-lg font-semibold lg:text-3xl">{props.name}</h3>
        <p className="text-md font-medium lg:text-lg">{props.desc}</p>
      </div>
      <div className="flex  items-center justify-end text-slate-500 lg:justify-between">
        <div className="hidden flex-col lg:flex">
          <p>Location: {props.userLocation}</p>
          <p>University: {props.userUniversity}</p>
        </div>
        <div>
          {props.group ? (
            <div className="flex items-center gap-2">
              <div className="flex  ">
                {props.group?.members.map((member, index) => (
                  <Image
                    src={member.image}
                    alt={member.fullName}
                    width={40}
                    height={40}
                    key={member.id}
                    className={` rounded-full ${index === 0 ? "-mr-4" : ""}`}
                  />
                ))}
                {props.group?.members.length > 2 && (
                  <span className="-ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-white">
                    +{props.group.members.length - 2}
                  </span>
                )}
              </div>

              <span className="">In group</span>
            </div>
          ) : (
            <span>Solo Student</span>
          )}
        </div>
      </div>
    </div>
  );
}
