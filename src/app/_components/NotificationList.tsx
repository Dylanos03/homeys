"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { api } from "~/trpc/react";
import LoadingSpinner from "./loadingSpinner";

type friendRequest = {
  id: number;
  friendId: string;
  friendName: string;
  friendPic: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

function NotiCard(props: friendRequest) {
  const { friendId, friendName, friendPic, userId, id } = props;

  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isRejected, setIsRejected] = useState(false);

  const deleteFriendRequest = api.friendReq.reject.useMutation({
    onMutate: () => {
      setIsRejecting(true);
    },
    onSuccess: () => {
      setIsRejecting(false);
      setIsRejected(true);
    },
    onError: () => {
      setIsRejecting(false);
    },
  });
  const acceptFriendRequest = api.friendReq.accept.useMutation({
    onMutate: () => {
      setIsAccepting(true);
    },
    onSuccess: () => {
      setIsAccepting(false);
      setIsAccepted(true);
    },
    onError: () => {
      setIsAccepting(false);
    },
  });

  const handleAccept = () => {
    acceptFriendRequest.mutate(id);
  };
  const handleReject = () => {
    deleteFriendRequest.mutate(id);
  };

  return (
    <div className="flex items-center justify-between  px-4 py-2 hover:bg-brandDark hover:bg-opacity-5">
      <Link href={`/users/${friendId}`} className="flex items-center gap-2">
        <Image
          className="h-16 w-16 rounded-full object-cover"
          src={friendPic}
          alt="profile"
          width={90}
          height={90}
        />
        <div className="flex flex-col">
          <span className="text-xl font-bold">{friendName}</span>
          <span className="text-md text-gray-400">Wants to be your friend</span>
        </div>
      </Link>
      {isAccepted ? (
        <span>Accepted</span>
      ) : isRejected ? (
        <span>Rejected</span>
      ) : (
        <div className="flex gap-4">
          <button
            onClick={handleReject}
            disabled={isAccepting ?? isRejecting}
            className="font-semibold  hover:underline"
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
            disabled={isAccepting ?? isRejecting}
            className="rounded-lg bg-brandOrange px-4 py-2 font-semibold text-brandLight hover:bg-opacity-75"
          >
            Accept
          </button>
        </div>
      )}
    </div>
  );
}

function GroupNotiCard(props: {
  groupName: string;
  senderName: string;
  groupId: number;
}) {
  const { groupName, senderName, groupId } = props;
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isRejected, setIsRejected] = useState(false);

  const deleteGroupRequest = api.groupReq.delete.useMutation({
    onMutate: () => {
      setIsRejecting(true);
    },
    onSuccess: () => {
      setIsRejecting(false);
      setIsRejected(true);
    },
    onError: () => {
      setIsRejecting(false);
    },
  });

  const acceptGroupRequest = api.groupReq.accept.useMutation({
    onMutate: () => {
      setIsAccepting(true);
    },
    onSuccess: () => {
      setIsAccepting(false);
      setIsAccepted(true);
    },
    onError: () => {
      setIsAccepting(false);
    },
  });

  const handleAccept = () => {
    acceptGroupRequest.mutate(groupId);
  };

  const handleReject = () => {
    deleteGroupRequest.mutate(groupId);
  };

  return (
    <div className="flex items-center justify-between  px-4 py-2 hover:bg-brandDark hover:bg-opacity-5">
      <p>
        <span className="font-semibold">{senderName}</span> invited you to join{" "}
        <span className="font-semibold">{groupName}</span>
      </p>
      {isAccepted ? (
        <span>Accepted</span>
      ) : isRejected ? (
        <span>Rejected</span>
      ) : (
        <div className="flex gap-4">
          <button
            onClick={handleReject}
            disabled={isAccepting ?? isRejecting}
            className="font-semibold  hover:underline disabled:opacity-50"
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
            disabled={isAccepting ?? isRejecting}
            className="rounded-lg bg-brandOrange px-4 py-2 font-semibold text-brandLight hover:bg-opacity-75 disabled:opacity-50"
          >
            Accept
          </button>
        </div>
      )}
    </div>
  );
}

function NotificationList() {
  const { user } = useUser();
  const friendRequests = api.profile.getFriendRequests.useQuery(user?.id ?? "");
  const groupRequests = api.groupReq.findAllGroupReq.useQuery(user?.id ?? "");
  if (!user) {
    return null;
  }

  if (!groupRequests) {
    return null;
  }

  return (
    <div className="flex flex-col p-2 lg:p-4">
      <h2 className=" text-xl font-bold">Friend Requests</h2>
      <ul>
        {friendRequests.isLoading && <LoadingSpinner />}
        {friendRequests.data?.length === 0 && (
          <span>No New Friend Requests</span>
        )}
        {friendRequests.data?.map((friendRequest) => (
          <li key={friendRequest.id}>
            <NotiCard {...friendRequest} />
          </li>
        ))}
      </ul>
      <h2 className=" text-xl font-bold">Group Invitations</h2>
      <ul>
        {groupRequests.isLoading && <LoadingSpinner />}
        {groupRequests.data?.length === 0 && <span>No New Group Requests</span>}
        {groupRequests.data?.map((groupRequest) => (
          <li key={groupRequest.id}>
            <GroupNotiCard
              groupId={groupRequest.id}
              groupName={groupRequest.groupName}
              senderName={groupRequest.senderName}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationList;
