"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { api } from "~/trpc/react";

function AddFriend(props: { userId: string }) {
  const { user } = useUser();

  const [pending, setPending] = useState(false);

  if (!user || user.id === props.userId) return <></>;

  //Checks for incoming friend requests
  const checkInReq = api.friendReq.check.useQuery(
    {
      userId: user?.id,
      friendId: props.userId,
    },
    {
      enabled: !!user,
    },
  );

  //Checks for outgoing friend requests
  const checkOutReq = api.friendReq.check.useQuery(
    {
      userId: props.userId,
      friendId: user?.id,
    },
    {
      enabled: !!user,
    },
  );

  //Cancels outgoing friend requests or incoming friend requests
  const deleteReq = api.friendReq.reject.useMutation({
    onSuccess: () => setPending(false),
  });

  const handleCancelReq = () => {
    setPending(true);
    deleteReq.mutate(checkOutReq.data!.id);
  };

  const sendReq = api.friendReq.create.useMutation({
    onError: () => setPending(false),
    onSuccess: () => setPending(true),
  });

  if (checkInReq.data)
    return (
      <button className="rounded-lg bg-brandOrange px-6 py-2 font-bold text-brandLight">
        Accept Request
      </button>
    );
  if (checkOutReq.data)
    return (
      <button
        disabled={pending}
        onClick={handleCancelReq}
        className="rounded-lg bg-brandOrange px-6 py-2 font-bold text-brandLight"
      >
        Cancel Request
      </button>
    );

  const handleAddFriend = () => {
    setPending(true);
    sendReq.mutate({ userId: props.userId, friendId: user.id });
  };

  return (
    <button
      disabled={pending}
      onClick={handleAddFriend}
      className={`rounded-lg bg-brandOrange px-6 py-2 font-bold text-brandLight ${
        pending && "bg-opacity-50"
      }`}
    >
      Add Friend
    </button>
  );
}

export default AddFriend;
