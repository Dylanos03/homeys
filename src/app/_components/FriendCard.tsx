import Image from "next/image";
import Link from "next/link";

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
      <div className="flex items-center justify-between rounded-xl px-4 py-1 hover:bg-brandDark hover:bg-opacity-5">
        <Link href={`/users/${userId}`} className="flex items-center gap-2">
          <Image
            className="h-16 w-16 rounded-full object-cover"
            src={userImage}
            alt="profile"
            width={90}
            height={90}
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold">{username}</span>
            <span className="text-md text-gray-400">{fullName}</span>
          </div>
        </Link>
        <button className="font-semibold underline ">Add to group</button>
      </div>
    </div>
  );
}

export default FriendCard;