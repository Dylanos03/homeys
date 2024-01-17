import { SignUp } from "@clerk/nextjs";

function SignUpPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignUp redirectUrl={"/users/create-profile"} />
    </div>
  );
}

export default SignUpPage;
