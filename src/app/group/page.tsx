import Sidebar from "../_components/sidebar";
import { auth } from "@clerk/nextjs";
import { api } from "~/trpc/server";
import CreateGroup from "../_components/GroupSteps/GroupCreator";
import Image from "next/image";
import Link from "next/link";
import GroupLeave from "../_components/groupLeave";
import Navbar from "../_components/navbar";

function MemberCard(props: {
  name: string;
  image: string;
  userId: string;
  thisUser: string;
  username: string;
}) {
  return (
    <div className="flex w-full items-center justify-between p-4 hover:bg-slate-100">
      <Link
        href={`/users/${props.userId}`}
        className="flex  items-center justify-start gap-2  "
      >
        <Image
          alt={props.name}
          src={props.image}
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{props.name}</span>
          <span className="text-md text-slate-600">@{props.username}</span>
        </div>
      </Link>
      {props.thisUser === props.userId && (
        <GroupLeave userId={props.thisUser} />
      )}
    </div>
  );
}

async function GroupView() {
  const { userId } = auth();

  if (!userId) return <></>;

  const getGroup = await api.group.getUserGroup.query(userId);

  if (!getGroup) return <CreateGroup />;

  return (
    <div className="flex w-full flex-col items-center gap-2 pt-4">
      <h1 className="text-3xl font-bold">{getGroup?.name}</h1>

      <p className="text-lg font-medium">Members:</p>
      <ul className="w-full">
        {getGroup.members.map((member) => {
          return (
            <li key={member.username}>
              <MemberCard
                image={member.image}
                name={member.fullName}
                userId={member.userId}
                thisUser={userId}
                username={member.username}
              />
            </li>
          );
        })}
      </ul>
      <div className="flex w-full items-center justify-end gap-2 p-2">
        {" "}
        <Link
          className="flex h-10 items-center rounded border-2 border-brandOrange px-4 font-semibold text-brandOrange"
          href={"/friends"}
        >
          Invite More
        </Link>
        <Link
          className=" flex h-10 items-center rounded bg-brandOrange px-4 font-semibold text-white "
          href={`/group/chat/${getGroup.id}`}
        >
          Chat
        </Link>
      </div>
    </div>
  );
}

function groups() {
  return (
    <>
      <main className="relative m-0 flex min-h-screen w-screen justify-center  lg:px-4 ">
        <Sidebar />
        <Navbar name="Group" />
        <section className="flex w-full flex-col lg:w-[720px] lg:border-x-2">
          <GroupView />
        </section>
      </main>
    </>
  );
}

export default groups;
