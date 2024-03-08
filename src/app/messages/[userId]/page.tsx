"use client";

import { useUser } from "@clerk/nextjs";
import parse from "html-react-parser";
import Link from "next/link";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import { pusherClient } from "~/server/pusher";

export type messageT = {
  id: string;
  fromUserId: string;
  toUserId: string;
  text: string;
  fromUser: profileT;
  toUser: profileT;
};

export type profileT = {
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

export function urlify(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const newText = text.replace(urlRegex, function (url) {
    return (
      '<a href="' +
      url +
      '" className="text-blue-600 hover:underline" target="_blank">' +
      url +
      "</a>"
    );
  });
  return parse(newText);
}

function IncomingMessage(props: { image: string; message: string }) {
  const { image, message } = props;

  const newMessage = urlify(message);
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
        <p className="text-sm">{newMessage}</p>
      </div>
    </div>
  );
}

function OutgoingMessage(props: { image: string; message: string }) {
  const { image, message } = props;

  const newMessage = urlify(message);
  return (
    <div className="flex items-center justify-end gap-2">
      <div className="rounded-lg bg-gray-100 p-4 ">
        <p className="text-sm">{newMessage}</p>
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
  const [newMessage, setNewMessage] = useState<string | null>(null);

  const messageHistory = api.messages.getPrivateChat.useQuery(
    {
      user1: user?.id ?? "",
      user2: params.userId,
    },
    {
      onSuccess: () => {
        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        }, 500);
      },
    },
  );
  const sendMessage = api.messages.createMessage.useMutation();
  const profile2 = api.profile.findOne.useQuery(params.userId);

  useEffect(() => {
    pusherClient.subscribe(`chat-${user?.id}`).bind("new-message", () => {
      messageHistory.refetch().catch(console.error);
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 500);
      setNewMessage(null);
    });
    return () => {
      pusherClient.unsubscribe(`private-chat-${user?.id}`);
    };
  }, [newMessage]);

  if (!user) {
    return null;
  }

  const handleSend = () => {
    setMessage("");
    const sendingMessage = {
      message: message,
      senderId: user.id,
      receiverId: params.userId,
    };
    sendMessage.mutate(sendingMessage, {
      onSuccess: () => {
        messageHistory.refetch().catch(console.error);
      },
    });
    setNewMessage(message);
  };
  return (
    <div className="flex h-screen flex-col">
      <div className="flex-initial border-b">
        <div className="container fixed left-0 top-0 flex  max-w-full items-center gap-4 bg-brandLight py-2">
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
      <div className="mt-12 flex-1 p-4 pb-24">
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
            {newMessage && (
              <OutgoingMessage image={user.imageUrl} message={newMessage} />
            )}
          </div>
          <div className="fixed bottom-0 left-0 mt-auto w-screen bg-brandLight p-4">
            <form className="flex gap-2">
              <textarea
                className="max-h-36 min-h-[40px] flex-1 p-1 focus:outline-none focus:ring-0"
                placeholder="Type a message..."
                value={message}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
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
