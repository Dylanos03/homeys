"use client";

import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/0n8ngROTq5f
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { api } from "~/trpc/react";
import { useState } from "react";

function ChevronLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function IncomingMessage(props: { image: string; message: string }) {
  const { image, message } = props;
  return (
    <div className="flex items-center gap-2">
      <img
        alt="Avatar"
        className="rounded-full"
        height="40"
        src={image}
        style={{
          aspectRatio: "40/40",
          objectFit: "cover",
        }}
        width="40"
      />
      <div className="rounded-lg bg-gray-100 p-4 ">
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}

function OutgoingMessage(props: { image: string; message: string }) {
  const { image, message } = props;
  return (
    <div className="flex items-center justify-end gap-2">
      <div className="rounded-lg bg-gray-100 p-4 ">
        <p className="text-sm">{message}</p>
      </div>
      <img
        alt="Avatar"
        className="rounded-full"
        height="40"
        src={image}
        style={{
          aspectRatio: "40/40",
          objectFit: "cover",
        }}
        width="40"
      />
    </div>
  );
}

function ChatPage({ params }: { params: { userId: string } }) {
  const { user } = useUser();
  const [message, setMessage] = useState("");

  const messageHistory = api.messages.getPrivateChat.useQuery({
    user1: user?.id ?? "",
    user2: params.userId,
  });
  const sendMessage = api.messages.createMessage.useMutation();
  const profile2 = api.profile.findOne.useQuery(params.userId);
  if (!user) {
    return null;
  }

  const handleSend = () => {
    setMessage("");
    sendMessage.mutate({
      senderId: user.id,
      receiverId: params.userId,
      message: message,
    });
  };
  return (
    <div className="flex h-screen flex-col">
      <div className="flex-initial border-b">
        <div className="container flex items-center gap-4 py-2">
          <button className="rounded-full">
            <Link className="grid h-8 w-8 place-items-center" href="/messages">
              <ChevronLeftIcon />
              <span className="sr-only">Back</span>
            </Link>
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold leading-none">
              {profile2.data?.username}
            </h1>
          </div>
          <button className="rounded-full">
            <span className="sr-only">Settings</span>
          </button>
        </div>
      </div>
      <div className="flex-1 p-4">
        <div className="flex min-h-0 flex-col justify-end gap-4">
          <div className="flex flex-col gap-2">
            {messageHistory.data?.map((message) => {
              if (message.fromUserId === params.userId) {
                return (
                  <IncomingMessage
                    key={message.id}
                    image={message.fromUser.image}
                    message={message.text}
                  />
                );
              }
              return (
                <OutgoingMessage
                  key={message.id}
                  image={message.fromUser.image}
                  message={message.text}
                />
              );
            })}
          </div>
          <div className="fixed bottom-0 left-0 mt-auto w-screen p-4">
            <form className="flex gap-2">
              <textarea
                className="max-h-36 min-h-[40px] flex-1 p-1 focus:outline-none focus:ring-0"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="rounded-lg bg-brandOrange px-4 py-1 text-white"
                onClick={handleSend}
                type="button"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
