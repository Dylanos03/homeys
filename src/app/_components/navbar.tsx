import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faHouse,
  faMessage,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import NotiBlip from "./notificationBlip";

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

function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 z-50 flex w-screen justify-around bg-brandLight pb-6 pt-4 lg:hidden">
      {sidebarContent.map((item) => {
        return (
          <Link
            href={item.link}
            className="relative flex flex-col gap-1 text-xs font-semibold"
            key={item.name}
          >
            <FontAwesomeIcon
              icon={item.icon}
              size="2x"
              style={{ color: "#bd5103" }}
            />
            {item.blip && <NotiBlip />}
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}

export default Navbar;
