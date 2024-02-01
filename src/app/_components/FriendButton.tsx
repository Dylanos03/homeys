"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { api } from "~/trpc/react";

function AddFriend(props: { userId: string }) {
  const { user } = useUser();

  const [pending, setPending] = useState(false);

  //Checks for incoming friend requests
  const checkInReq = api.friendReq.check.useQuery(
    {
      userId: user ? user.id : "",
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
      friendId: user ? user.id : "",
    },
    {
      enabled: !!user,
    },
  );

  //checking if they are friends
  const checkFriends = api.profile.checkIfFriends.useQuery(
    {
      userId: user ? user.id : "",
      friendId: props.userId,
    },
    {
      enabled: !!user,
    },
  );

  //Cancels outgoing friend requests or incoming friend requests
  const deleteReq = api.friendReq.reject.useMutation({
    onSuccess: () => setPending(false),
  });

  const acceptReq = api.friendReq.accept.useMutation({
    onSuccess: () => setPending(false),
  });

  const removeFriend = api.profile.removeFriend.useMutation({
    onSuccess: () => setPending(false),
  });

  const handleCancelReq = () => {
    setPending(true);
    deleteReq.mutate(checkOutReq.data!.id);
  };

  const handleAcceptReq = () => {
    setPending(true);
    acceptReq.mutate(checkInReq.data!.id);
  };

  const handleRemoveFriend = () => {
    setPending(true);
    removeFriend.mutate({ userId: user!.id as string, friendId: props.userId });
  };

  const sendReq = api.friendReq.create.useMutation({
    onError: () => setPending(false),
    onSuccess: () => setPending(true),
  });

  if (!user || user.id === props.userId) return <></>;

  if (checkFriends.data)
    return (
      <button
        disabled={pending}
        onClick={handleRemoveFriend}
        className="rounded-lg bg-brandOrange px-6 py-2 font-bold text-brandLight"
      >
        Friends
      </button>
    );

  if (checkInReq.data)
    return (
      <button
        disabled={pending}
        onClick={handleAcceptReq}
        className="rounded-lg bg-brandOrange px-6 py-2 font-bold text-brandLight"
      >
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
