import Image from "next/image";
import Link from "next/link";
import InviteToGroup from "./InviteGroup";

type friend = {
  username: string;
  userId: string;
  userImage: string;
  fullName: string;
};

function FriendCard(props: friend) {
  const { username, userId, userImage, fullName } = props;
  return (
    <div>
      <div className="flex items-center justify-between border-b-[2px] px-4 py-2 hover:bg-brandDark hover:bg-opacity-5">
        <Link href={`/users/${userId}`} className="flex items-center gap-2">
          <Image
            className="h-12 w-12 rounded-full object-cover lg:h-16 lg:w-16"
            src={userImage}
            alt="profile"
            width={90}
            height={90}
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold">{username}</span>
            <span className="text-sm text-gray-400">{fullName}</span>
          </div>
        </Link>
        <InviteToGroup friendId={userId} userId={userId} />
      </div>
    </div>
  );
}

export default FriendCard;
