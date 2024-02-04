import Sidebar from "../_components/sidebar";

function GroupPage() {
  return (
    <>
      <main className="relative m-0 flex min-h-screen w-screen justify-center  px-4 ">
        <Sidebar />
        <section className="flex w-[720px] flex-col border-x-2"></section>
      </main>
    </>
  );
}

export default GroupPage;
