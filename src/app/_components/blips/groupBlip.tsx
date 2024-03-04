"use client";

import { useAuth } from "@clerk/nextjs";
import { api } from "~/trpc/react";

function groupBlip() {
  const { userId } = useAuth();
  if (!userId) return <></>;
  const notifications = api.messages.newMessage.useQuery(userId);
  if (!notifications.data) return <></>;
  return (
    <span className="absolute right-1 top-1 h-3 w-3 rounded-full bg-brandOrange text-sm text-brandLight lg:right-8 lg:top-0"></span>
  );
}

export default groupBlip;
