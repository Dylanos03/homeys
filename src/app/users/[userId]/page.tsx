import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import Sidebar from "~/app/_components/sidebar";
import AddFriend from "~/app/_components/FriendButton";

async function ProfilePage({ params }: { params: { userId: string } }) {
  const data = await api.profile.findOne.query(params.userId);
  if (!data) {
    return redirect("/");
  }

  return (
    <main className="flex h-screen  items-center justify-center">
      <Sidebar />
      <section className="flex min-h-screen w-[720px] flex-col gap-5  border-x-2  p-8">
        <div className="flex items-center justify-between">
          <Image
            src={data.image}
            width={100}
            height={100}
            alt={data.fullName}
            className="rounded-full outline outline-4 outline-offset-4  outline-brandOrange"
          />

          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faLocationPin}
              style={{ color: "#bd5103" }}
              className="w-4"
            />
            <p>{data.location}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">@{data.username}</h1>
            <AddFriend userId={params.userId} />
          </div>

          <p className="text-xl font-semibold">{data.fullName}</p>

          <div>
            <p className="text-lg font-semibold">Bio</p>
            <p>{data.bio}</p>
          </div>
          <div>
            <p className="text-lg font-semibold">Interests</p>
            <p>{data.interests}</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProfilePage;
