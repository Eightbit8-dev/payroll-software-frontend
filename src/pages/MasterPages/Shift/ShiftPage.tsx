import ButtonSm from "../../../components/common/Buttons";
import PageHeader from "../../../components/masterPage.components/PageHeader";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import DialogBox from "../../../components/common/DialogBox";
import MasterPagesSkeleton from "../../../components/masterPage.components/LoadingSkeleton";
import ErrorComponent from "../../../components/common/Error";
import type { FormState } from "../../../types/appTypes";
import type { ShiftDetails } from "../../../types/apiTypes";
import { useFetchShifts } from "../../../queries/ShiftQuery";
import { DeleteShiftDialogBox } from "./ShiftDeletePopUp";
import ShiftEdit from "./Shift.component";

const ShiftPage = () => {
  const [isDeleteShiftDialogOpen, setIsDeleteShiftDialogOpen] = useState(false);
  const [shift, setShift] = useState<ShiftDetails | null>(null);
  const [formState, setFormState] = useState<FormState>("create");

  const { data: shifts, isLoading, isError } = useFetchShifts();

  if (isLoading) return <MasterPagesSkeleton />;
  if (isError) return <ErrorComponent />;

  const handleRowClick = (item: ShiftDetails) => {
    setShift({
      id: item.id,
      name: item.name,
      type: item.type,
      present: item.present,
      lop: item.lop,
      earlyGoing: item.earlyGoing,
      lateComing: item.lateComing,
      isNight: item.isNight,
      shiftIn: item.shiftIn,
      shiftOut: item.shiftOut,
      lunchOut: item.lunchOut,
      lunchIn: item.lunchIn,
    });
    setFormState("display");
  };

  const handleEdit = (item: ShiftDetails) => {
    setShift({
      id: item.id,
      name: item.name,
      type: item.type,
      present: item.present,
      lop: item.lop,
      earlyGoing: item.earlyGoing,
      lateComing: item.lateComing,
      isNight: item.isNight,
      shiftIn: item.shiftIn,
      shiftOut: item.shiftOut,
      lunchOut: item.lunchOut,
      lunchIn: item.lunchIn,
    });
    setFormState("edit");
  };

  const handleDelete = (item: ShiftDetails) => {
    setShift(item);
    setIsDeleteShiftDialogOpen(true);
  };

  return (
    <main className="flex w-full max-w-full flex-col gap-4 md:flex-row">
      <AnimatePresence>
        {isDeleteShiftDialogOpen && shift && (
          <DialogBox setToggleDialogueBox={setIsDeleteShiftDialogOpen}>
            <DeleteShiftDialogBox
              setIsDeleteShiftDialogOpen={setIsDeleteShiftDialogOpen}
              Shift={shift}
              setShiftData={setShift}
            />
          </DialogBox>
        )}
      </AnimatePresence>

      {/* Left Table Section */}
      <section className="table-container flex w-full flex-col gap-3 rounded-[12px] bg-white/80 p-4 shadow-sm md:w-[50%]">
        <header className="flex h-max flex-row items-center justify-between">
          <PageHeader title="Shift Details Configuration" />
        </header>

        <div className="tables flex w-full flex-col overflow-clip rounded-[9px]">
          {/* Table Header */}
          <header className="header flex w-full flex-row items-center gap-2 bg-gray-200 px-3">
            <p className="w-max min-w-[50px] px-2 py-4 text-start text-sm font-semibold text-zinc-900">
              S.No
            </p>
            <p className="w-full text-start text-sm font-semibold text-zinc-900">
              Name
            </p>
            <p className="w-full text-start text-sm font-semibold text-zinc-900">
              Type
            </p>

            <p className="min-w-[120px] text-start text-sm font-semibold text-zinc-900">
              Action
            </p>
          </header>

          {/* No Data */}
          {shifts?.length === 0 && (
            <h2 className="text-md my-3 text-center font-medium text-zinc-600">
              No Shift Details Found
            </h2>
          )}

          {/* Table Rows */}
          {shifts?.map((item: ShiftDetails, index) => {
            const isSelected = shift?.id === item.id;
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
                <p className="w-max min-w-[50px] px-2 py-4 text-start text-sm font-medium">
                  {index + 1}
                </p>
                <p className="w-full text-start text-sm font-medium">
                  {item.name}
                </p>
                <p className="w-full text-start text-sm font-medium">
                  {item.type}
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
      <section className="table-container max-h-full w-full flex-col gap-3 rounded-[12px] bg-white/80 p-4 shadow-sm md:w-[50%]">
        <ShiftEdit
          Shift={shift}
          formState={formState}
          setFormState={setFormState}
          setShiftData={setShift}
        />
      </section>
    </main>
  );
};

export default ShiftPage;
