import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { api } from "~/trpc/server";
import { redirect, useRouter } from "next/navigation";

async function ProfilePage({ params }: { params: { userId: string } }) {
  const data = await api.profile.findOne.query(params.userId);
  if (!data) {
    return redirect("/users/create-profile");
  }

  return (
    <main className="flex h-screen  items-center justify-center">
      <section className="flex max-w-3xl flex-col gap-5 rounded-3xl bg-slate-100 p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Image
              src={data.image}
              width={100}
              height={100}
              alt={data.fullName}
              className="rounded-full outline outline-4 outline-offset-4  outline-brandOrange"
            />
            <h1 className="text-3xl font-bold">@{data.username}</h1>
          </div>
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
