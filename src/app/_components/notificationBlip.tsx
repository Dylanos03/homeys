"use client";

import { useAuth } from "@clerk/nextjs";
import { api } from "~/trpc/react";

function NotiBlip() {
  const { userId } = useAuth();
  if (!userId) return <></>;
  const notifications = api.profile.notifications.useQuery(userId);
  if (!notifications.data) return <></>;
  return (
    <span className="absolute right-2 top-0 h-3 w-3 rounded-full bg-brandOrange text-sm text-brandLight"></span>
  );
}

export default NotiBlip;
