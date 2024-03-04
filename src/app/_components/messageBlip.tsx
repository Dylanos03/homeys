"use client";

import { useAuth } from "@clerk/nextjs";
import { api } from "~/trpc/react";

function MessBlip() {
  const { userId } = useAuth();
  if (!userId) return <></>;
  const notifications = api.messages.newMessage.useQuery(userId);
  if (!notifications.data) return <></>; // Updated comparison
  return (
    <span className="absolute right-8 top-0 h-3 w-3 rounded-full bg-brandOrange text-sm text-brandLight"></span>
  );
}

export default MessBlip;
