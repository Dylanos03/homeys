"use client";

import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { api } from "~/trpc/react";

type GFormData = {
  name: string;
};

function CreateGroup() {
  const { register, handleSubmit } = useForm<GFormData>();
  const { user } = useUser();

  const createGroup = api.group.createGroup.useMutation({
    onSuccess: (data) => {
      console.log(data);
    },
  });

  if (!user) return null;

  const onsubmit = (data: GFormData) => {
    createGroup.mutate({ name: data.name, userId: user.id });
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-3xl font-bold">Create a Group</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onsubmit)}>
        <input
          {...register("name")}
          placeholder="Group Name"
          className="w-96 rounded-md px-4 py-2 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-md bg-brandOrange px-4 py-2 text-lg font-semibold text-brandLight  "
        >
          Create Group
        </button>
      </form>
    </div>
  );
}

export default CreateGroup;
