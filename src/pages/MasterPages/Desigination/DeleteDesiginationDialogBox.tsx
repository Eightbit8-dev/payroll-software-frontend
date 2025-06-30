import { toast } from "react-toastify";
import ButtonSm from "../../../components/common/Buttons";
import { useDeleteDesignation } from "../../../queries/DesiginationQuery";
import type { DesignationsDetails } from "../../../types/apiTypes";

export const DeleteDesignationDialogBox = ({
  setIsDeleteDesignationDialogOpen,
  Designation,
  onDeleted,
}: {
  setIsDeleteDesignationDialogOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  Designation: DesignationsDetails;
  onDeleted: () => void;
}) => {
  const { mutate: deleteDesignation, isPending: isDeleting } =
    useDeleteDesignation();

  const handleDelete = () => {
    deleteDesignation(Designation, {
      onSuccess: () => {
        onDeleted(); // reset state in parent
        setIsDeleteDesignationDialogOpen(false);
      },
      onError: () => {
        toast.error(`Failed to delete designation "${Designation.name}"`);
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
        Delete Designation
        <img
          onClick={() => setIsDeleteDesignationDialogOpen(false)}
          className="w-5 cursor-pointer"
          src="/icons/close-icon.svg"
          alt="close"
        />
      </header>

      <p className="text-md font-medium text-zinc-700">
        Are you sure you want to delete the designation{" "}
        <strong>{Designation.name}</strong>? This action is irreversible.
      </p>

      <section className="mt-1 grid w-full grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
        <ButtonSm
          className="justify-center font-semibold"
          state="outline"
          text="Cancel"
          disabled={isDeleting}
          onClick={() => setIsDeleteDesignationDialogOpen(false)}
        />
        <ButtonSm
          className="items-center justify-center bg-red-500 text-center text-white hover:bg-red-700 active:bg-red-500"
          state="default"
          text={isDeleting ? "Deleting..." : "Delete"}
          type="submit"
          disabled={isDeleting}
        />
      </section>
    </form>
  );
};
