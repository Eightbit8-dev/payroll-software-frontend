import ButtonSm from "../../../components/common/Buttons";
import AttendanceEdit from "./Attendance.component";
import PageHeader from "../../../components/masterPage.components/PageHeader";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import MasterPagesSkeleton from "../../../components/masterPage.components/LoadingSkeleton";
import ErrorComponent from "../../../components/common/Error";
import type { FormState } from "../../../types/appTypes";
import type { AttendanceDetails } from "../../../types/apiTypes";
import { useFetchAttendances } from "../../../queries/AttendanceQuery";
import DialogBox from "../../../components/common/DialogBox";
import { DeleteAttendanceDialogBox } from "./DeleteAttendance";

const AttendancePage = () => {
  const [isDeleteAttendanceDialogOpen, setIsDeleteAttendanceDialogOpen] =
    useState(false);
  const [attendance, setAttendance] = useState<AttendanceDetails | null>(null);
  const [formState, setFormState] = useState<FormState>("create");

  const { data: attendances, isLoading, isError } = useFetchAttendances();
  if (isLoading) return <MasterPagesSkeleton />;
  if (isError) return <ErrorComponent />;

  const handleRowClick = (item: AttendanceDetails) => {
    setAttendance({
      id: item.id,
      name: item.name,
      code: item.code,
      remarks: item.remarks || "",
      carryForward: item.carryForward,
      factor: item.factor,
      mastertypeId: item.mastertypeId,
    });
    setFormState("display");
  };

  const handleEdit = (item: AttendanceDetails) => {
    setAttendance({
      id: item.id,
      name: item.name,
      code: item.code,
      remarks: item.remarks || "",
      carryForward: item.carryForward,
      factor: item.factor,
      mastertypeId: item.mastertypeId,
    });
    setFormState("edit");
  };

  const handleDelete = (item: AttendanceDetails) => {
    setAttendance(item);
    setIsDeleteAttendanceDialogOpen(true);
  };

  return (
    <main className="flex w-full max-w-full flex-col gap-4 md:flex-row">
      <AnimatePresence>
        {isDeleteAttendanceDialogOpen && attendance && (
          <DialogBox setToggleDialogueBox={setIsDeleteAttendanceDialogOpen}>
            <DeleteAttendanceDialogBox
              setIsDeleteAttendanceDialogOpen={setIsDeleteAttendanceDialogOpen}
              attendance={attendance}
              setAttendanceDetails={setAttendance}
              // todo add attendance setstate cleanup here
            />
          </DialogBox>
        )}
      </AnimatePresence>

      {/* Left Table Section */}
      <section className="table-container flex w-full flex-col gap-3 rounded-[12px] bg-white/80 p-4 shadow-sm md:w-[40%]">
        <header className="flex h-max flex-row items-center justify-between">
          <PageHeader title="Attendance type Configuration" />
        </header>

        <div className="tables flex w-full flex-col overflow-clip rounded-[9px]">
          {/* Table Header */}
          <header className="header flex w-full flex-row items-center gap-2 bg-gray-200 px-3">
            <p className="w-max min-w-[100px] px-2 py-4 text-start text-sm font-semibold text-zinc-900">
              S.No
            </p>
            <p className="w-full text-start text-sm font-semibold text-zinc-900">
              Name
            </p>
            <p className="w-full text-start text-sm font-semibold text-zinc-900">
              Code
            </p>

            <p className="min-w-[120px] text-start text-sm font-semibold text-zinc-900">
              Action
            </p>
          </header>

          {/* No Data */}
          {attendances?.length === 0 && (
            <h2 className="text-md my-3 text-center font-medium text-zinc-600">
              No Attendance types Found
            </h2>
          )}

          {/* Table Rows */}
          {attendances?.map((item: AttendanceDetails, index) => {
            const isSelected = attendance?.id === item.id;
            return (
              <div
                key={item.id}
                className={`cell-1 flex w-full cursor-pointer flex-row items-center gap-2 px-3 py-2 text-zinc-700 ${
                  isSelected
                    ? "bg-gray-100"
                    : index % 2 === 0
                      ? "bg-white"
                      : "bg-slate-50"
                } hover:bg-slate-100 active:bg-slate-200`}
                onClick={() => handleRowClick(item)}
              >
                <p className="w-max min-w-[100px] px-2 py-4 text-start text-sm font-medium">
                  {index + 1}
                </p>
                <p className="w-full text-start text-sm font-medium">
                  {item.name}
                </p>
                <p className="w-full text-start text-sm font-medium">
                  {item.code}
                </p>

                <div className="flex min-w-[120px] flex-row gap-2 text-start text-sm font-medium">
                  <ButtonSm
                    className={`${
                      formState === "edit" && isSelected
                        ? "!hover:!bg-blue-600 !active:!bg-blue-700 !bg-blue-500 !text-white"
                        : "bg-white"
                    }`}
                    state="outline"
                    text="Edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(item);
                    }}
                  />
                  <ButtonSm
                    className="bg-red-100 text-red-500 outline-1 outline-red-500 hover:bg-red-100 hover:text-red-500 active:bg-red-100 active:text-red-500"
                    state="default"
                    text="Delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Right Edit/Create Form Section */}
      <section className="table-container max-h-full w-full flex-col gap-3 rounded-[12px] bg-white/80 p-4 shadow-sm md:w-[60%]">
        <AttendanceEdit
          attendanceDetails={attendance}
          formState={formState}
          setFormState={setFormState}
          setAttendanceData={setAttendance}
        />
      </section>
    </main>
  );
};

export default AttendancePage;
