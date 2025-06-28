import { useState } from "react";
import { toast } from "react-toastify";
import { ButtonLg } from "../../../components/common/Buttons";
import Input from "../../../components/common/Input";
import Textarea from "../../../components/common/TextArea";
import type { DepartmentDetails } from "../../../types/appTypes";

export const CreateDepartmentDialogBoxChildren = ({
  setIsCreateDepartmentDialogOpen,
}: {
  setIsCreateDepartmentDialogOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}) => {
  const [newDepartmentName, setNewDepartmentName] = useState<DepartmentDetails>(
    {} as DepartmentDetails,
  );

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success(
          "post request to create Department" +
            JSON.stringify(newDepartmentName),
        );
        setIsCreateDepartmentDialogOpen(false);
      }}
    >
      <section className="header flex w-full flex-row items-center justify-between text-lg font-medium text-zinc-800">
        Create New Department
        <img
          onClick={() => setIsCreateDepartmentDialogOpen(false)}
          className="w-5 cursor-pointer"
          src="/icons/close-icon.svg"
          alt="close"
        />
      </section>
      <section className="flex w-full flex-col gap-4">
        <Input
          title="Department Name *"
          type="str"
          inputValue={newDepartmentName.name}
          name="Department"
          placeholder="Enter Department name"
          maxLength={50}
          onChange={(value) =>
            setNewDepartmentName({ ...newDepartmentName, name: value })
          }
        />

        <Textarea
          title="Remarks *"
          inputValue={newDepartmentName.remarks}
          name="remarks"
          placeholder="Enter remarks"
          maxLength={100}
          onChange={(value) =>
            setNewDepartmentName({ ...newDepartmentName, remarks: value })
          }
        />
      </section>

      <section className="mt-1 grid w-full grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
        <ButtonLg
          state="outline"
          text="Cancel"
          onClick={() => setIsCreateDepartmentDialogOpen(false)}
        />
        <ButtonLg
          state="default"
          type="submit"
          disabled={!newDepartmentName.name || !newDepartmentName.remarks}
          text="Create Department"
        />
      </section>
    </form>
  );
};
