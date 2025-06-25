import { useState } from "react";
import { toast } from "react-toastify";
import { ButtonLg } from "../../../components/common/Buttons";
import Input from "../../../components/common/Input";
import type { BranchDetails } from "../../../types/commonTypes";
import Textarea from "../../../components/common/Textarea";

export const CreateBranchDialogBoxChildren = ({
  setIsCreateBranchDialogOpen,
}: {
  setIsCreateBranchDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [newBranchName, setNewBranchName] = useState<BranchDetails>(
    {} as BranchDetails,
  );

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success(
          "post request to create branch" + JSON.stringify(newBranchName),
        );
        setIsCreateBranchDialogOpen(false);
      }}
    >
      <section className="header flex w-full flex-row items-center justify-between text-lg font-medium text-zinc-800">
        Create New Branch
        <img
          onClick={() => setIsCreateBranchDialogOpen(false)}
          className="w-5 cursor-pointer"
          src="/icons/close-icon.svg"
          alt="close"
        />
      </section>
      <section className="flex w-full flex-col gap-4">
        <Input
          title="Branch Name *"
          type="str"
          inputValue={newBranchName.name}
          name="branch"
          placeholder="Enter branch name"
          maxLength={50}
          onChange={(value) =>
            setNewBranchName({ ...newBranchName, name: value })
          }
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
          <Input
            title="Address Line 1 *"
            type="str"
            inputValue={newBranchName.address1}
            name="address1"
            placeholder="Enter address line 1"
            maxLength={100}
            onChange={(value) =>
              setNewBranchName({ ...newBranchName, address1: value })
            }
          />
          <Input
            title="Address Line 2"
            type="str"
            inputValue={newBranchName.address2}
            name="address2"
            placeholder="Enter address line 2"
            maxLength={100}
            onChange={(value) =>
              setNewBranchName({ ...newBranchName, address2: value })
            }
          />
        </div>

        <Textarea
          title="Remarks *"
          inputValue={newBranchName.remarks}
          name="remarks"
          placeholder="Enter remarks"
          maxLength={100}
          onChange={(value) =>
            setNewBranchName({ ...newBranchName, remarks: value })
          }
        />
      </section>

      <section className="mt-1 grid w-full grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
        <ButtonLg
          state="outline"
          text="Cancel"
          onClick={() => setIsCreateBranchDialogOpen(false)}
        />
        <ButtonLg
          state="default"
          type="submit"
          disabled={
            !newBranchName.name ||
            !newBranchName.address1 ||
            !newBranchName.remarks
          }
          text="Create Branch"
        />
      </section>
    </form>
  );
};
