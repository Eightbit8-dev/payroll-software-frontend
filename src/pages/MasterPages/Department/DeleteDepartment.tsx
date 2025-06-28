import { toast } from "react-toastify";
import ButtonSm from "../../../components/common/Buttons";
import type { DepartmentDetails } from "../../../types/apiTypes";
import { useDeleteDepartment } from "../../../queries/DepartmentQuery";

export const DeleteDepartmentDialogBox = ({
  setIsDeleteDepartmentDialogOpen,
  department,
}: {
  setIsDeleteDepartmentDialogOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  department: DepartmentDetails;
}) => {
  const { mutate: DeleteDepartment, isPending: isDeleteDepartmentLoading } =
    useDeleteDepartment();

  const handleDelete = (department: DepartmentDetails) => {
    DeleteDepartment(department);
  };
  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("Deleted branch " + JSON.stringify(":"));
        setIsDeleteDepartmentDialogOpen(false);
      }}
    >
      <header className="header flex w-full flex-row items-center justify-between text-lg font-medium text-red-600">
        Delete Branch
        <img
          onClick={() => setIsDeleteDepartmentDialogOpen(false)}
          className="w-5 cursor-pointer"
          src="/icons/close-icon.svg"
          alt="close"
        />
      </header>

      <p className="text-md font-medium text-zinc-700">
        Are you sure want to delete the department {department.name} ? This
        action is irreversable
      </p>

      <section className="mt-1 grid w-full grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
        <ButtonSm
          className="justify-center font-semibold"
          state="outline"
          text="Cancel"
          onClick={() => setIsDeleteDepartmentDialogOpen(false)}
        />
        <ButtonSm
          className="items-center justify-center bg-red-500 text-center text-white hover:bg-red-700 active:bg-red-500"
          state="default"
          onClick={() => {
            handleDelete(department);
            setIsDeleteDepartmentDialogOpen(false);
          }}
          text={isDeleteDepartmentLoading ? "Deleting..." : "Delete"}
        />
      </section>
    </form>
  );
};
