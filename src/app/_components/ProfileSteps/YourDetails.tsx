import { UseFormRegister } from "react-hook-form";
import { FormWrapperP } from "./FormWrapperP";
import { PFormData } from "~/app/users/create-profile/page";

function YourDetails({
  Register,
  name,
}: {
  Register: UseFormRegister<PFormData>;
  name: string | null | undefined;
}) {
  return (
    <>
      {" "}
      <FormWrapperP title="Your Details">
        <>
          <div className="flex flex-col gap-1 text-left ">
            <label htmlFor="Username" className="block font-semibold">
              Username
            </label>
            <input
              {...Register("username")}
              type="text"
              className="rounded-sm border-[1px] border-brandDark border-opacity-15 bg-brandLight px-4 py-2 outline-0 outline-brandOrange focus:outline-1"
            />
          </div>
          <div className="flex flex-col gap-2 text-left">
            <label htmlFor="Username" className="font-semibold">
              Fullname
            </label>
            <input
              placeholder={name || "Fullname"}
              disabled
              type="text"
              className="rounded-sm border-[1px] border-brandDark border-opacity-15 bg-brandLight px-4 py-2 outline-0 outline-brandOrange focus:outline-1"
            />
          </div>
        </>
      </FormWrapperP>
    </>
  );
}

export default YourDetails;
