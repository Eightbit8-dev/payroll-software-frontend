import { useState } from "react";
import { AnimatePresence } from "motion/react";
import ButtonSm from "../../../components/common/Buttons";
import DialogBox from "../../../components/common/DialogBox";
import CreateNewItemBar from "../../../components/masterPage.components/CreateNewItemBar";
import PageTitleAndDescription from "../../../components/masterPage.components/PageTitleAndDescription";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../../routes/appRoutes";
import { CreateBranchDialogBoxChildren } from "./createBranchDialogBox";
import type { BranchDetails } from "../../../types/commonTypes";

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

const BranchPage = () => {
  const navigate = useNavigate();
  const [isCreateBranchDialogOpen, setIsCreateBranchDialogOpen] =
    useState(false);
  return (
    <main className="mx-auto flex w-full max-w-[1390px] flex-col gap-4">
      {/* Dialog box to add new branch */}
      <AnimatePresence>
        {isCreateBranchDialogOpen && (
          <DialogBox setToggleDialogueBox={setIsCreateBranchDialogOpen}>
            <CreateBranchDialogBoxChildren
              setIsCreateBranchDialogOpen={setIsCreateBranchDialogOpen}
            />
          </DialogBox>
        )}
      </AnimatePresence>

      <PageTitleAndDescription
        title="Branch Configuration"
        subtitle="Manage different office branches to streamline your organizational structure."
      />

      <CreateNewItemBar
        iconSrc="/icons/Configpage/Branch.svg"
        title="Create New Branch"
        onClick={() => setIsCreateBranchDialogOpen(true)}
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
              Address
            </p>
            <p className="w-full text-start text-sm font-semibold text-zinc-900">
              Remarks
            </p>
            <p className="min-w-[160px] text-start text-sm font-semibold text-zinc-900">
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
                <p className="w-full text-start text-sm font-medium text-zinc-700">
                  {item.remarks}
                </p>

                <div className="min-w-[160px] text-start text-sm font-medium text-zinc-700">
                  <ButtonSm
                    state="outline"
                    text="Manage settings"
                    onClick={() =>
                      navigate(appRoutes.masterRoutes.children.branchesEdit)
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

export default BranchPage;
