import { useEffect } from "react";
import ButtonSm from "../../../components/common/Buttons";
import { useDeleteDepartment } from "../../../queries/DepartmentQuery";
import type { DepartmentDetails } from "../../../types/apiTypes";
import type { FormState } from "../../../types/appTypes";

export const DeleteDepartmentDialogBox = ({
  setIsDeleteDepartmentDialogOpen,
  setFormState,
  setDepartment,
  department,
}: {
  setIsDeleteDepartmentDialogOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  setDepartment: React.Dispatch<React.SetStateAction<DepartmentDetails | null>>;
  department: DepartmentDetails;
}) => {
  const {
    mutate: deleteDepartment,
    isPending: isDeleteDepartmentLoading,
    isSuccess,
  } = useDeleteDepartment();

  useEffect(() => {
    if (isSuccess) {
      setFormState("create");
      setDepartment({
        name: "",
        code: "",
        remarks: "",
        active: true,
        id: 0,
      });
    }
  }, [isSuccess]);

  const handleDelete = (dept: DepartmentDetails) => {
    deleteDepartment(dept);
  };

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleDelete(department);
        setIsDeleteDepartmentDialogOpen(false);
      }}
    >
      <header className="header flex w-full flex-row items-center justify-between text-lg font-medium text-red-600">
        Delete Department
        <img
          onClick={() => setIsDeleteDepartmentDialogOpen(false)}
          className="w-5 cursor-pointer"
          src="/icons/close-icon.svg"
          alt="close"
        />
      </header>

      <p className="text-md font-medium text-zinc-700">
        Are you sure you want to delete the department{" "}
        <strong>{department.name}</strong>? This action is irreversible.
      </p>

      <section className="mt-1 grid w-full grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
        <ButtonSm
          className="justify-center font-semibold"
          state="outline"
          text="Cancel"
          onClick={() => setIsDeleteDepartmentDialogOpen(false)}
        />
        <ButtonSm
          className="items-center justify-center bg-red-500 text-white hover:bg-red-700 active:bg-red-500"
          state="default"
          text={isDeleteDepartmentLoading ? "Deleting..." : "Delete"}
          onClick={() => {
            handleDelete(department);
            setIsDeleteDepartmentDialogOpen(false);
          }}
        />
      </section>
    </form>
  );
};
