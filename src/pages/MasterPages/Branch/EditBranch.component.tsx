import { useEffect, useState } from "react";
import Input from "../../../components/common/Input";
import ButtonSm from "../../../components/common/Buttons";
import type { FormState } from "../../../types/appTypes";
import { useCreateBranch, useEditBranch } from "../../../queries/BranchQuery";
import type { BranchDetails } from "../../../types/apiTypes";
import { usersData } from "../../../utils/userData";
import UserAccessDetails from "../Users.component";

const BranchEdit = ({
  branchDetails,
  formState,
  setFormState,
  setBranchData,
}: {
  branchDetails: BranchDetails | null;
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  setBranchData: React.Dispatch<React.SetStateAction<BranchDetails | null>>;
}) => {
  const [users, setUsers] = useState(usersData);
  const [branchData, setBranchDataLocal] = useState<BranchDetails | null>(null);
  const [newbranchData, setNewBranchData] = useState<BranchDetails | null>(
    null,
  );
  const [title, setTitle] = useState("");

  const { mutate: createBranch, isPending, isSuccess } = useCreateBranch();
  const {
    mutate: updateBranch,
    isPending: isUpdatePending,
    isSuccess: isUpdatingSuccess,
  } = useEditBranch();

  const emptyBranch: BranchDetails = {
    id: 0,
    name: "",
    code: "",
    addressLine1: "",
    addressLine2: "",
    remarks: "",
  };

  useEffect(() => {
    if (formState === "create") {
      setBranchDataLocal(emptyBranch);
      setNewBranchData(emptyBranch);
      setTitle("");
    } else if (branchDetails) {
      setBranchDataLocal(branchDetails);
      setNewBranchData(branchDetails);
      setTitle(branchDetails.name); // Lock title
    }
  }, [branchDetails, formState]);

  useEffect(() => {
    if (isSuccess) {
      setBranchDataLocal(emptyBranch);
      setNewBranchData(emptyBranch);
      setFormState("create");
      setTitle("");
    } else if (isUpdatingSuccess && newbranchData) {
      setBranchDataLocal(newbranchData);
      setBranchData(newbranchData);
      setFormState("create");
      setTitle(newbranchData.name);
    }
  }, [isSuccess, isUpdatingSuccess]);

  const handleCancel = () => {
    setBranchDataLocal(emptyBranch);
    setNewBranchData(emptyBranch);
    setFormState("create");
    setTitle("");
  };

  const hasData =
    newbranchData?.name ||
    newbranchData?.addressLine1 ||
    newbranchData?.addressLine2;

  if (!branchData || !newbranchData) {
    return (
      <p className="text-center text-sm text-gray-500">
        Select a branch to view details.
      </p>
    );
  }

  return (
    <main className="flex max-h-full w-full max-w-[870px] flex-col gap-2">
      <div className="branch-config-container flex flex-col gap-3 rounded-[20px]">
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (formState === "create") {
              createBranch(newbranchData);
            }
          }}
        >
          <header className="header flex w-full flex-row items-center justify-between">
            <h1 className="text-start text-lg font-semibold text-zinc-800">
              {formState === "create"
                ? "Branch Configuration"
                : `${title || "Branch"} Configuration`}
            </h1>
            <section className="ml-auto flex flex-row items-center gap-3">
              {(formState === "edit" ||
                (formState === "create" && hasData)) && (
                <ButtonSm
                  className="font-medium"
                  text="Cancel"
                  state="outline"
                  onClick={handleCancel}
                  type="button"
                />
              )}
              {formState === "display" && branchData.id !== 0 && (
                <ButtonSm
                  className="font-medium"
                  text="Back"
                  state="outline"
                  onClick={handleCancel}
                  type="button"
                />
              )}
              {formState === "create" && (
                <ButtonSm
                  className="font-medium text-white"
                  text={isPending ? "Creating..." : "Create branch"}
                  state="default"
                  type="submit"
                />
              )}
              {formState === "edit" && (
                <ButtonSm
                  className="font-medium text-white disabled:opacity-60"
                  text={isUpdatePending ? "Updating..." : "Save Changes"}
                  state="default"
                  type="button"
                  onClick={() => updateBranch(newbranchData)}
                  disabled={
                    JSON.stringify(newbranchData) === JSON.stringify(branchData)
                  }
                />
              )}
            </section>
          </header>

          {/* Branch Details */}
          <section className="branch-details-section flex w-full flex-col gap-2 overflow-clip px-3">
            <Input
              required
              disabled={formState === "display"}
              title="Branch Name *"
              type="str"
              inputValue={newbranchData.name}
              name="branch"
              placeholder="Enter branch name"
              maxLength={50}
              onChange={(value) =>
                setNewBranchData({ ...newbranchData, name: value })
              }
            />
            <div className="flex flex-col gap-3">
              <Input
                required
                disabled={formState === "display"}
                title="Address Line 1 *"
                type="str"
                inputValue={newbranchData.addressLine1}
                name="address1"
                placeholder="Enter address line 1"
                maxLength={100}
                onChange={(value) =>
                  setNewBranchData({ ...newbranchData, addressLine1: value })
                }
              />
              <Input
                required
                disabled={formState === "display"}
                title="Address Line 2"
                type="str"
                inputValue={newbranchData.addressLine2}
                name="address2"
                placeholder="Enter address line 2"
                maxLength={100}
                onChange={(value) =>
                  setNewBranchData({ ...newbranchData, addressLine2: value })
                }
              />
            </div>
          </section>

          {/* User Access Details */}
          <UserAccessDetails userData={users} setUserData={setUsers} />
        </form>
      </div>
    </main>
  );
};

export default BranchEdit;
