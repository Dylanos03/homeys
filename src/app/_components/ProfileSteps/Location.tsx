import { UseFormRegister } from "react-hook-form";
import { FormWrapperP } from "./FormWrapperP";
import { PFormData } from "~/app/users/create-profile/page";

function Location({ Register }: { Register: UseFormRegister<PFormData> }) {
  return (
    <FormWrapperP title="Location">
      <div className="w-full">
        <div className="flex flex-col gap-1 text-left">
          <label htmlFor="Username" className="block font-semibold">
            Where are you from?
          </label>
          <input
            {...Register("location")}
            type="text"
            className="rounded-sm border-[1px] border-brandDark border-opacity-15 bg-brandLight px-4 py-2 outline-0 outline-brandOrange focus:outline-1"
          />
        </div>
        <div className="flex flex-col gap-2 text-left">
          <label htmlFor="Username" className="font-semibold">
            What university do you / will you attend?
          </label>
          <input
            {...Register("university")}
            type="text"
            className="rounded-sm border-[1px] border-brandDark border-opacity-15 bg-brandLight px-4 py-2 outline-0 outline-brandOrange focus:outline-1"
          />
        </div>
      </div>
    </FormWrapperP>
  );
}

export default Location;
