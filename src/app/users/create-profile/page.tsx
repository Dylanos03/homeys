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

type PFormData = {
  username: string;
  bio: string;
  interests: string;
  location: string;
  profilePicture: string;
};

function ProfileCreatePage() {
  const { user } = useUser();
  const { step, currentPage } = usePaginatedForm([
    <YourDetails key={"YourDetails"} />,
    <AboutYou key={"You"} />,
    <Location key={"location"} />,
  ]);
  const { register, handleSubmit } = useForm<PFormData>();
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
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-brandOrange">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" rounded-lg bg-brandLight"
      >
        {step}
        <button className=" bg-brandOrange">Next</button>
      </form>
    </main>
  );
}

export default ProfileCreatePage;
