import { Inter } from "next/font/google";

export const metadata = {
  title: "Homeys",
  description: "A hub for you to meet your new flatmates",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
