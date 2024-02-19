import Sidebar from "../_components/sidebar";

import { auth } from "@clerk/nextjs";
import { api } from "~/trpc/server";
import CreateGroup from "../_components/GroupSteps/GroupCreator";
import Image from "next/image";
import Link from "next/link";
import GroupLeave from "../_components/groupLeave";

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

async function GroupView() {
  const { userId } = auth();

  const getGroup = await api.group.getUserGroup.query(userId ?? "1");

  if (!userId) return <></>;
  if (!getGroup) return <CreateGroup />;

  return (
    <div className="flex w-full flex-col p-4">
      <h1 className="text-2xl font-bold">{getGroup?.name}</h1>
      <Link
        className="w-full p-4 hover:bg-slate-100"
        href={`/group/chat/${getGroup.id}`}
      >
        Chat
      </Link>

      <p>Members:</p>
      <ul>
        {getGroup.members.map((member) => {
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
      <GroupLeave userId={userId} />
    </div>
  );
}

function groups() {
  return (
    <>
      <main className="relative m-0 flex min-h-screen w-screen justify-center  px-4 ">
        <Sidebar />
        <section className="flex w-[720px] flex-col border-x-2">
          <GroupView />
        </section>
      </main>
    </>
  );
}

export default groups;
