import { useState } from "react";
import { AnimatePresence } from "motion/react";
import ButtonSm from "../../../components/common/Buttons";
import DialogBox from "../../../components/common/DialogBox";
import CreateNewItemBar from "../../../components/masterPage.components/CreateNewItemBar";
import PageTitleAndDescription from "../../../components/masterPage.components/PageHeader";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../../routes/appRoutes";
import type { DepartmentDetails } from "../../../types/appTypes";

import { CreateDepartmentDialogBoxChildren } from "./createDepartmentDialogBox";

const departments: DepartmentDetails[] = [
  {
    departmentId: 1,
    name: "Headquarters",
    remarks: "Corporate operations and executive management",
  },
  {
    departmentId: 2,
    name: "Engineering",
    remarks: "Product development and technical solutions",
  },
  {
    departmentId: 3,
    name: "Design Studio",
    remarks: "UI/UX, product design, and brand experience",
  },
  {
    departmentId: 4,
    name: "QA & Testing",
    remarks: "Ensures product quality through testing",
  },
  {
    departmentId: 5,
    name: "IT Support",
    remarks: "Manages internal infrastructure and tools",
  },
  {
    departmentId: 6,
    name: "DevOps",
    remarks: "Handles CI/CD, cloud, and deployment pipelines",
  },
  {
    departmentId: 7,
    name: "Sales & Marketing",
    remarks: "Drives revenue, outreach, and brand visibility",
  },
  {
    departmentId: 8,
    name: "Customer Success",
    remarks: "Manages client relationships and onboarding",
  },
  {
    departmentId: 9,
    name: "Human Resources",
    remarks: "Recruitment, payroll, and employee welfare",
  },
  {
    departmentId: 10,
    name: "Finance & Legal",
    remarks: "Oversees compliance, budgeting, and contracts",
  },
];

const DepartmentsPage = () => {
  const navigate = useNavigate();
  const [isCreatedepartmentDialogOpen, setIsCreatedepartmentDialogOpen] =
    useState(false);
  return (
    <main className="mx-auto flex w-full max-w-[1390px] flex-col gap-4">
      {/* Dialog box to add new department */}
      <AnimatePresence>
        {isCreatedepartmentDialogOpen && (
          <DialogBox setToggleDialogueBox={setIsCreatedepartmentDialogOpen}>
            <CreateDepartmentDialogBoxChildren
              setIsCreateDepartmentDialogOpen={setIsCreatedepartmentDialogOpen}
            />
          </DialogBox>
        )}
      </AnimatePresence>

      <PageTitleAndDescription
        title="Department Configuration"
        subtitle="Define departments to better organize teams and responsibilities."
      />

      <CreateNewItemBar
        iconSrc="/icons/Configpage/Department.svg"
        title="Create New Department"
        onClick={() => setIsCreatedepartmentDialogOpen(true)}
      />

      <section className="table-container flex w-full flex-col gap-3 rounded-[12px] bg-white/80 p-4 shadow-sm">
        <div className="tables flex w-full flex-col gap-2 overflow-clip rounded-[9px]">
          {/* table header */}
          <header className="header flex w-full flex-row items-center gap-2 bg-slate-100 px-3">
            <p className="w-max min-w-[100px] px-2 py-4 text-start text-sm font-semibold text-zinc-900">
              S.No
            </p>
            <p className="w-full text-start text-sm font-semibold text-zinc-900">
              Name
            </p>

            <p className="w-full text-start text-sm font-semibold text-zinc-900">
              Remarks
            </p>
            <p className="min-w-[160px] text-start text-sm font-semibold text-zinc-900">
              Action
            </p>
          </header>
          {/* table body */}
          {departments.map((item, index) => {
            return (
              <div
                key={index + 1}
                className="cell-1 flex w-full flex-row items-center gap-2 px-3"
              >
                <p className="w-max min-w-[100px] px-2 py-4 text-start text-sm font-medium text-zinc-700">
                  {index + 1}
                </p>
                <p className="w-full text-start text-sm font-medium text-zinc-700">
                  {item.name}
                </p>

                <p className="w-full text-start text-sm font-medium text-zinc-700">
                  {item.remarks}
                </p>

                <div className="min-w-[160px] text-start text-sm font-medium text-zinc-700">
                  <ButtonSm
                    state="outline"
                    text="Manage settings"
                    onClick={() =>
                      navigate(
                        appRoutes.masterRoutes.children.departmentDetails,
                      )
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default DepartmentsPage;
