import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create a Post",
  description: "Create a post",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function createPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className={`font-sans ${inter.variable} flex justify-center bg-brandLight text-brandDark`}
    >
      {children}
    </main>
  );
}
