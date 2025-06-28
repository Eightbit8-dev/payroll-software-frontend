import { toast } from "react-toastify";
import ButtonSm from "../../../components/common/Buttons";
import type { BloodDetails } from "../../../types/apiTypes";
import { useDeleteBlood } from "../../../queries/BloodQuery";

export const DeleteBloodDialogBox = ({
  setIsDeleteBloodDialogOpen,
  Blood,
}: {
  setIsDeleteBloodDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  Blood: BloodDetails;
}) => {
  const { mutate: deleteBlood, isPending: isDeleteBloodLoading } =
    useDeleteBlood();

  const handleDelete = (Blood: BloodDetails) => {
    deleteBlood(Blood);
  };
  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("Deleted Designation " + JSON.stringify(":"));
        setIsDeleteBloodDialogOpen(false);
      }}
    >
      <header className="header flex w-full flex-row items-center justify-between text-lg font-medium text-red-600">
        Delete Designation
        <img
          onClick={() => setIsDeleteBloodDialogOpen(false)}
          className="w-5 cursor-pointer"
          src="/icons/close-icon.svg"
          alt="close"
        />
      </header>

      <p className="text-md font-medium text-zinc-700">
        Are you sure want to delete the Designation {Blood.name} ? This action is
        irreversable
      </p>

      <section className="mt-1 grid w-full grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
        <ButtonSm
          className="justify-center font-semibold"
          state="outline"
          text="Cancel"
          onClick={() => setIsDeleteBloodDialogOpen(false)}
        />
        <ButtonSm
          className="items-center justify-center bg-red-500 text-center text-white hover:bg-red-700 active:bg-red-500"
          state="default"
          onClick={() => {
            handleDelete(Blood);
            setIsDeleteBloodDialogOpen(false);
          }}
          text={isDeleteBloodLoading ? "Deleting..." : "Delete"}
        />
      </section>
    </form>
  );
};
