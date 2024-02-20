"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { api } from "~/trpc/react";

function InviteToGroup(props: { friendId: string; userId: string }) {
  const { user } = useUser();
  const profile = api.profile.findOne.useQuery(props.friendId);
  const userProfile = api.profile.findOne.useQuery(props.userId);
  const [sent, setSent] = useState(false);
  const sendReq = api.groupReq.createGroupReq.useMutation({
    onError: (e) => {
      setSent(false);
      if (e.message === "Group request already sent") {
        alert("Group request already sent");
      }
      if (e.message === "Sender has no group") {
        alert("You are not in a group");
      }
    },
  });
  if (!profile.data) return <></>;
  if (!userProfile.data) return <></>;
  if (!user) return <></>;
  if (
    userProfile.data.Group?.members.some((member) => member.userId === user.id)
  ) {
    return <></>;
  }

  const handleClick = () => {
    setSent(true);
    sendReq.mutate({ userId: props.friendId, senderId: user.id });
  };
  return (
    <button
      onClick={handleClick}
      className="lg:text-md text-sm hover:underline"
    >
      {sent ? "Invite Sent " : "Invite to group"}
    </button>
  );
}

export default InviteToGroup;
