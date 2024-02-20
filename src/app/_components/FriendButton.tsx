"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { api } from "~/trpc/react";
import WarningPopUp from "./Warning";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";

function AddFriend(props: { userId: string }) {
  const { user } = useUser();

  const [pending, setPending] = useState(false);
  const [warning, setWarning] = useState(false);
  const [sent, setSent] = useState(false);

  const checkIfProfile = api.profile.findOne.useQuery(user ? user.id : "");
  console.log(checkIfProfile);

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

  //Accepts incoming friend requests
  const acceptReq = api.friendReq.accept.useMutation({
    onSuccess: () => setPending(false),
  });

  //Removes friends
  const removeFriend = api.profile.removeFriend.useMutation({
    onSuccess: () => setPending(false),
  });

  //Handles the cancel request button
  const handleCancelReq = () => {
    setPending(true);
    deleteReq.mutate(checkOutReq.data!.id);
  };

  //Handles the accept request button
  const handleAcceptReq = () => {
    setPending(true);
    acceptReq.mutate(checkInReq.data!.id);
  };

  //Handles the remove friend button
  const handleRemoveFriend = (e: boolean) => {
    if (!e) {
      setWarning(false);
      return;
    }
    setPending(true);
    removeFriend.mutate({
      userId: user ? user.id : "",
      friendId: props.userId,
    });
    location.reload();
  };

  //Sends a friend request
  const sendReq = api.friendReq.create.useMutation({
    onError: () => setPending(false),
    onSuccess: () => setPending(true),
  });

  if (!user || user.id === props.userId) return <></>;

  if (checkIfProfile.data == null) return <></>;

  if (checkFriends.data)
    return (
      <div>
        {warning && (
          <WarningPopUp
            warningType="remove a friend"
            responseFn={(e) => handleRemoveFriend(e)}
          />
        )}
        <button
          disabled={pending}
          onClick={() => setWarning(true)}
          className="rounded-lg bg-brandOrange px-3 py-2 font-bold text-brandLight lg:px-6"
        >
          <span className="lg:hidden">
            <FontAwesomeIcon icon={faUserGroup} />
          </span>
          <span className="hidden lg:flex">Friends</span>
        </button>
      </div>
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
  if (checkOutReq.data ?? sent)
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
    setSent(true);
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
