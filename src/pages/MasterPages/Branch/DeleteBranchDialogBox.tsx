import { useState } from "react";
import { toast } from "react-toastify";
import { ButtonLg } from "../../../components/common/Buttons";
import Input from "../../../components/common/Input";

export const DeleteBranchDialogBox = ({
  setIsDeleteBranchDialogOpen,
}: {
  setIsDeleteBranchDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [branchName, setbranchName] = useState("");

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("Deleted branch " + JSON.stringify(branchName));
        setIsDeleteBranchDialogOpen(false);
      }}
    >
      <section className="header flex w-full flex-row items-center justify-between text-lg font-medium text-red-600">
        Delete Branch
        <img
          onClick={() => setIsDeleteBranchDialogOpen(false)}
          className="w-5 cursor-pointer"
          src="/icons/close-icon.svg"
          alt="close"
        />
      </section>
      <section className="flex w-full flex-col gap-4">
        <p className="text-md font-medium text-zinc-700">
          Please enter the branch name to delete - “Chennai branch ”
        </p>
        <Input
          title="Branch Name *"
          type="str"
          inputValue={branchName}
          name="branch"
          placeholder="The input is case sensitive"
          maxLength={50}
          onChange={(value) => setbranchName(value)}
        />
      </section>

      <section className="mt-1 grid w-full grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
        <ButtonLg
          className="bg-red-100"
          state="outline"
          text="Cancel"
          onClick={() => setIsDeleteBranchDialogOpen(false)}
        />
        <ButtonLg
          className="bg-red-500 hover:bg-red-700 active:bg-red-500"
          state="default"
          type="submit"
          disabled={!branchName}
          text="Create Branch"
        />
      </section>
    </form>
  );
};
