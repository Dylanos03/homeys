"use client";

import { useUser } from "@clerk/nextjs";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";
import WarningPopUp from "./Warning";

function DeleteBtn(props: { id: string }) {
  const { user } = useUser();
  const router = useRouter();
  const deleteProfile = api.profile.delete.useMutation({
    onSuccess: () => {
      router.push("/");
    },
  });
  const [deleting, setDeleting] = useState(false);
  const [warning, setWarning] = useState(false);
  if (!user) {
    return <></>;
  }
  if (user?.id !== props.id) {
    return <></>;
  }
  const handleDelete = (e: boolean) => {
    if (e) {
      deleteProfile.mutate(props.id);
      setWarning(false);
    } else {
      deleteProfile.mutate(props.id);
      setDeleting(false);
    }
  };

  return (
    <div>
      {warning && (
        <WarningPopUp
          warningType="delete your profile"
          responseFn={(e) => handleDelete(e)}
        />
      )}
      <button
        disabled={deleting}
        onClick={() => setWarning(true)}
        className="rounded-md bg-brandOrange px-2 py-1 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        <FontAwesomeIcon icon={faTrash} />
        <span className="hidden lg:flex">Delete Profile</span>
      </button>
    </div>
  );
}

export default DeleteBtn;
