import Sidebar from "../_components/sidebar";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { api } from "~/trpc/server";
import Navbar from "../_components/navbar";

type Message = {
  fromUser: User;
  fromUserId: string;
  toUser: User;
  toUserId: string;
  createdAt: Date;
  text: string;
  seen: boolean;
};

type User = {
  id: number;
  userId: string;
  fullName: string;
  username: string;
  bio: string;
  image: string;
  interests: string;
  location: string;
  university: string;
  createdAt: Date;
  updatedAt: Date;
  groupId: number | null;
};

async function MessageList() {
  const { userId }: { userId: string | null } = auth();
  if (userId === null) {
    return null;
  }
  const messages = await api.messages.getUserMessages.query(userId);
  console.log(messages);

  if (!messages) {
    return <>Loading...</>;
  }
  if (messages.length === 0) {
    return <div>No Messages</div>;
  }
  const userMessageMap = new Map<number, Message>();
  messages.forEach((message) => {
    const user =
      message.fromUserId === userId ? message.toUser : message.fromUser;
    if (
      !userMessageMap.has(user.id) ||
      (userMessageMap.get(user.id)?.createdAt ?? 0) < message.createdAt
    ) {
      userMessageMap.set(user.id, message);
    }
  });
  return (
    <section>
      {Array.from(userMessageMap.values()).map((message) => {
        const user =
          message.fromUserId === userId ? message.toUser : message.fromUser;
        const { username, image } = user;
        return (
          <Link
            href={`/messages/${user.userId}`}
            key={user.id}
            className={`flex gap-2 border-b-[1px] border-b-slate-200 px-2 py-2 ${
              message.fromUserId === userId || message.seen
                ? "bg-slate-100"
                : ""
            }`}
          >
            <Image
              height={50}
              width={50}
              className="rounded-full"
              alt={username}
              src={image}
            ></Image>
            <div className="flex max-w-full flex-col justify-between">
              <span className="text-lg font-semibold">@{username}</span>
              <p className="text-overflow relative w-80 overflow-hidden text-ellipsis whitespace-nowrap">
                <span className="text-neutral-400">
                  {message.fromUserId === userId ? "You: " : "Them: "}
                </span>
                {message.text}
                {message.fromUserId === userId || message.seen ? (
                  <></>
                ) : (
                  <span className="absolute h-2 w-2 rounded-full bg-brandOrange"></span>
                )}
              </p>
            </div>
          </Link>
        );
      })}
    </section>
  );
}

function MessagesPage() {
  return (
    <main className="relative m-0 flex min-h-screen w-screen justify-center  lg:px-4 ">
      <Sidebar />
      <Navbar name="Messages" />
      <section className="flex w-full flex-col border-x-2 lg:w-[720px] lg:py-2">
        <h1 className="p-2 text-2xl font-semibold">Your Messages:</h1>
        <MessageList />
      </section>
    </main>
  );
}

export default MessagesPage;
