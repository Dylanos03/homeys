function WarningPopUp(props: {
  warningType: string;
  responseFn: (res: boolean) => void;
}) {
  return (
    <div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-brandDark bg-opacity-15">
      <div className="flex flex-col items-center gap-4 rounded-lg bg-brandLight p-12">
        <span className="text-3xl font-bold">Are you sure?</span>
        <p>You are about to {props.warningType}</p>
        <div className="flex w-full justify-between">
          <button
            onClick={() => props.responseFn(false)}
            className="rounded-lg bg-brandOrange px-6 py-3 font-semibold text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => props.responseFn(true)}
            className="font-semibold text-brandDark underline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default WarningPopUp;
