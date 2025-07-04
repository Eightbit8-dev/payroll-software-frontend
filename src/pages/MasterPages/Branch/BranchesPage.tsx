import ButtonSm from "../../../components/common/Buttons";
import { useNavigate } from "react-router-dom";
import BranchEdit from "./EditBranch.component"; // Ensure correct import name
import PageHeader from "../../../components/masterPage.components/PageHeader";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import DialogBox from "../../../components/common/DialogBox";
import { DeleteBranchDialogBox } from "./DeleteBranchDialogBox";
import { useFetchBranches } from "../../../queries/BranchQuery";
import MasterPagesSkeleton from "../../../components/masterPage.components/LoadingSkeleton";
import ErrorComponent from "../../../components/common/Error";
import { appRoutes } from "../../../routes/appRoutes";
import type { FormState } from "../../../types/appTypes";
import type { BranchDetails } from "../../../types/apiTypes";

const BranchesPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate(appRoutes.signInPage);
    }
  }, [navigate]);

  const [isDeleteBranchDialogOpen, setIsDeleteBranchDialogOpen] =
    useState(false);

  const [branch, setBranch] = useState<BranchDetails | null>(null); // ✅ FIXED here

  const [formState, setFormState] = useState<FormState>("create");

  const { data: branches, isLoading, isError } = useFetchBranches();

  const handleBranchDeleted = () => {
    setBranch(null); // ✅ reset
    setFormState("create");
  };

  if (isLoading) return <MasterPagesSkeleton />;
  if (isError) return <ErrorComponent />;

  return (
    <main className="flex w-full max-w-full flex-col gap-4 md:flex-row">
      <AnimatePresence>
        {isDeleteBranchDialogOpen && (
          <DialogBox setToggleDialogueBox={setIsDeleteBranchDialogOpen}>
            <DeleteBranchDialogBox
              setBranch={setBranch}
              setFormState={setFormState}
              setIsDeleteBranchDialogOpen={setIsDeleteBranchDialogOpen}
              branch={branch!}
              onDeleted={handleBranchDeleted}
            />
          </DialogBox>
        )}
      </AnimatePresence>

      <section className="table-container flex w-full flex-col bg-white/80 gap-3 rounded-[12px] p-4 shadow-sm md:w-[50%]">
        <header className="flex flex-row items-center justify-between">
          <PageHeader title="Branch configuration" />
        </header>

        <div className="tables flex w-full flex-col overflow-clip rounded-[9px]">
          <header className="header flex w-full flex-row items-center gap-2 bg-gray-200 px-3">
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

          {branches?.length === 0 && (
            <h2 className="text-md my-3 text-center font-medium text-zinc-600">
              No Branches Found
            </h2>
          )}

          {branches?.map((item: BranchDetails, index) => (
            <div
              key={item.id}
              className={`cell-1 flex w-full cursor-pointer flex-row items-center gap-2 px-3 py-2 text-zinc-700 ${
                branch?.id === item.id
                  ? "bg-gray-100 text-white"
                  : index % 2 === 0
                    ? "bg-white"
                    : "bg-slate-50"
              } hover:bg-slate-100 active:bg-slate-200`}
              onClick={(e) => {
                e.stopPropagation();
                if (branch?.id === item.id) return;
                setFormState("display");
                setBranch(item);
              }}
            >
              <p className="w-max min-w-[100px] px-2 py-4 text-start text-sm font-medium">
                {index + 1}
              </p>
              <p className="w-full text-start text-sm font-medium">
                {item.name || ""}
              </p>
              <p className="w-full text-start text-sm font-medium">
                {item.addressLine1 || ""}
              </p>

              <div className="flex min-w-[120px] flex-row gap-2 text-start text-sm font-medium">
                <ButtonSm
                  className={`${
                    formState === "edit" && branch?.id === item.id
                      ? "!hover:bg-blue-100 !hover:!text-black !active:bg-blue-600 !bg-blue-500 !text-white"
                      : "bg-white"
                  }`}
                  state="outline"
                  text="Edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFormState("edit");
                    setBranch(item);
                  }}
                />
                <ButtonSm
                  className="bg-red-100 text-red-500 outline-1 outline-red-500 hover:bg-red-100 hover:text-red-500 active:bg-red-100 active:text-red-500"
                  state="default"
                  text="Delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    setBranch(item);
                    setIsDeleteBranchDialogOpen(true);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="table-container max-h-full w-full flex-col gap-3 rounded-[12px] bg-white/80 p-4 shadow-sm md:w-[50%]">
        <BranchEdit
          branchDetails={branch}
          formState={formState}
          setFormState={setFormState}
          setBranchData={setBranch} // ✅ No error now
        />
      </section>
    </main>
  );
};

export default BranchesPage;
