"use client";

import type { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { promises as fs } from "fs";
import { FormWrapperP } from "./FormWrapperP";
import type { PFormData } from "~/app/users/create-profile/page";
import { useEffect, useState } from "react";
import uniData from "./uni.json";

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
  const [university, setUniversity] = useState("");
  const [uniOptions, setUniOptions] = useState<TUniOp[]>([]);
  const [uniMenu, setUniMenu] = useState(false);

  useEffect(() => {
    if (university.length > 2) {
      fetchUniResults().catch((err) => console.error(err));
      setUniMenu(true);
    }
    if (university.length < 2) {
      setUniMenu(false);
    }
    async function fetchUniResults() {
      const data = await fs.readFile("./uni.json", "utf-8");
      const uniJson = await JSON.parse(data); // Parse the uniJson string into an array of objects
      const uniRes = uniJson.filter((uni: TUniOp) =>
        uni.name.toLowerCase().includes(university.toLowerCase()),
      );
      setUniOptions(uniRes);
    }
  }, [university]);

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
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            className="rounded-sm border-b-2 bg-brandLight px-4 py-2 outline-0 focus:border-brandOrange "
          />
          {uniMenu && (
            <div className="absolute top-20 w-full rounded border-2 bg-brandLight p-1">
              {uniOptions.slice(0, 4).map((uni) => (
                <button
                  key={uni.name}
                  className="flex w-full max-w-80 flex-col py-2 text-left text-sm"
                  onClick={() => {
                    setUniversity(uni.name);

                    setValue("university", uni.name);
                    setUniMenu(false);
                  }}
                >
                  <span>{uni.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </FormWrapperP>
  );
}

export default Location;
