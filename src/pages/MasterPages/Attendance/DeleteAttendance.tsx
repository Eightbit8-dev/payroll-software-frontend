import { toast } from "react-toastify";
import ButtonSm from "../../../components/common/Buttons";
import type { AttendanceDetails } from "../../../types/apiTypes";

import { useDeleteAttendance } from "../../../queries/AttendanceQuery";

export const DeleteAttendanceDialogBox = ({
  setIsDeleteAttendanceDialogOpen,
  attendance,
  setAttendanceDetails,
}: {
  setIsDeleteAttendanceDialogOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setAttendanceDetails: React.Dispatch<
    React.SetStateAction<AttendanceDetails | null>
  >;
  attendance: AttendanceDetails;
}) => {
  const { mutate, isPending } = useDeleteAttendance();

  const handleDelete = (attendanceType: AttendanceDetails) => {
    mutate(attendanceType);
    setAttendanceDetails({
      id: 0,
      name: "",
      code: "",
      factor: 0,
      mastertypeId: 0,
      carryForward: false,
      remarks: "",
    } as AttendanceDetails);
  };
  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("Deleted Attendance type " + JSON.stringify(":"));
        setIsDeleteAttendanceDialogOpen(false);
      }}
    >
      <header className="header flex w-full flex-row items-center justify-between text-lg font-medium text-red-600">
        Delete Attendance type
        <img
          onClick={() => setIsDeleteAttendanceDialogOpen(false)}
          className="w-5 cursor-pointer"
          src="/icons/close-icon.svg"
          alt="close"
        />
      </header>

      <p className="text-md font-medium text-zinc-700">
        Are you sure want to delete the attendance type {attendance.name} ? This
        action is irreversable
      </p>

      <section className="mt-1 grid w-full grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
        <ButtonSm
          className="justify-center font-semibold"
          state="outline"
          text="Cancel"
          onClick={() => setIsDeleteAttendanceDialogOpen(false)}
        />
        <ButtonSm
          className="items-center justify-center bg-red-500 text-center text-white hover:bg-red-700 active:bg-red-500"
          state="default"
          onClick={() => {
            handleDelete(attendance);
            setIsDeleteAttendanceDialogOpen(false);
          }}
          text={isPending ? "Deleting..." : "Delete"}
        />
      </section>
    </form>
  );
};
