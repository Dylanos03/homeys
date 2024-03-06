import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import EditProfile from "~/app/_components/editProfile";
import Navbar from "~/app/_components/navbar";
import Sidebar from "~/app/_components/sidebar";
import { api } from "~/trpc/server";

async function EditProfilePage() {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const data = await api.profile.display.query(userId);
  if (!data) {
    return redirect("/");
  }
  return (
    <main className="flex h-screen  items-center justify-center">
      <Sidebar />
      <Navbar name="Home" />
      <section className="flex min-h-screen w-full flex-col gap-3 p-4 lg:w-[720px] lg:gap-5  lg:border-x-2  lg:p-8">
        <EditProfile {...data} id={data.id || 0} />
      </section>
    </main>
  );
}

export default EditProfilePage;
