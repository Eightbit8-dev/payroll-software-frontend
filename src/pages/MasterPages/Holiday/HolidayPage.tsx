import ButtonSm from "../../../components/common/Buttons";
import HolidayEdit from "./Holiday.component";
import PageHeader from "../../../components/masterPage.components/PageHeader";
import { AnimatePresence } from "framer-motion"; // fix: was 'motion/react'
import { useState } from "react";
import MasterPagesSkeleton from "../../../components/masterPage.components/LoadingSkeleton";
import ErrorComponent from "../../../components/common/Error";
import type { FormState } from "../../../types/appTypes";
import type { HolidayDetails } from "../../../types/apiTypes";
import { useFilteredHolidays } from "../../../queries/HolidayQuery"; // use new hook
import DialogBox from "../../../components/common/DialogBox";
import { DeleteHolidayDialogBox } from "./DeleteHoliday";
import DropdownSelect from "../../../components/common/DropDown";
import { monthOptions, yearOptions } from "../../../constants";

const HolidayPage = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [holiday, setHoliday] = useState<HolidayDetails | null>(null);
  const [formState, setFormState] = useState<FormState>("create");
  const [viewMonthYear, setViewMonthYear] = useState({
    year: { id: 0, label: "Select year" },
    month: { id: 0, label: "Select month" },
  });

  //set current month and year as initial date
  // useEffect(() => {
  //   const now = new Date();
  //   const year = now.getFullYear();
  //   const month = now.getMonth() + 1;
  //   const yearOption = yearOptions.find((val)=>{

  //   })

  // }, []);

  const {
    data: holidays,
    isLoading,
    isError,
  } = useFilteredHolidays(viewMonthYear.month.id, viewMonthYear.year.id);

  if (isLoading) return <MasterPagesSkeleton />;
  if (isError) return <ErrorComponent />;

  const handleRowClick = (item: HolidayDetails) => {
    setHoliday(item);
    setFormState("display");
  };

  const handleEdit = (item: HolidayDetails) => {
    setHoliday(item);
    setFormState("edit");
  };

  const handleDelete = (item: HolidayDetails) => {
    setHoliday(item);
    setIsDeleteDialogOpen(true);
  };

  return (
    <main className="flex w-full max-w-full flex-col gap-4 md:flex-row">
      <AnimatePresence>
        {isDeleteDialogOpen && holiday && (
          <DialogBox setToggleDialogueBox={setIsDeleteDialogOpen}>
            <DeleteHolidayDialogBox
              setIsDeleteDialogOpen={setIsDeleteDialogOpen}
              holiday={holiday}
              setHolidayDetails={setHoliday}
            />
          </DialogBox>
        )}
      </AnimatePresence>

      {/* Left Table Section */}
      <section className="table-container flex w-full flex-col gap-3 rounded-[12px] bg-white/80 p-4 shadow-sm md:w-[50%]">
        <header className="flex h-max flex-row items-center justify-between gap-2">
          <PageHeader title="Holiday Configuration" />
          <div className="actions flex origin-right scale-[0.85] flex-row items-center justify-end gap-2">
            <DropdownSelect
              options={monthOptions}
              selected={
                viewMonthYear.month.id === 0
                  ? { id: 0, label: "Select month" }
                  : viewMonthYear.month
              }
              onChange={(opt) =>
                setViewMonthYear({ ...viewMonthYear, month: opt })
              }
              className="w-[120px] sm:w-[140px]" // ✅ Adjust width here
            />

            <DropdownSelect
              options={yearOptions}
              selected={
                viewMonthYear.year.id === 0
                  ? { id: 0, label: "Select year" }
                  : viewMonthYear.year
              }
              onChange={(opt) =>
                setViewMonthYear({ ...viewMonthYear, year: opt })
              }
              className="w-[100px] sm:w-[120px]" // ✅ Adjust width here
            />
          </div>
        </header>

        {!viewMonthYear.month.id || !viewMonthYear.year.id ? (
          <div className="flex items-center justify-center py-10 text-sm text-gray-500">
            Please select both month and year to view holidays.
          </div>
        ) : (
          <div className="tables flex w-full flex-col overflow-clip rounded-[9px]">
            <header className="header flex w-full flex-row items-center gap-2 bg-gray-200 px-3">
              <p className="w-max min-w-[100px] px-2 py-4 text-start text-sm font-semibold text-zinc-900">
                S.No
              </p>
              <p className="w-full text-start text-sm font-semibold text-zinc-900">
                Name
              </p>
              <p className="w-full text-start text-sm font-semibold text-zinc-900">
                Date
              </p>
              <p className="min-w-[120px] text-start text-sm font-semibold text-zinc-900">
                Action
              </p>
            </header>

            {holidays?.length === 0 && (
              <h2 className="text-md my-3 text-center font-medium text-zinc-600">
                No Holidays Found
              </h2>
            )}

            {holidays?.map((item: HolidayDetails, index) => {
              const isSelected = holiday?.id === item.id;
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
                    {item.holidayDate}
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
        )}
      </section>

      <section className="table-container max-h-full w-full flex-col gap-3 rounded-[12px] bg-white/80 p-4 shadow-sm md:w-[60%]">
        <HolidayEdit
          holidayDetails={holiday}
          formState={formState}
          setFormState={setFormState}
          setHolidayData={setHoliday}
        />
      </section>
    </main>
  );
};

export default HolidayPage;
