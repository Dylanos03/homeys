import NotificationList from "../_components/NotificationList";
import Navbar from "../_components/navbar";
import Sidebar from "../_components/sidebar";

function Notifications() {
  return (
    <>
      <main className="relative m-0 flex min-h-screen w-screen justify-center  lg:px-4 ">
        <Sidebar />
        <Navbar />
        <section className="flex w-full flex-col lg:w-[720px] lg:border-x-2">
          <NotificationList />
        </section>
      </main>
    </>
  );
}

export default Notifications;
