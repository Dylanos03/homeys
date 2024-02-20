import Sidebar from "../_components/sidebar";
import { auth } from "@clerk/nextjs";
import { api } from "~/trpc/server";
import FriendCard from "../_components/FriendCard";
import Navbar from "../_components/navbar";

async function FriendList() {
  const { userId } = auth();

  if (!userId) {
    return <></>;
  }

  const getFriends = await api.profile.getAllFriends.query(userId);

  if (!getFriends) {
    return <></>;
  }

  return (
    <>
      <h1 className="pl-2 pt-2 text-2xl font-bold">Friends list</h1>

      {getFriends.length === 0 && (
        <p className="flex justify-center">No friends yet...</p>
      )}
      {getFriends.map((friend) => {
        return (
          <FriendCard
            key={friend.userId}
            userId={friend.userId}
            username={friend.username}
            userImage={friend.image}
            fullName={friend.fullName}
          />
        );
      })}
    </>
  );
}

function FriendsPage() {
  return (
    <>
      <main className="relative m-0 flex min-h-screen w-screen justify-center  px-4 ">
        <Sidebar />
        <Navbar />
        <section className="flex w-[720px] flex-col border-x-2">
          <FriendList />
        </section>
      </main>
    </>
  );
}

export default FriendsPage;
