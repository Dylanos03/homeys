import { auth } from "@clerk/nextjs";
import { api } from "~/trpc/server";

async function NotiBlip() {
  const { userId } = auth();
  if (!userId) return <></>;
  const notifications = await api.profile.notifications.query(userId);
  if (!notifications) return <></>;
  return (
    <span className="absolute right-1 top-0 h-2 w-2 rounded-full bg-brandOrange text-sm text-brandLight"></span>
  );
}

export default NotiBlip;
