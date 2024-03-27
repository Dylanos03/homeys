"use client";

import { faBuilding, faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Profile } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { api } from "~/trpc/react";

type ProfileDataUpdate = {
  bio: string;
  fullName: string;
  interests: string;
  userId: string;
};

function EditProfile(props: Profile) {
  const { handleSubmit, register } = useForm<ProfileDataUpdate>();
  const router = useRouter();
  const updateProfile = api.profile.edit.useMutation({
    onSuccess: () => {
      router.push(`/users/${props.userId}`);
    },
  });

  const editHandler = async (data: ProfileDataUpdate) => {
    const submitData = {
      ...data,
      userId: props.userId,
    };
    updateProfile.mutate(submitData);
  };
  return (
    <form onSubmit={handleSubmit(editHandler)}>
      <div className="flex items-center justify-between">
        <Image
          src={props.image}
          width={100}
          height={100}
          alt={props.fullName}
          className="rounded-full"
        />

        <div className="flex flex-col gap-2 overflow-hidden px-4">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faLocationPin}
              style={{ color: "#bd5103" }}
              className="w-4"
            />
            <p className="overflow-hidden text-ellipsis whitespace-nowrap">
              {props.location}
            </p>
          </div>
          <div className="flex  items-center gap-2">
            <FontAwesomeIcon
              icon={faBuilding}
              style={{ color: "#bd5103" }}
              className="w-4"
            />
            <p className="overflow-hidden text-ellipsis whitespace-nowrap">
              {props.university}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold lg:text-3xl">@{props.username}</h1>
        </div>

        <div className="flex items-center gap-4">
          <input
            className="text-xl font-semibold"
            placeholder={props.fullName}
            {...register("fullName", { required: true, value: props.fullName })}
          />
        </div>

        <div className="w-full">
          <p className="w-full text-lg font-semibold">Bio</p>
          <textarea
            placeholder={props.bio}
            className="w-full p-2"
            rows={5}
            {...register("bio", { required: true, value: props.bio })}
          />
        </div>
        <div className="w-full">
          <p className="w-full text-lg font-semibold">Interests</p>
          <textarea
            placeholder={props.interests}
            {...register("interests", {
              required: true,
              value: props.interests,
            })}
            className="w-full p-2"
            rows={5}
          />
        </div>
      </div>
      <div className="my-3 flex w-full justify-end gap-2">
        <Link
          href={`/users/${props.userId}`}
          className="flex h-8 items-center justify-end rounded-md border-2 border-brandOrange px-4 font-semibold text-brandOrange"
        >
          Cancel
        </Link>
        <button className="flex h-8 items-center justify-end rounded-md bg-brandOrange px-4 font-semibold text-brandLight">
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default EditProfile;
