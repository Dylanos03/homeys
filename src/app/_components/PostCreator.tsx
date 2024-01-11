"use client";

import React from "react";
import { api } from "~/trpc/react";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

type CPFormData = {
  title: string;
  description: string;
};

export function CreatePost() {
  const { userId } = useAuth();
  const router = useRouter();
  const createPost = api.post.create.useMutation({
    onSettled: () => router.push("/"),
  });
  if (userId === undefined || null) return router.push("/sign-in");

  const { register, handleSubmit } = useForm<CPFormData>();
  const onSubmit: SubmitHandler<CPFormData> = (data) => {
    createPost.mutate({
      name: data.title,
      desc: data.description,
      housePost: false,
      userId: userId || "",
    });
  };

  return (
    <div className="flex h-screen w-screen  max-w-2xl items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-center rounded-lg bg-slate-100 p-16"
      >
        <h1 className="text-2xl font-bold">Create a post</h1>
        <div className="w-full sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-brandDark ">
            Title
          </label>
          <input
            {...register("title")}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-medium text-brandDark focus:outline-none focus:ring-2 focus:ring-brandOrange focus:ring-offset-2"
          />
        </div>
        <div className="w-full sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-brandDark ">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={8}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-medium text-brandDark focus:outline-none focus:ring-2 focus:ring-brandOrange focus:ring-offset-2"
          />
        </div>
        <button
          type="submit"
          className="mt-4 rounded bg-brandOrange px-8 py-2 text-white"
        >
          Create
        </button>
      </form>
    </div>
  );
}
