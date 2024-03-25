"use client";

import type { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FormWrapperP } from "./FormWrapperP";
import type { PFormData } from "~/app/users/create-profile/page";

type TUniOp = {
  country: string;
  name: string;
  web_pages: string[];
};

function Location({
  Register,
  setValue,
}: {
  Register: UseFormRegister<PFormData>;
  setValue: UseFormSetValue<PFormData>;
}) {
  return (
    <FormWrapperP title="Location">
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-1 text-left">
          <label className="block font-semibold">
            Where are you looking for a house?
            <span className="text-red-700"> *</span>
          </label>
          <input
            {...Register("location")}
            type="text"
            className="rounded-sm border-b-2 bg-brandLight px-4 py-2 outline-0 focus:border-brandOrange "
          />
        </div>
        <div className="relative flex flex-col gap-2 text-left">
          <label className="font-semibold">
            What university do you / will you attend?
            <span className="text-red-700"> *</span>
          </label>
          <input
            {...Register("university")}
            type="text"
            className="rounded-sm border-b-2 bg-brandLight px-4 py-2 outline-0 focus:border-brandOrange "
          />
        </div>
      </div>
    </FormWrapperP>
  );
}

export default Location;
