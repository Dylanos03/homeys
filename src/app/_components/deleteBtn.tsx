"use client";

import { useUser } from "@clerk/nextjs";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";

function DeleteBtn(props: { id: string }) {
  const { user } = useUser();
  const router = useRouter();
  const deleteProfile = api.profile.delete.useMutation({
    onSuccess: () => {
      router.push("/");
    },
  });
  const [deleting, setDeleting] = useState(false);
  if (!user) {
    return <></>;
  }
  if (user?.id !== props.id) {
    return <></>;
  }

  return (
    <button
      disabled={deleting}
      onClick={() => {
        setDeleting(true);
        deleteProfile.mutate(props.id);
      }}
      className="rounded-md bg-brandOrange px-2 py-1 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
    >
      Delete Profile <FontAwesomeIcon icon={faTrash} />
    </button>
  );
}

export default DeleteBtn;
