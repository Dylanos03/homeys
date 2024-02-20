import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faHouse,
  faMessage,
  faRightToBracket,
  faUser,
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
    name: "Groups",
    icon: faUserGroup,
    link: "/group",
  },
  {
    name: "Notifications",
    icon: faBell,
    link: "/notifications",
    blip: true,
  },
];

function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 z-50 flex w-screen justify-between bg-brandLight p-4 lg:hidden">
      {sidebarContent.map((item) => {
        return (
          <Link href={item.link} className="relative">
            <FontAwesomeIcon icon={item.icon} size="lg" />
            {item.blip && <NotiBlip />}
          </Link>
        );
      })}
    </nav>
  );
}

export default Navbar;
