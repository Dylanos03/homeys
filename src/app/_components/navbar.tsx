import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faHouse,
  faMessage,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import NotiBlip from "./blips/notificationBlip";
import MessBlip from "./blips/messageBlip";

const sidebarContent = [
  {
    name: "Home",
    icon: faHouse,
    link: "/",
  },

  {
    name: "My Friends",
    icon: faUserGroup,
    link: "/friends",
  },
  {
    name: "Messages",
    icon: faMessage,
    link: "/messages",
    messBlip: true,
  },
  {
    name: "Notifications",
    icon: faBell,
    link: "/notifications",
    blip: true,
  },
  {
    name: "Group",
    icon: faUserGroup,
    link: "/group",
  },
];

function Navbar({ name }: { name: string }) {
  return (
    <nav className="fixed bottom-0 left-0 z-50 flex w-screen justify-around bg-brandLight pb-6  lg:hidden">
      {sidebarContent.map((item) => {
        return (
          <Link
            href={item.link}
            className={`relative flex flex-col gap-1 pt-4 text-xs font-semibold ${
              name === item.name && "border-t-2 border-brandOrange"
            }`}
            key={item.name}
          >
            <FontAwesomeIcon
              icon={item.icon}
              size="2x"
              style={{ color: "#bd5103" }}
            />
            {item.blip && <NotiBlip />}
            {item.messBlip && <MessBlip />}
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}

export default Navbar;
