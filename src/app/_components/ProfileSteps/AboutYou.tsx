import { FormWrapperP } from "~/app/users/create-profile/page";

function AboutYou() {
  return (
    <FormWrapperP title="About You">
      <>
        <div className="flex flex-col gap-1 text-left">
          <label htmlFor="Username" className="block font-semibold">
            Username
          </label>
          <input
            type="text"
            className="rounded-sm border-[1px] border-brandDark border-opacity-15 bg-brandLight px-4 py-2 outline-0 outline-brandOrange focus:outline-1"
          />
        </div>
        <div className="flex flex-col gap-2 text-left">
          <label htmlFor="Username" className="font-semibold">
            Fullname
          </label>
          <input
            type="text"
            className="rounded-sm border-[1px] border-brandDark border-opacity-15 bg-brandLight px-4 py-2 outline-0 outline-brandOrange focus:outline-1"
          />
        </div>
      </>
    </FormWrapperP>
  );
}

export default AboutYou;
