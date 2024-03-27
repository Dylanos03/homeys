import type { UseFormRegister } from "react-hook-form";
import { FormWrapperP } from "./FormWrapperP";
import type { PFormData } from "~/app/users/create-profile/page";

function AboutYou({ Register }: { Register: UseFormRegister<PFormData> }) {
  return (
    <FormWrapperP title="About You">
      <div className="flex w-full flex-col gap-2">
        <div className="flex flex-col justify-start text-left ">
          <label htmlFor="Username" className="block text-left font-semibold">
            Tell us a little about yourself
            <span className="text-red-700"> *</span>
          </label>
          <textarea
            {...Register("bio")}
            rows={3}
            className="rounded-sm border-[1px] border-brandDark border-opacity-15 bg-brandLight px-4 py-2 outline-0 outline-brandOrange focus:outline-1"
          />
        </div>
        <div className="flex flex-col gap-2 text-left">
          <label htmlFor="Username" className="font-semibold">
            What are your interests?<span className="text-red-700"> *</span>
          </label>
          <textarea
            {...Register("interests")}
            rows={3}
            className="rounded-sm border-[1px] border-brandDark border-opacity-15 bg-brandLight px-4 py-2 outline-0 outline-brandOrange focus:outline-1"
          />
        </div>
      </div>
    </FormWrapperP>
  );
}

export default AboutYou;
