import { toast } from "react-toastify";
import ButtonSm from "../../../components/common/Buttons";

export const DeleteBranchDialogBox = ({
  setIsDeleteBranchDialogOpen,
}: {
  setIsDeleteBranchDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <form
      className="flex w-full flex-col gap-4"
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
        Are you sure want to delete the department “Packing department” ? This
        action is irreversable
      </p>

      <section className="mt-1 grid w-full grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
        <ButtonSm
          className="bg-red-100"
          state="outline"
          text="Cancel"
          onClick={() => setIsDeleteBranchDialogOpen(false)}
        />
        <ButtonSm
          className="bg-red-500 hover:bg-red-700 active:bg-red-500"
          state="default"
          type="submit"
          disabled={!true}
          text="Create Branch"
        />
      </section>
    </form>
  );
};
