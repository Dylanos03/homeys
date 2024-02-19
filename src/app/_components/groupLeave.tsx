"use client";

import { api } from "~/trpc/react";

function GroupLeave(props: { userId: string }) {
  const leaveGroup = api.group.leaveGroup.useMutation();
  const leavegroup = () => {
    leaveGroup.mutate(props.userId);
  };
  return (
    <button onClick={leavegroup} className="text-red-700">
      Leave Group
    </button>
  );
}

export default GroupLeave;
