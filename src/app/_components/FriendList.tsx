"use client";

import { useUser } from "@clerk/nextjs";
import { api } from "~/trpc/react";
import FriendCard from "./FriendCard";
import LoadingSpinner from "./loadingSpinner";
import { useRouter } from "next/navigation";

function FriendList() {
  const { user } = useUser();
  const router = useRouter();

  const getFriends = api.profile.getAllFriends.useQuery(user ? user.id : "");

  if (getFriends.error && !getFriends.data) {
    router.push("users/create-profile");
  }

  if (!user) {
    return <></>;
  }

  return (
    <>
      <h1 className="pl-2 pt-2 text-2xl font-bold">Friends list</h1>
      {getFriends.isLoading && (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      )}
      {getFriends.data?.length === 0 && (
        <p className="flex justify-center">No friends yet...</p>
      )}
      {getFriends.data?.map((friend) => {
        return (
          <FriendCard
            key={friend.userId}
            userId={friend.userId}
            username={friend.username}
            userImage={friend.image}
            fullName={friend.fullName}
          />
        );
      })}
    </>
  );
}

export default FriendList;
