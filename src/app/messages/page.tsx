import Sidebar from "../_components/sidebar";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { api } from "~/trpc/server";

type Message = {
  fromUser: User;
  fromUserId: string;
  toUser: User;
  toUserId: string;
  createdAt: Date;
  text: string;
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
  const userMessageMap: Map<number, Message> = new Map();
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
            href={`/messages/${user.userId}/${userId}`}
            key={user.id}
            className="flex gap-2 border-b-[1px] border-b-slate-200 px-2 py-2"
          >
            <Image
              height={50}
              width={50}
              className="rounded-full"
              alt={username}
              src={image}
            ></Image>
            <div className="flex flex-col justify-between">
              <span>{username}</span>
              <p>
                <span className="text-neutral-400">
                  {message.fromUserId === userId ? "You: " : "Them: "}
                </span>
                {message.text}
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
    <main className="relative m-0 flex min-h-screen w-screen justify-center  px-4 ">
      <Sidebar />
      <section className="flex w-[720px] flex-col border-x-2 py-2">
        <h1 className="p-2 text-2xl font-semibold">Your Messages:</h1>
        <MessageList />
      </section>
    </main>
  );
}

export default MessagesPage;
