import { SignUp } from "@clerk/nextjs";

function SignUpPage() {
  return (
    <main className="flex h-screen items-center justify-center bg-brandOrange">
      <SignUp afterSignUpUrl={"/users/create-profile"} signInUrl="/sign-in" />
    </main>
  );
}

export default SignUpPage;
