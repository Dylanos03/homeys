import GroupView from "../_components/group";
import Sidebar from "../_components/sidebar";

function groups() {
  return (
    <>
      <main className="relative m-0 flex min-h-screen w-screen justify-center  px-4 ">
        <Sidebar />
        <section className="flex w-[720px] flex-col border-x-2">
          <GroupView />
        </section>
      </main>
    </>
  );
}

export default groups;
