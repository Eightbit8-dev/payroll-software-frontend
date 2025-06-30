import { toast } from "react-toastify";
import ButtonSm from "../../../components/common/Buttons";
import type { ShiftDetails } from "../../../types/apiTypes";

import { useEffect } from "react";
import { useDeleteShift } from "../../../queries/ShiftQuery";

export const DeleteShiftDialogBox = ({
  setIsDeleteShiftDialogOpen,
  Shift,
  setShiftData,
}: {
  setIsDeleteShiftDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  Shift: ShiftDetails;
  setShiftData: React.Dispatch<React.SetStateAction<ShiftDetails | null>>;
}) => {
  const {
    mutate: deleteShift,
    isPending: isDeleteShiftLoading,
    isSuccess,
  } = useDeleteShift();

  useEffect(() => {
    if (isSuccess) {
      setShiftData({
        id: 0,
        name: "",
        type: "",
        present: "Yes",
        lop: "No",
        earlyGoing: "",
        lateComing: "",
        isNight: "No",
        shiftIn: "",
        shiftOut: "",
        lunchOut: "",
        lunchIn: "",
      } as ShiftDetails);
    }
  }, [isSuccess]);

  const handleDelete = (Shift: ShiftDetails) => {
    deleteShift(Shift);
  };

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("Deleted Shift Details " + JSON.stringify(":"));
        setIsDeleteShiftDialogOpen(false);
      }}
    >
      <header className="header flex w-full flex-row items-center justify-between text-lg font-medium text-red-600">
        Delete Shift Details
        <img
          onClick={() => setIsDeleteShiftDialogOpen(false)}
          className="w-5 cursor-pointer"
          src="/icons/close-icon.svg"
          alt="close"
        />
      </header>

      <p className="text-md font-medium text-zinc-700">
        Are you sure want to delete the Shift Details {Shift.name} ? This action
        is irreversible
      </p>

      <section className="mt-1 grid w-full grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
        <ButtonSm
          className="justify-center font-semibold"
          state="outline"
          text="Cancel"
          onClick={() => setIsDeleteShiftDialogOpen(false)}
        />
        <ButtonSm
          className="items-center justify-center bg-red-500 text-center text-white hover:bg-red-700 active:bg-red-500"
          state="default"
          onClick={() => {
            handleDelete(Shift);
            setIsDeleteShiftDialogOpen(false);
          }}
          text={isDeleteShiftLoading ? "Deleting..." : "Delete"}
        />
      </section>
    </form>
  );
};
