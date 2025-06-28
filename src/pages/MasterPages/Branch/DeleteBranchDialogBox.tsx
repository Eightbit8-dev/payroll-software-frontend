import ButtonSm from "../../../components/common/Buttons";
import { useDeleteBranch } from "../../../queries/BranchQuery";
import type { BranchDetails } from "../../../types/apiTypes";
import type { FormState } from "../../../types/appTypes";
import { useEffect } from "react";

export const DeleteBranchDialogBox = ({
  setIsDeleteBranchDialogOpen,
  branch,
  onDeleted,
}: {
  setIsDeleteBranchDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  setBranch: React.Dispatch<React.SetStateAction<BranchDetails | null>>;
  branch: BranchDetails;
  onDeleted?: () => void;
}) => {
  const { mutate: deleteBranch, isPending: isDeleteBranchLoading } = useDeleteBranch();

const handleDelete = () => {
  deleteBranch(branch, {
    onSuccess: () => {
      setIsDeleteBranchDialogOpen(false);
      if (onDeleted) {
        onDeleted();
      }
    },
  });
};

  return (
    <div className="flex w-full flex-col gap-4">
      <header className="header flex w-full flex-row items-center justify-between text-lg font-medium text-red-600">
        Delete Branch
        <img
          onClick={() => setIsDeleteBranchDialogOpen(false)}
          className="w-5 cursor-pointer"
          src="/icons/close-icon.svg"
          alt="close"
        />
      </header>

      <p className="text-md font-medium text-zinc-700">
        Are you sure you want to delete the branch <strong>{branch.name}</strong>? This action is irreversible.
      </p>

      <section className="mt-1 grid w-full grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
        <ButtonSm
          className="justify-center font-semibold"
          state="outline"
          text="Cancel"
          onClick={() => setIsDeleteBranchDialogOpen(false)}
        />
        <ButtonSm
          className="items-center justify-center bg-red-500 text-center text-white hover:bg-red-700 active:bg-red-500"
          state="default"
          onClick={handleDelete}
          text={isDeleteBranchLoading ? "Deleting..." : "Delete"}
        />
      </section>
    </div>
  );
};
