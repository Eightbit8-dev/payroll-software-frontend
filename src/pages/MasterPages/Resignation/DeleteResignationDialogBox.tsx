import { toast } from "react-toastify";
import ButtonSm from "../../../components/common/Buttons";
import type { ResignationDetails } from "../../../types/apiTypes";
import { useDeleteResignation } from "../../../queries/ResiginationQuery";
import { useEffect } from "react";

export const DeleteResignationDialogBox = ({
  setIsDeleteDesignationDialogOpen,
  Resignation,
  setResignationData,
}: {
  setIsDeleteDesignationDialogOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  Resignation: ResignationDetails;
  setResignationData: React.Dispatch<
    React.SetStateAction<ResignationDetails | null>
  >;
}) => {
  const {
    mutate: deleteResignation,
    isPending: isDeleteResignationLoading,
    isSuccess,
  } = useDeleteResignation();

  const handleDelete = (Resignation: ResignationDetails) => {
    deleteResignation(Resignation);
  };

  useEffect(() => {
    if (isSuccess) {
      setResignationData({
        id: 0,
        name: "",
        remarks: "",
      } as ResignationDetails);
    }
  }, [isSuccess]);

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("Deleted Designation " + JSON.stringify(":"));
        setIsDeleteDesignationDialogOpen(false);
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
        Are you sure want to delete the Designation {Resignation.name} ? This
        action is irreversable
      </p>

      <section className="mt-1 grid w-full grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
        <ButtonSm
          className="justify-center font-semibold"
          state="outline"
          text="Cancel"
          onClick={() => setIsDeleteDesignationDialogOpen(false)}
        />
        <ButtonSm
          className="items-center justify-center bg-red-500 text-center text-white hover:bg-red-700 active:bg-red-500"
          state="default"
          onClick={() => {
            handleDelete(Resignation);
            setIsDeleteDesignationDialogOpen(false);
          }}
          text={isDeleteResignationLoading ? "Deleting..." : "Delete"}
        />
      </section>
    </form>
  );
};
