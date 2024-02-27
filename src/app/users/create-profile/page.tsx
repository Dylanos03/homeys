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
import { useState } from "react";

export type PFormData = {
  username: string;
  bio: string;
  interests: string;
  university: string;
  location: string;
  profilePicture: string;
};

function ProfileCreatePage() {
  const [disableButton, setDisableButton] = useState(false);
  const { user } = useUser();
  const { register, handleSubmit, setValue } = useForm<PFormData>();
  const { step, currentPage, next, back, isLastPage, goTo } = usePaginatedForm([
    <YourDetails
      key={"YourDetails"}
      Register={register}
      name={user?.fullName}
    />,
    <AboutYou key={"You"} Register={register} />,
    <Location key={"location"} Register={register} setValue={setValue} />,
  ]);

  const router = useRouter();

  const create = api.profile.create.useMutation({
    onSuccess: () => router.push(`/users/${user?.id}`),
    onError: (err) => {
      console.log(err);
      if (err.message.includes("Unique constraint")) {
        alert("Username already taken");
        goTo(0);
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
    setDisableButton(true);

    user
      .update({
        unsafeMetadata: {
          userUniversity: data.university,
          userLocation: data.location,
        },
      })
      .catch((err) => {
        console.log(err);
        setDisableButton(false);
      });

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

  const handleBack = () => {
    if (currentPage === 0) {
      router.push("/");
    }
    back();
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
            onClick={() => handleBack()}
          >
            Back
          </button>
          <button
            className=" rounded bg-brandOrange px-4 py-1 font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            type="submit"
            disabled={disableButton}
          >
            Next
          </button>
        </div>
      </form>
    </main>
  );
}

export default ProfileCreatePage;
