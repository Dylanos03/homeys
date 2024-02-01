import FriendList from "../_components/FriendList";
import Sidebar from "../_components/sidebar";

function FriendsPage() {
  return (
    <>
      <main className="relative m-0 flex min-h-screen w-screen justify-center  px-4 ">
        <Sidebar />
        <section className="flex w-[720px] flex-col border-x-2">
          <FriendList />
        </section>
      </main>
    </>
  );
}

export default FriendsPage;
