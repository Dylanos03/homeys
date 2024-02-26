"use client";

import Link from "next/link";
import { useState } from "react";
import { api } from "~/trpc/react";

function ProfileCard({
  image,
  username,
  fullName,
  userId,
}: {
  image: string;
  username: string;
  fullName: string;
  userId: string;
}) {
  return (
    <Link
      href={`/users/${userId}`}
      className="flex items-center gap-2 border-b-2 border-slate-200 p-2"
    >
      <img src={image} alt="profile" className="h-10 w-10 rounded-full" />
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">{username}</h1>
        <p className="text-slate-400">{fullName}</p>
      </div>
    </Link>
  );
}

function SearchComponent() {
  const [search, setSearch] = useState("");
  const users = api.profile.getMany.useQuery(search);

  return (
    <div className="w-full">
      <input
        type="text"
        value={search}
        placeholder="Search by username, location, university, interests, etc"
        className="w-full rounded-lg border-2 border-slate-200 p-2  focus:outline-none"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex flex-col">
        {users.data?.map((user) => {
          return (
            <ProfileCard
              userId={user.userId}
              key={user.userId}
              image={user.image}
              username={user.username}
              fullName={user.fullName}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SearchComponent;
