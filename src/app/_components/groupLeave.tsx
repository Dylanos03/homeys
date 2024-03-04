"use client";

import { api } from "~/trpc/react";

function GroupLeave(props: { userId: string }) {
  const leaveGroup = api.group.leaveGroup.useMutation();
  const leavegroup = () => {
    leaveGroup.mutate(props.userId);
  };
  return (
    <button
      onClick={leavegroup}
      className="h-8 text-nowrap rounded-md bg-red-700 px-2 text-white"
    >
      Leave Group
    </button>
  );
}

export default GroupLeave;
