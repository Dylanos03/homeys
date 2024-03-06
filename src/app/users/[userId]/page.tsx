import {
  faBuilding,
  faEdit,
  faLocationPin,
  faMessage,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import Sidebar from "~/app/_components/sidebar";
import AddFriend from "~/app/_components/FriendButton";
import DeleteBtn from "~/app/_components/deleteBtn";
import { SignOutButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import Navbar from "~/app/_components/navbar";

const ChatButton = (props: { userId: string }) => {
  return (
    <Link
      href={`/messages/${props.userId}`}
      className="rounded-md border-4 border-brandOrange px-2 py-1 font-bold text-brandOrange"
    >
      <span className="hidden lg:flex">Message</span>
      <span className="lg:hidden">
        <FontAwesomeIcon icon={faMessage} style={{ color: "#bd5103" }} />
      </span>
    </Link>
  );
};

const SignOutBtn = () => {
  return (
    <SignOutButton>
      <div className="flex h-8 cursor-pointer items-center gap-2 rounded-md border-2 border-brandOrange  px-2 hover:bg-brandDark hover:bg-opacity-5">
        <FontAwesomeIcon icon={faRightToBracket} style={{ color: "#bd5103" }} />
      </div>
    </SignOutButton>
  );
};

const EditProfileBtn = () => {
  return (
    <Link
      href={"/users/edit-profile"}
      className="flex h-8 items-center gap-1 rounded-md border-2 border-brandOrange px-2 font-bold text-brandOrange"
    >
      <FontAwesomeIcon icon={faEdit} style={{ color: "#bd5103" }} />
      Edit Profile
    </Link>
  );
};

async function ProfilePage({ params }: { params: { userId: string } }) {
  const data = await api.profile.findOne.query(params.userId);
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  if (!data) {
    return redirect("/");
  }

  const isFriend = data.friends.some((friend) => friend.userId === userId);

  return (
    <main className="flex h-screen  items-center justify-center">
      <Sidebar />
      <Navbar name="Home" />
      <section className="flex min-h-screen w-full flex-col gap-3 p-4 lg:w-[720px] lg:gap-5  lg:border-x-2  lg:p-8">
        <div className="flex items-center justify-between">
          <Image
            src={data.image}
            width={100}
            height={100}
            alt={data.fullName}
            className="rounded-full"
          />

          <div className="overflow-hidden px-4">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faLocationPin}
                style={{ color: "#bd5103" }}
                className="w-4"
              />
              <p>{data.location}</p>
            </div>
            <div className="flex  items-center gap-2">
              <FontAwesomeIcon
                icon={faBuilding}
                style={{ color: "#bd5103" }}
                className="w-4"
              />
              <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                {data.university}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold lg:text-3xl">@{data.username}</h1>

            <AddFriend userId={params.userId} />
            <DeleteBtn id={params.userId} />
            {userId === params.userId && <EditProfileBtn />}
            {userId === params.userId && <SignOutBtn />}

            {isFriend && <ChatButton userId={params.userId} />}
          </div>

          <div className="flex items-center gap-4">
            <p className="text-xl font-semibold">{data.fullName}</p>
            <span className="h-1 w-1 rounded-full bg-slate-400"></span>
            <span className="text-slate-400">
              {data.friends.length} friend
              {data.friends.length > 1 || (data.friends.length < 1 && "s")}
            </span>
          </div>

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
