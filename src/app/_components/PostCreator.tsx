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

export function CreatePost({ refetch }: { refetch: () => void }) {
  const { user } = useUser();
  const router = useRouter();
  const createPost = api.post.create.useMutation({ onSuccess: refetch });

  const { register, handleSubmit, reset } = useForm<CPFormData>();
  const onSubmit: SubmitHandler<CPFormData> = (data) => {
    createPost
      .mutateAsync({
        name: data.title,
        desc: data.description,
        housePost: false,
        userId: user?.id ?? "",
        authorName: user?.fullName ?? "",
        authorImage: user?.imageUrl ?? "",
        userLocation: user?.unsafeMetadata.userLocation as string,
        userUniversity: user?.unsafeMetadata.userUniversity as string,
      })
      .then(() => reset())
      .then(() => router.refresh())
      .catch((err) => console.log(err));
  };
  if (user === undefined || null) {
    return null;
  }

  return (
    <section className="mt-8 flex w-full flex-col gap-3 border-b-2 border-slate-100 px-4 py-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col justify-center gap-2  lg:p-8"
      >
        <div className="flex w-full flex-col sm:col-span-2">
          <input
            placeholder="Title"
            {...register("title")}
            className="block w-full  bg-brandLight text-2xl font-medium text-brandDark focus:outline-none"
          />
          <span className="h-[2px] w-full bg-slate-100"></span>
        </div>
        <div className="w-full sm:col-span-2">
          <textarea
            placeholder="What would you like to say..."
            {...register("description")}
            className="text-md block w-full bg-brandLight font-medium text-brandDark focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="mt-4 rounded bg-brandOrange px-8 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
          disabled={createPost.isLoading}
        >
          Post
        </button>
      </form>
    </section>
  );
}
