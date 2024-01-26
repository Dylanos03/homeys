"use client";

import { api } from "~/trpc/react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import { usePaginatedForm } from "~/app/_hooks/usePaginatedForm";
import YourDetails from "~/app/_components/ProfileSteps/YourDetails";
import AboutYou from "~/app/_components/ProfileSteps/AboutYou";
import Location from "~/app/_components/ProfileSteps/Location";

export type PFormData = {
  username: string;
  bio: string;
  interests: string;
  university: string;
  location: string;
  profilePicture: string;
};

function ProfileCreatePage() {
  const { user } = useUser();
  const { register, handleSubmit } = useForm<PFormData>();
  const { step, currentPage, next, back, isLastPage } = usePaginatedForm([
    <YourDetails
      key={"YourDetails"}
      Register={register}
      name={user?.fullName}
    />,
    <AboutYou key={"You"} Register={register} />,
    <Location key={"location"} Register={register} />,
  ]);

  const router = useRouter();

  const create = api.profile.create.useMutation({
    onSuccess: () => router.push(`/users/${user?.id}`),
    onError: (err) => {
      console.log(err);
      if (err.message.includes("Unique constraint")) {
        alert("Username already taken");
      }
    },
  });

  if (!user) {
    return null;
  }

  const onSubmit: SubmitHandler<PFormData> = (data) => {
    if (!isLastPage) {
      next();

      return;
    }

    create.mutate({
      bio: data.bio,
      interests: data.interests,
      location: data.location,
      username: data.username,
      image: user.imageUrl,
      university: data.university,
      fullname: user.fullName ?? "",
      userId: user.id,
    });
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-brandOrange">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" rounded-lg bg-brandLight"
      >
        {step}
        <div className="flex justify-between p-3 text-brandLight">
          <button
            type="button"
            className="rounded border-2 border-brandOrange px-2 py-1 font-semibold text-brandOrange"
            onClick={() => back()}
          >
            Back
          </button>
          <button
            className=" rounded bg-brandOrange px-4 py-1 font-semibold"
            type="submit"
          >
            Next
          </button>
        </div>
      </form>
    </main>
  );
}

export default ProfileCreatePage;
