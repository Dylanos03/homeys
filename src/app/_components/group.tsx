"use client";

import { useUser } from "@clerk/nextjs";
import { api } from "~/trpc/react";
import CreateGroup from "./GroupSteps/GroupCreator";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function MemberCard(props: { name: string; image: string; userId: string }) {
  return (
    <Link
      href={`/users/${props.userId}`}
      className="flex w-full items-center justify-start gap-2 p-4 hover:bg-slate-100"
    >
      <Image
        alt={props.name}
        src={props.image}
        width={50}
        height={50}
        className="rounded-full"
      />
      <span>{props.name}</span>
    </Link>
  );
}

function GroupView() {
  const { user } = useUser();

  const getGroup = api.group.getUserGroup.useQuery(user?.id ?? "1");
  const leaveGroup = api.group.leaveGroup.useMutation({
    onSuccess: () => {
      location.reload();
    },
  });
  if (!user) return <></>;
  if (!getGroup.data) return <CreateGroup />;

  const leavegroup = () => {
    leaveGroup.mutate(user.id);
  };
  return (
    <div className="flex w-full flex-col p-4">
      <h1 className="text-2xl font-bold">{getGroup.data?.name}</h1>
      <Link className="w-full p-4 hover:bg-slate-100" href={"/"}>
        Chat
      </Link>

      <p>Members:</p>
      <ul>
        {getGroup.data?.members.map((member) => {
          return (
            <li key={member.username}>
              <MemberCard
                image={member.image}
                name={member.fullName}
                userId={member.userId}
              />
            </li>
          );
        })}
        <li>
          <Link className="hover:underline" href={"/friends"}>
            Invite More
          </Link>
        </li>
      </ul>
      <button onClick={leavegroup} className="text-red-700">
        Leave Group
      </button>
    </div>
  );
}

export default GroupView;
