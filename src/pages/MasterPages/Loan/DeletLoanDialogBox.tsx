import ButtonSm from "../../../components/common/Buttons";
import { useDeleteLoan } from "../../../queries/LoanQuery";
import type { LoanDetails } from "../../../types/apiTypes";

export const DeleteLoanDialogBox = ({
  setIsDeleteLoanDialogOpen,
  loan,
  onDeleted,
}: {
  setIsDeleteLoanDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loan: LoanDetails;
  onDeleted?: () => void;
}) => {
  const { mutate: deleteLoan, isPending: isDeleteLoanLoading } = useDeleteLoan();

  const handleDelete = () => {
    deleteLoan(loan, {
      onSuccess: () => {
        setIsDeleteLoanDialogOpen(false);
        if (onDeleted) {
          onDeleted();
        }
      },
    });
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <header className="header flex w-full flex-row items-center justify-between text-lg font-medium text-red-600">
        Delete Loan
        <img
          onClick={() => setIsDeleteLoanDialogOpen(false)}
          className="w-5 cursor-pointer"
          src="/icons/close-icon.svg"
          alt="close"
        />
      </header>

      <p className="text-md font-medium text-zinc-700">
        Are you sure you want to delete the loan <strong>{loan.name}</strong>? This action is irreversible.
      </p>

      <section className="mt-1 grid w-full grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
        <ButtonSm
          className="justify-center font-semibold"
          state="outline"
          text="Cancel"
          onClick={() => setIsDeleteLoanDialogOpen(false)}
        />
        <ButtonSm
          className="items-center justify-center bg-red-500 text-center text-white hover:bg-red-700 active:bg-red-500"
          state="default"
          onClick={handleDelete}
          text={isDeleteLoanLoading ? "Deleting..." : "Delete"}
        />
      </section>
    </div>
  );
};
