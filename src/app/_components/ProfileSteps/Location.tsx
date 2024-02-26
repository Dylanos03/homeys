"use client";

import { UseFormRegister } from "react-hook-form";
import { FormWrapperP } from "./FormWrapperP";
import type { PFormData } from "~/app/users/create-profile/page";
import { useEffect, useState } from "react";

type TUniOp = {
  country: string;
  name: string;
  web_pages: string[];
};

function Location({ Register }: { Register: UseFormRegister<PFormData> }) {
  const [location, setLocation] = useState("");
  const [university, setUniversity] = useState("");
  const [locationOptions, setLocationOptions] = useState([]);
  const [uniOptions, setUniOptions] = useState<TUniOp[]>([]);
  const [locMenu, setLocMenu] = useState(false);
  const [uniMenu, setUniMenu] = useState(false);

  useEffect(() => {
    if (university.length > 2) {
      fetchResults();
      setUniMenu(true);
    }
    if (university.length < 2) {
      setUniMenu(false);
    }
    async function fetchResults() {
      const uniResults = await fetch(
        `http://universities.hipolabs.com/search?name=${university}&country=United%20Kingdom`,
      );
      const uniResJson = await uniResults.json();
      setUniOptions(uniResJson);
    }

    return () => {};
  }, [location, university]);

  return (
    <FormWrapperP title="Location">
      <div className="w-full">
        <div className="flex flex-col gap-1 text-left">
          <label className="block font-semibold">
            Where are you looking for a house?
          </label>
          <input
            {...Register("location")}
            type="text"
            value={location}
            className="rounded-sm border-[1px] border-brandDark border-opacity-15 bg-brandLight px-4 py-2 outline-0 outline-brandOrange focus:outline-1"
          />
        </div>
        <div className="flex flex-col gap-2 text-left">
          <label className="font-semibold">
            What university do you / will you attend?
          </label>
          <input
            {...Register("university")}
            type="text"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            className="rounded-sm border-[1px] border-brandDark border-opacity-15 bg-brandLight px-4 py-2 outline-0 outline-brandOrange focus:outline-1"
          />
          {uniMenu && (
            <div>
              {uniOptions.slice(0, 4).map((uni) => (
                <button
                  className="flex max-w-80 flex-col gap-1 text-sm"
                  onClick={() => {
                    setUniMenu(false);
                    setUniversity(uni.name);
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
