"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { api } from "~/trpc/react";

function InviteToGroup(props: { friendId: string }) {
  const { user } = useUser();
  const profile = api.profile.findOne.useQuery(props.friendId);
  const [sent, setSent] = useState(false);

  const sendReq = api.groupReq.createGroupReq.useMutation();
  if (!profile.data) return <></>;
  if (!user) return <></>;
  const handleClick = () => {
    setSent(true);
    sendReq.mutate({ userId: props.friendId, senderId: user.id });
  };
  return (
    <button onClick={handleClick}>
      {sent ? "Invite Sent " : "Invite to group"}
    </button>
  );
}

export default InviteToGroup;
