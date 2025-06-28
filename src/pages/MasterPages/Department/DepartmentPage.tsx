import ButtonSm from "../../../components/common/Buttons";
import PageHeader from "../../../components/masterPage.components/PageHeader";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import DialogBox from "../../../components/common/DialogBox";
import { DeleteDepartmentDialogBox } from "./DeleteDepartment";
import MasterPagesSkeleton from "../../../components/masterPage.components/LoadingSkeleton";
import ErrorComponent from "../../../components/common/Error";
import type { FormState } from "../../../types/appTypes";
import type { DepartmentDetails } from "../../../types/apiTypes";
import { useFetchDepartments } from "../../../queries/DepartmentQuery";
import DepartmentEdit from "./Department.component";

const DepartmentsPage = () => {
  const [isDeleteDepartmentDialogOpen, setIsDeleteDepartmentDialogOpen] =
    useState(false); //Mangae the state of the dialog box
  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentDetails | null>({} as DepartmentDetails); //Store the selected department details null if user wants to create one
  const [formState, setFormState] = useState<FormState>("create"); //Manage the state  ["display", "create", "edit"]

  const {
    data: departments,
    isLoading: isDepartmentsLoading,
    isError: isDepartmentsError,
  } = useFetchDepartments(); //Tanstack method

  if (isDepartmentsLoading) return <MasterPagesSkeleton />;
  if (isDepartmentsError) return <ErrorComponent />;

  return (
    <main className="flex w-full max-w-full flex-col gap-4 md:flex-row">
      <AnimatePresence>
        {isDeleteDepartmentDialogOpen && (
          <DialogBox setToggleDialogueBox={setIsDeleteDepartmentDialogOpen}>
            <DeleteDepartmentDialogBox
              setIsDeleteDepartmentDialogOpen={setIsDeleteDepartmentDialogOpen}
              department={selectedDepartment!}
              setDepartment={setSelectedDepartment}
              setFormState={setFormState}
            />
          </DialogBox>
        )}
      </AnimatePresence>
      <section className="table-container flex w-full flex-col gap-3 rounded-[12px] bg-white/80 p-4 shadow-sm md:w-[40%]">
        <header className="flex h-max flex-row items-center justify-between">
          <PageHeader title="Department configuration" />
        </header>
        <div className="tables flex w-full flex-col overflow-clip rounded-[9px]">
          {/* table header */}
          <header className="header flex w-full flex-row items-center gap-2 bg-gray-200 px-3">
            <p className="w-max min-w-[100px] px-2 py-4 text-start text-sm font-semibold text-zinc-900">
              S.No
            </p>
            <p className="w-full text-start text-sm font-semibold text-zinc-900">
              Name
            </p>

            <p className="min-w-[120px] text-start text-sm font-semibold text-zinc-900">
              Action
            </p>
          </header>
          {/* table body with data if no data show no data found*/}
          {departments?.length === 0 && (
            <h2 className="text-md my-3 text-center font-medium text-zinc-600">
              No Departments Found
            </h2>
          )}
          {departments?.map((item: DepartmentDetails, index) => {
            return (
              <div
                key={index + 1}
                className={`cell-1 flex w-full cursor-pointer flex-row items-center gap-2 px-3 py-2 text-zinc-700 ${selectedDepartment?.id === item.id ? "bg-gray-100 text-white" : index % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-slate-100 active:bg-slate-200`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (selectedDepartment?.id === item.id) return;
                  setFormState("display");
                  setSelectedDepartment({
                    id: item.id,
                    remarks: item.remarks,
                    active: true,
                    name: item.name,
                    code: item.code,
                  });
                }}
              >
                <p className="w-max min-w-[100px] px-2 py-4 text-start text-sm font-medium">
                  {index + 1}
                </p>
                <p className="w-full text-start text-sm font-medium">
                  {item.name}
                </p>

                <div className="flex min-w-[120px] flex-row gap-2 text-start text-sm font-medium">
                  <ButtonSm
                    className={`${formState === "edit" && selectedDepartment?.id === item.id ? "bg-blue-500 text-white hover:bg-blue-500 hover:text-black active:bg-blue-600" : "bg-white"}`}
                    state="outline"
                    text="Edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFormState("edit");
                      setSelectedDepartment({
                        id: item.id,
                        remarks: item.remarks,
                        active: true,
                        name: item.name,
                        code: item.code,
                      });
                    }}
                  />
                  <ButtonSm
                    className="bg-red-100 text-red-500 outline-1 outline-red-500 hover:bg-red-100 hover:text-red-500 active:bg-red-100 active:text-red-500"
                    state="default"
                    text="Delete"
                    onClick={() => {
                      setSelectedDepartment(item);
                      setIsDeleteDepartmentDialogOpen(true);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="table-container max-h-full w-full flex-col gap-3 rounded-[12px] bg-white/80 p-4 shadow-sm md:w-[60%]">
        <DepartmentEdit
          departmentDetails={selectedDepartment}
          formState={formState}
          setFormState={setFormState}
        />
      </section>
    </main>
  );
};

export default DepartmentsPage;
