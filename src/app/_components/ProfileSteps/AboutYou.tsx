import { UseFormRegister } from "react-hook-form";
import { FormWrapperP } from "./FormWrapperP";
import type { PFormData } from "~/app/users/create-profile/page";

function AboutYou({ Register }: { Register: UseFormRegister<PFormData> }) {
  return (
    <FormWrapperP title="About You">
      <div className="md:min-w-96">
        <div className="flex flex-col gap-1 text-left ">
          <label htmlFor="Username" className="block font-semibold">
            Tell us a little about yourself
          </label>
          <textarea
            {...Register("bio")}
            rows={8}
            className="rounded-sm border-[1px] border-brandDark border-opacity-15 bg-brandLight px-4 py-2 outline-0 outline-brandOrange focus:outline-1"
          />
        </div>
        <div className="flex flex-col gap-2 text-left">
          <label htmlFor="Username" className="font-semibold">
            What are your interests?
          </label>
          <textarea
            {...Register("interests")}
            rows={8}
            className="rounded-sm border-[1px] border-brandDark border-opacity-15 bg-brandLight px-4 py-2 outline-0 outline-brandOrange focus:outline-1"
          />
        </div>
      </div>
    </FormWrapperP>
  );
}

export default AboutYou;
