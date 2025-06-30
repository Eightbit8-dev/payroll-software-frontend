import { toast } from "react-toastify";
import ButtonSm from "../../../components/common/Buttons";
import type { AllowanceDetails } from "../../../types/apiTypes";
import { useDeleteAllowance } from "../../../queries/AllowanceQuery";

export const DeleteAllowanceDialogBox = ({
  setIsDeleteAllowanceDialogOpen,
  allowance,
  setAllowanceDetails,
}: {
  setIsDeleteAllowanceDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAllowanceDetails: React.Dispatch<React.SetStateAction<AllowanceDetails | null>>;
  allowance: AllowanceDetails;
}) => {
  const { mutate, isPending } = useDeleteAllowance();

  const handleDelete = () => {
    mutate(allowance, {
      onSuccess: () => {
        toast.success(`Deleted allowance type "${allowance.name}" successfully.`);
        setAllowanceDetails(null);
        setIsDeleteAllowanceDialogOpen(false);
      },
      onError: () => {
        toast.error("Failed to delete allowance type.");
      },
    });
  };

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleDelete();
      }}
    >
      <header className="header flex w-full flex-row items-center justify-between text-lg font-medium text-red-600">
        Delete Allowance Type
        <img
          onClick={() => setIsDeleteAllowanceDialogOpen(false)}
          className="w-5 cursor-pointer"
          src="/icons/close-icon.svg"
          alt="close"
        />
      </header>

      <p className="text-md font-medium text-zinc-700">
        Are you sure you want to delete the allowance type{" "}
        <span className="font-semibold text-red-500">{allowance.name}</span>? This action is irreversible.
      </p>

      <section className="mt-1 grid w-full grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
        <ButtonSm
          className="justify-center font-semibold"
          state="outline"
          text="Cancel"
          onClick={() => setIsDeleteAllowanceDialogOpen(false)}
        />
        <ButtonSm
          className="items-center justify-center bg-red-500 text-center text-white hover:bg-red-700 active:bg-red-500"
          state="default"
          type="submit"
          text={isPending ? "Deleting..." : "Delete"}
        />
      </section>
    </form>
  );
};
