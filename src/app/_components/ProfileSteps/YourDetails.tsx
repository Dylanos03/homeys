import type { UseFormRegister } from "react-hook-form";
import { FormWrapperP } from "./FormWrapperP";
import type { PFormData } from "~/app/users/create-profile/page";

function YourDetails({
  Register,
  name,
}: {
  Register: UseFormRegister<PFormData>;
  name: string | null | undefined;
}) {
  if (!name) {
    return null;
  }
  return (
    <>
      {" "}
      <FormWrapperP title="Your Details">
        <>
          <div className="flex w-full flex-col gap-1 text-left ">
            <label htmlFor="Username" className="block font-semibold">
              Username <span className="text-red-700"> *</span>
            </label>
            <input
              {...Register("username")}
              type="text"
              className="rounded-sm border-b-2 bg-brandLight px-4 py-2 outline-0 focus:border-brandOrange "
            />
          </div>
          <div className="flex w-full flex-col gap-2 text-left">
            <label htmlFor="Username" className="font-semibold">
              Full Name
            </label>
            <input
              placeholder={name}
              disabled
              type="text"
              className="rounded-sm border-b-2 bg-brandLight px-4 py-2 outline-0 focus:border-brandOrange "
            />
          </div>
        </>
      </FormWrapperP>
    </>
  );
}

export default YourDetails;
