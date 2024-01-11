"use client";

import { api } from "~/trpc/react";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

type PFormData = {
  username: string;
  bio: string;
  interests: string;
  location: string;
  profilePicture: string;
};

function ProfileCreatePage() {
  const { user } = useUser();
  const { register, handleSubmit } = useForm<PFormData>();
  const router = useRouter();
  const create = api.profile.create.useMutation({
    onSuccess: () => router.push("/"),
    onError: (err) => {
      console.log(err);
      if (err.message.includes("Unique constraint")) {
        alert("Username already taken");
      }
    },
  });

  if (!user) return null;

  const onSubmit: SubmitHandler<PFormData> = (data) => {
    create.mutate({
      bio: data.bio,
      interests: data.interests,
      location: data.location,
      username: data.username,
      image: user.imageUrl,
      fullname: user.fullName ?? "",
      userId: user.id,
    });
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-[80%] flex-col items-center justify-center gap-8 rounded-lg bg-slate-100 p-16"
      >
        <h1 className="text-3xl font-extrabold text-brandDark">
          Create your profile
        </h1>

        <section className="flex w-full items-center gap-2">
          <Image
            loader={({ src }) => src}
            src={user.imageUrl}
            alt="Profile Picture"
            width={75}
            height={75}
            className="rounded-full"
          />
          <h2 className="text-xl font-semibold">{user.fullName}</h2>
        </section>

        <section className="flex w-full gap-2">
          <div className="w-full sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-brandDark ">
              Username
            </label>
            <input
              {...register("username")}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-medium text-brandDark focus:outline-none focus:ring-2 focus:ring-brandOrange focus:ring-offset-2"
            />
          </div>

          <div className="w-full sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-brandDark ">
              Location
            </label>
            <input
              {...register("location")}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-medium text-brandDark focus:outline-none focus:ring-2 focus:ring-brandOrange focus:ring-offset-2"
            />
          </div>
        </section>

        <div className="w-full sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-brandDark ">
            Bio
          </label>
          <textarea
            {...register("bio")}
            rows={8}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-medium text-brandDark focus:outline-none focus:ring-2 focus:ring-brandOrange focus:ring-offset-2"
          />
        </div>

        <div className="w-full sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-brandDark ">
            Interests
          </label>
          <textarea
            {...register("interests")}
            rows={8}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-medium text-brandDark focus:outline-none focus:ring-2 focus:ring-brandOrange focus:ring-offset-2"
          />
        </div>
        <button
          type="submit"
          className="mt-4  rounded bg-brandOrange px-8 py-2 text-white"
        >
          Create
        </button>
      </form>
    </main>
  );
}

export default ProfileCreatePage;
