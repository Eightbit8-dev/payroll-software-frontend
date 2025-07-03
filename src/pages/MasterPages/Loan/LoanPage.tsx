import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonSm from "../../../components/common/Buttons";
import LoanEdit from "./EditLoan.component"; // ✅ Correct component import
import PageHeader from "../../../components/masterPage.components/PageHeader";
import DialogBox from "../../../components/common/DialogBox";
import MasterPagesSkeleton from "../../../components/masterPage.components/LoadingSkeleton";
import ErrorComponent from "../../../components/common/Error";
import { AnimatePresence } from "motion/react";
import { appRoutes } from "../../../routes/appRoutes";
import type { FormState } from "../../../types/appTypes";
import type { LoanDetails } from "../../../types/apiTypes";
import { useFetchLoans } from "../../../queries/LoanQuery";
import { DeleteLoanDialogBox } from "../Loan/DeletLoanDialogBox";

const LoanPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate(appRoutes.signInPage);
    }
  }, [navigate]);

  const [isDeleteLoanDialogOpen, setIsDeleteLoanDialogOpen] = useState(false);
  const [loan, setLoan] = useState<LoanDetails | null>(null);
  const [formState, setFormState] = useState<FormState>("create");

  const { data: loans, isLoading, isError } = useFetchLoans();

  const handleLoanDeleted = () => {
    setLoan(null);
    setFormState("create");
  };

  if (isLoading) return <MasterPagesSkeleton />;
  if (isError) return <ErrorComponent />;

  return (
    <main className="flex w-full max-w-full flex-col gap-4 md:flex-row">
      <AnimatePresence>
        {isDeleteLoanDialogOpen && loan && (
          <DialogBox setToggleDialogueBox={setIsDeleteLoanDialogOpen}>
            <DeleteLoanDialogBox
              setIsDeleteLoanDialogOpen={setIsDeleteLoanDialogOpen}
              loan={loan}
              onDeleted={handleLoanDeleted}
            />
          </DialogBox>
        )}
      </AnimatePresence>

      {/* Table Section */}
      <section className="table-container flex w-full flex-col gap-3 rounded-[12px] bg-white/80 p-4 shadow-sm md:w-[50%]">
        <header className="flex flex-row items-center justify-between">
          <PageHeader title="Loan Configuration" />
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
              Max-Eligible Amount
            </p>
            <p className="min-w-[120px] text-start text-sm font-semibold text-zinc-900">
              Action
            </p>
          </header>

          {loans?.length === 0 && (
            <h2 className="text-md my-3 text-center font-medium text-zinc-600">
              No Loans Found
            </h2>
          )}

          {loans?.map((item: LoanDetails, index) => {
            const isSelected = loan?.id === item.id;

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
                onClick={(e) => {
                  e.stopPropagation();
                  if (isSelected && formState === "display") return;
                  setLoan(item);
                  setFormState("display");
                }}
              >
                <p className="w-max min-w-[100px] px-2 py-4 text-start text-sm font-medium">
                  {index + 1}
                </p>
                <p className="w-full text-start text-sm font-medium">{item.name}</p>
                <p className="w-full text-start text-sm font-medium">
                  ₹{item.maxEligibilityAmount}
                </p>

                <div className="flex min-w-[120px] flex-row gap-2 text-start text-sm font-medium">
                  <ButtonSm
                    className={`${
                      formState === "edit" && isSelected
                        ? "!bg-blue-500 !text-white !hover:bg-blue-500 !hover:text-black !active:bg-blue-600"
                        : "bg-white"
                    }`}
                    state="outline"
                    text="Edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLoan(item);
                      setFormState("edit");
                    }}
                  />
                  <ButtonSm
                    className="bg-red-100 text-red-500 outline-1 outline-red-500 hover:bg-red-100 hover:text-red-500 active:bg-red-100 active:text-red-500"
                    state="default"
                    text="Delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLoan(item);
                      setIsDeleteLoanDialogOpen(true);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Edit/Create Section */}
      <section className="table-container max-h-full w-full flex-col gap-3 rounded-[12px] bg-white/80 p-4 shadow-sm md:w-[50%]">
        <LoanEdit
          loanDetails={loan}
          formState={formState}
          setFormState={setFormState}
          setLoanData={setLoan}
        />
      </section>
    </main>
  );
};

export default LoanPage;
