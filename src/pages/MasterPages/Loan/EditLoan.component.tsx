import { useEffect, useState } from "react";
import Input from "../../../components/common/Input";
import ButtonSm from "../../../components/common/Buttons";
import type { FormState } from "../../../types/appTypes";
import type { LoanDetails } from "../../../types/apiTypes";
import { useCreateLoan, useEditLoan } from "../../../queries/LoanQuery";
import TextArea from "../../../components/common/Textarea";

const emptyLoan: LoanDetails = {
  id: 0,
  name: "",
  employeeWorkedMonths: 0,
  maxEligibilityAmount: 0,
  loanRepaymentPeriod: 0,
  remarks: "",
};

const LoanEdit = ({
  loanDetails,
  formState,
  setFormState,
  setLoanData,
}: {
  loanDetails: LoanDetails | null;
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  setLoanData: React.Dispatch<React.SetStateAction<LoanDetails | null>>;
}) => {
  const [newLoanData, setNewLoanData] = useState<LoanDetails>(emptyLoan);

  const { mutate: createLoan, isPending, isSuccess } = useCreateLoan();
  const {
    mutate: editLoan,
    isPending: isUpdatePending,
    isSuccess: isUpdatingSuccess,
  } = useEditLoan();

  useEffect(() => {
    if (formState === "create") {
      setNewLoanData(emptyLoan);
    } else if (loanDetails) {
      setNewLoanData(loanDetails); // Ensures ID is preserved
    }
  }, [formState, loanDetails]);

  useEffect(() => {
    if (isSuccess || isUpdatingSuccess) {
      setFormState("create");
      setLoanData(null);
      setNewLoanData(emptyLoan);
    }
  }, [isSuccess, isUpdatingSuccess, setFormState, setLoanData]);

  const handleCancel = () => {
    setFormState("create");
    setLoanData(null);
    setNewLoanData(emptyLoan);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !newLoanData.name ||
      !newLoanData.employeeWorkedMonths ||
      !newLoanData.maxEligibilityAmount ||
      !newLoanData.loanRepaymentPeriod
    ) {
      console.log("Missing required fields");
      return;
    }

    console.log("Form submitted with state:", formState);
    console.log("Loan data:", newLoanData);

    if (formState === "create") {
      createLoan(newLoanData);
    } else if (formState === "edit") {
      editLoan(newLoanData);
    }
  };

  const hasData =
    newLoanData?.name ||
    newLoanData?.employeeWorkedMonths ||
    newLoanData?.maxEligibilityAmount ||
    newLoanData?.loanRepaymentPeriod ||
    newLoanData?.remarks;

  if (!newLoanData) {
    return (
      <p className="text-center text-sm text-gray-500">
        Select a loan to view details.
      </p>
    );
  }

  return (
    <main className="flex max-h-full w-full max-w-[870px] flex-col gap-2">
      <div className="loan-config-container flex flex-col gap-3 rounded-[20px] bg-white/80">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <header className="header flex w-full flex-row items-center justify-between">
            <h1 className="text-start text-lg font-semibold text-zinc-800">
              {formState === "create"
                ? "Loan Configuration"
                : `${loanDetails?.name || "Loan"} Configuration`}
            </h1>
            <section className="ml-auto flex flex-row items-center gap-3">
              {(formState === "edit" ||
                (formState === "create" && hasData)) && (
                <ButtonSm
                  className="font-medium"
                  text="Cancel"
                  state="outline"
                  type="button"
                  onClick={handleCancel}
                />
              )}
              {formState === "display" && newLoanData.id !== 0 && (
                <ButtonSm
                  className="font-medium"
                  text="Back"
                  state="outline"
                  type="button"
                  onClick={handleCancel}
                />
              )}
              {formState === "create" && (
                <ButtonSm
                  className="font-medium text-white"
                  text={isPending ? "Creating..." : "Create"}
                  state="default"
                  type="submit"
                  disabled={isPending}
                />
              )}
              {formState === "edit" && (
                <ButtonSm
                  className="font-medium text-white"
                  text={isUpdatePending ? "Updating..." : "Save Changes"}
                  state="default"
                  type="submit"
                  disabled={isUpdatePending}
                />
              )}
            </section>
          </header>

          <section className="loan-details-section flex w-full flex-col gap-2 overflow-clip px-3">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
              <Input
                required
                disabled={formState === "display"}
                title="Loan Name *"
                type="str"
                inputValue={newLoanData.name}
                name="loan"
                placeholder="Enter loan name"
                maxLength={50}
                onChange={(value) =>
                  setNewLoanData({ ...newLoanData, name: value })
                }
              />
              <Input
                required
                disabled={formState === "display"}
                title="Employee Work *"
                prefixText="Months"
                type="num"
                inputValue={newLoanData.employeeWorkedMonths || ""}
                name="months"
                placeholder="Enter months"
                onChange={(value) =>
                  setNewLoanData({
                    ...newLoanData,
                    employeeWorkedMonths: +value || 0,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
              <Input
                required
                disabled={formState === "display"}
                title="Max Eligible Amount *"
                prefixText="₹"
                type="num"
                inputValue={newLoanData.maxEligibilityAmount || ""}
                name="amount"
                placeholder="Enter amount"
                onChange={(value) =>
                  setNewLoanData({
                    ...newLoanData,
                    maxEligibilityAmount: +value || 0,
                  })
                }
              />
              <Input
                required
                disabled={formState === "display"}
                title="Loan Repayment Period *"
                type="num"
                prefixText="Months"
                inputValue={newLoanData.loanRepaymentPeriod || ""}
                name="repayment"
                placeholder="Enter repayment months"
                onChange={(value) =>
                  setNewLoanData({
                    ...newLoanData,
                    loanRepaymentPeriod: +value || 0,
                  })
                }
              />
            </div>

            <TextArea
              disabled={formState === "display"}
              title="Remarks"
              inputValue={newLoanData.remarks}
              name="remarks"
              placeholder="Enter remarks"
              maxLength={200}
              onChange={(value) =>
                setNewLoanData({ ...newLoanData, remarks: value })
              }
            />
          </section>
        </form>
      </div>
    </main>
  );
};

export default LoanEdit;
