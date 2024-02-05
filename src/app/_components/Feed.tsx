"use client";

import PostCard from "./PostCard";
import { CreatePost } from "./PostCreator";
import { api } from "~/trpc/react";
import LoadingSpinner from "./loadingSpinner";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

function Feed() {
  const { data, isLoading } = api.post.getAll.useQuery();
  const { user } = useUser();
  const [byLocation, setByLocation] = useState(false);
  const [byUniversity, setByUniversity] = useState(false);

  const filteredBothData = data
    ?.filter(
      (post) =>
        post.userUniversity === user?.unsafeMetadata.userUniversity &&
        post.userLocation === user?.unsafeMetadata.userLocation,
    )
    .map((post) => <PostCard {...post} key={post.id} />);

  const filteredUniData = data
    ?.filter(
      (post) => post.userUniversity === user?.unsafeMetadata.userUniversity,
    )
    .map((post) => <PostCard {...post} key={post.id} />);

  const filteredLocData = data
    ?.filter((post) => post.userLocation === user?.unsafeMetadata.userLocation)
    .map((post) => <PostCard {...post} key={post.id} />);

  const noFilterData = data?.map((post) => (
    <PostCard {...post} key={post.id} />
  ));

  return (
    <>
      {" "}
      <div className="flex w-[720px] flex-col border-x-2">
        {user && (
          <div
            className={
              "gap sticky top-0 flex w-full justify-between  bg-brandLight  font-semibold "
            }
          >
            <button
              onClick={() => setByLocation(!byLocation)}
              className={`flex w-1/2 justify-center border-b-2 border-r-2 py-2 ${
                byLocation && "border-brandOrange bg-brandOrange text-white"
              }`}
            >
              Your Location
            </button>
            <button
              onClick={() => setByUniversity(!byUniversity)}
              className={`flex w-1/2 justify-center border-b-2  py-2 ${
                byUniversity && "border-brandOrange bg-brandOrange text-white"
              }`}
            >
              Your University
            </button>
          </div>
        )}
        {user && <CreatePost />}
        {(() => {
          switch (true) {
            case byLocation && byUniversity:
              return filteredBothData;
            case byUniversity && !byLocation:
              return filteredUniData;
            case byLocation && !byUniversity:
              return filteredLocData;
            case !byLocation && !byUniversity:
              return noFilterData;
            default:
              return noFilterData;
          }
        })()}
        {data?.length === 0 && (
          <div className="mt-8 flex w-full flex-col items-center gap-3 border-b-2 border-slate-100 p-4 px-4   text-brandDark">
            <h3>It&apos;s pretty quiet in here...</h3>
            <h4 className="text-2xl font-bold">
              Create a post and get the conversations started
            </h4>
          </div>
        )}
        {isLoading && (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </>
  );
}

export default Feed;
