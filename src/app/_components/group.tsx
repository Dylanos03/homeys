"use client";

import { useUser } from "@clerk/nextjs";
import { api } from "~/trpc/react";

function GroupView() {
  const { user } = useUser();
  const getGroup = api.group.getUserGroup.useQuery(user?.id ?? "1");
  if (!user) return <></>;
  if (getGroup.data === null) return <></>;
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Your Group</h1>
      <p className="text-lg">Name: {getGroup.data?.Group?.name}</p>
    </div>
  );
}

export default GroupView;
