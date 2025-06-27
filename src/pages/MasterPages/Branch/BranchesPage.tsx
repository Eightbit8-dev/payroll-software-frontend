import ButtonSm from "../../../components/common/Buttons";
import { useNavigate } from "react-router-dom";
import type { BranchDetails } from "../../../types/commonTypes";
import BranchPage from "./BranchPage";
import PageHeader from "../../../components/masterPage.components/PageHeader";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import DialogBox from "../../../components/common/DialogBox";
import { DeleteBranchDialogBox } from "./DeleteBranchDialogBox";

const branches: BranchDetails[] = [
  {
    branchId: 1,
    name: "Chennai HQ",
    address1: "No. 12, Mount Road, Chennai, Tamil Nadu",
    address2: "Near Anna Salai",
    remarks: "Main office",
  },
  {
    branchId: 2,
    name: "Bangalore Tech Park",
    address1: "Plot 45, Electronic City, Bangalore, Karnataka",
    address2: " Phase 1, Sector 3",
    remarks: "Development center",
  },
  {
    branchId: 3,
    name: "Hyderabad Support Hub",
    address1: "Kukatpally, Hyderabad, Telangana",
    address2: "Near Kukatpally Metro Station",
    remarks: "Customer support",
  },
  {
    branchId: 4,
    name: "Mumbai Sales Office",
    address1: "Andheri East, Mumbai, Maharashtra",
    address2: "Near Western Express Highway",
    remarks: "Handles West India sales",
  },
];

const BranchesPage = () => {
  const navigate = useNavigate();
  const [isDeleteBranchDialogOpen, setIsDeleteBranchDialogOpen] =
    useState(false);

  return (
    <main className="flex w-full max-w-full flex-col gap-4 md:flex-row">
      <AnimatePresence>
        {isDeleteBranchDialogOpen && (
          <DialogBox setToggleDialogueBox={setIsDeleteBranchDialogOpen}>
            <DeleteBranchDialogBox
              setIsDeleteBranchDialogOpen={setIsDeleteBranchDialogOpen}
            />
          </DialogBox>
        )}
      </AnimatePresence>
      <section className="table-container flex w-full flex-col gap-3 rounded-[12px] bg-white/80 p-4 shadow-sm md:w-[50%]">
        <PageHeader title="Branch configuration" />
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
              Address
            </p>

            <p className="min-w-[120px] text-start text-sm font-semibold text-zinc-900">
              Action
            </p>
          </header>
          {/* table body */}
          {branches.map((item, index) => {
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
                  {item.address1}
                </p>

                <div className="flex min-w-[120px] flex-row gap-2 text-start text-sm font-medium">
                  <ButtonSm
                    state="outline"
                    text="Edit"
                    onClick={() => alert("inum panla ")}
                  />
                  <ButtonSm
                    className="bg-red-100 text-red-500 outline-1 outline-red-500 hover:bg-red-100 hover:text-red-500 active:bg-red-100 active:text-red-500"
                    state="default"
                    text="Delete"
                    onClick={() => setIsDeleteBranchDialogOpen(true)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="table-container max-h-full w-full flex-col gap-3 rounded-[12px] bg-white/80 p-4 shadow-sm md:w-[50%]">
        <BranchPage />
      </section>
    </main>
  );
};

export default BranchesPage;
