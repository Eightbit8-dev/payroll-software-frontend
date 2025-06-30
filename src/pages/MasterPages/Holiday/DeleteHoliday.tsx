import { toast } from "react-toastify";
import ButtonSm from "../../../components/common/Buttons";
import type { HolidayDetails } from "../../../types/apiTypes";
import { useDeleteHoliday } from "../../../queries/HolidayQuery";

export const DeleteHolidayDialogBox = ({
  setIsDeleteDialogOpen,
  holiday,
  setHolidayDetails,
}: {
  setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setHolidayDetails: React.Dispatch<React.SetStateAction<HolidayDetails | null>>;
  holiday: HolidayDetails;
}) => {
  const { mutate, isPending } = useDeleteHoliday();

  const handleDelete = (holidayData: HolidayDetails) => {
    mutate(holidayData);
    setHolidayDetails(null);
  };

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("Deleted holiday " + holiday.name);
        setIsDeleteDialogOpen(false);
      }}
    >
      <header className="header flex w-full flex-row items-center justify-between text-lg font-medium text-red-600">
        Delete Holiday
        <img
          onClick={() => setIsDeleteDialogOpen(false)}
          className="w-5 cursor-pointer"
          src="/icons/close-icon.svg"
          alt="close"
        />
      </header>

      <p className="text-md font-medium text-zinc-700">
        Are you sure you want to delete the holiday{" "}
        <span className="font-semibold text-zinc-900">{holiday.name}</span>? This
        action is irreversible.
      </p>

      <section className="mt-1 grid w-full grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
        <ButtonSm
          className="justify-center font-semibold"
          state="outline"
          text="Cancel"
          onClick={() => setIsDeleteDialogOpen(false)}
        />
        <ButtonSm
          className="items-center justify-center bg-red-500 text-center text-white hover:bg-red-700 active:bg-red-500"
          state="default"
          onClick={() => {
            handleDelete(holiday);
            setIsDeleteDialogOpen(false);
          }}
          text={isPending ? "Deleting..." : "Delete"}
        />
      </section>
    </form>
  );
};
