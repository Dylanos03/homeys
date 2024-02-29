import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center bg-brandOrange">
      <SignIn afterSignInUrl={"/"} signUpUrl="/sign-up" />
    </main>
  );
}
