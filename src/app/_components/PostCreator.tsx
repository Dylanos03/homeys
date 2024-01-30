"use client";

import React from "react";
import { api } from "~/trpc/react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

type CPFormData = {
  title: string;
  description: string;
  userLocation: string;
  userUniversity: string;
};

export function CreatePost() {
  const { user } = useUser();
  const router = useRouter();
  const createPost = api.post.create.useMutation({});

  const { register, handleSubmit } = useForm<CPFormData>();
  const onSubmit: SubmitHandler<CPFormData> = (data) => {
    createPost
      .mutateAsync({
        name: data.title,
        desc: data.description,
        housePost: false,
        userId: user?.id ?? "",
        authorName: user?.fullName ?? "",
        authorImage: user?.imageUrl ?? "",
        userLocation: data.userLocation,
        userUniversity: data.userUniversity,
      })
      .then(() => router.push("/"))
      .catch((err) => console.log(err));
  };
  if (user === undefined || null) {
    router.push("/sign-in");
    return <p>Not signed in</p>;
  }
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
            What university are you attending?
          </label>
          <input
            value={user?.unsafeMetadata.userUniversity as string}
            disabled
            {...register("userUniversity")}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-medium text-brandDark focus:outline-none focus:ring-2 focus:ring-brandOrange focus:ring-offset-2"
          />
        </div>
        <div className="w-full sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-brandDark ">
            Where are you looking to live?
          </label>
          <input
            value={user?.unsafeMetadata.userLocation as string}
            disabled
            {...register("userLocation")}
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
          className="mt-4 rounded bg-brandOrange px-8 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
          disabled={createPost.isLoading}
        >
          Create
        </button>
      </form>
    </div>
  );
}
