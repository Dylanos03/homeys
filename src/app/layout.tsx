import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import Logo from "../../public/Logo.webp";

import { TRPCReactProvider } from "~/trpc/react";

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
import Image from "next/image";
config.autoAddCss = false; /* eslint-disable import/first */

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Homeys",
  description: "A hub for you to meet your new flatmates",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const TopBar = () => {
  return (
    <header className="sticky left-0 top-0 z-50 flex w-screen justify-center bg-brandLight pb-2 pt-6 lg:hidden">
      <Image src={Logo} alt="logo" height={40} />
    </header>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`font-sans ${inter.variable} overflow-x-hidden bg-brandLight text-brandDark`}
        >
          <TRPCReactProvider cookies={cookies().toString()}>
            {/* <TopBar /> */}
            {children}
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
