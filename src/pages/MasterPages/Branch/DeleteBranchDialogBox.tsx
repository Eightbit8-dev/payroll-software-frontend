import { toast } from "react-toastify";
import ButtonSm from "../../../components/common/Buttons";
import { useDeleteBranch } from "../../../queries/BranchQuery";
import type { BranchDetails } from "../../../types/apiTypes";

export const DeleteBranchDialogBox = ({
  setIsDeleteBranchDialogOpen,
  branch,
}: {
  setIsDeleteBranchDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  branch: BranchDetails;
}) => {
  const { mutate: deleteBranch, isPending: isDeleteBranchLoading } =
    useDeleteBranch();

  const handleDelete = (branch: BranchDetails) => {
    deleteBranch(branch);
  };
  return (
    <form
      className="flex w-[300px] w-full flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("Deleted branch " + JSON.stringify(":"));
        setIsDeleteBranchDialogOpen(false);
      }}
    >
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
        Are you sure want to delete the branch {branch.name} ? This action is
        irreversable
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
          onClick={() => {
            handleDelete(branch);
            setIsDeleteBranchDialogOpen(false);
          }}
          text={isDeleteBranchLoading ? "Deleting..." : "Delete"}
        />
      </section>
    </form>
  );
};
