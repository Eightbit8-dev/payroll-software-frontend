import { useEffect, useState } from "react";
import Input from "../../../components/common/Input";
import ButtonSm from "../../../components/common/Buttons";
import type { FormState } from "../../../types/appTypes";
import { useCreateBranch, useEditBranch } from "../../../queries/BranchQuery";
import type { BranchDetails } from "../../../types/apiTypes";

const BranchEdit = ({
  branchDetails,
  formState,
  setFormState,
}: {
  branchDetails: BranchDetails | null;
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
}) => {
  const usersData = [
    { id: 1, name: "Sabarish Vijayakumar", role: "HR", isChecked: false },
    { id: 2, name: "Shanthi Saba", role: "HR", isChecked: false },
    { id: 3, name: "Sachin S", role: "HR", isChecked: false },
    { id: 4, name: "Santosh V VP", role: "HR", isChecked: false },
    { id: 5, name: "Panther Parama", role: "HR", isChecked: true },
    { id: 6, name: "Santosh V VP", role: "HR", isChecked: false },
  ];

  const [users, setUsers] = useState(usersData);
  const [branchData, setBranchData] = useState<BranchDetails | null>(null);
  const [newbranchData, setNewBranchData] = useState<BranchDetails | null>(null);

  const { mutate: createBranch, isPending, isSuccess } = useCreateBranch();
  const {
    mutate: updateBranch,
    isPending: isUpdatePending,
    isSuccess: isUpdatingSuccess,
  } = useEditBranch();

  useEffect(() => {
    if (formState === "create") {
      const emptyBranch: BranchDetails = {
        id: 0,
        name: "",
        code: "",
        addressLine1: "",
        addressLine2: "",
        remarks: "",
        companyId: "",
      };
      setBranchData(emptyBranch);
      setNewBranchData(emptyBranch);
    } else if (branchDetails) {
      setBranchData(branchDetails);
      setNewBranchData(branchDetails);
    }
  }, [branchDetails, formState]);

  useEffect(() => {
    if (isSuccess) {
      // Reset form after successful creation
      const emptyBranch: BranchDetails = {
        id: 0,
        name: "",
        code: "",
        addressLine1: "",
        addressLine2: "",
        remarks: "",
        companyId: "",
      };
      setBranchData(emptyBranch);
      setNewBranchData(emptyBranch);
      setFormState("create");
    } else if (isUpdatingSuccess) {
      setBranchData(newbranchData);
      setFormState("display");
    }
  }, [isSuccess, isUpdatingSuccess]);

  const handleCheck = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, isChecked: !user.isChecked } : user
      )
    );
  };

  const handleCancel = () => {
    const emptyBranch: BranchDetails = {
      id: 0,
      name: "",
      code: "",
      addressLine1: "",
      addressLine2: "",
      remarks: "",
      companyId: "",
    };
    setBranchData(emptyBranch);
    setNewBranchData(emptyBranch);
    setFormState("create");
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
      <div className="branch-config-container flex flex-col gap-3 rounded-[20px] bg-white/80">
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            createBranch(newbranchData);
          }}
        >
          <header className="header flex w-full flex-row items-center justify-between">
            <h1 className="text-start text-lg font-semibold text-zinc-800">
              {formState === "create"
                ? "Branch Configuration"
                : `${branchData.name || "Branch"} Configuration`}
            </h1>
            <section className="ml-auto flex flex-row items-center gap-3">
              {(formState === "edit" || (formState === "create" && hasData)) && (
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
                  text={isPending ? "Creating..." : "Create new "}
                  state="default"
                  type="submit"
                />
              )}
              {formState === "edit" && (
                <ButtonSm
                  className="font-medium text-white"
                  text={isUpdatePending ? "Updating..." : "Save Changes"}
                  state="default"
                  onClick={() => updateBranch(newbranchData)}
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
          <section className="edit-access-section flex w-full flex-col gap-3">
            <h1 className="text-start text-lg font-semibold text-zinc-800">
              User access details
            </h1>
            <main className="scrollbar-visible flex w-full flex-col gap-3 overflow-y-auto max-h-[180px]">
              <fieldset className="inline-block w-full rounded-[14px] bg-white px-3">
                {users.map((user) => (
                  <article
                    key={user.id}
                    className="flex items-center justify-between gap-3 py-2"
                  >
                    <p className="w-min text-sm font-semibold text-zinc-800">
                      {user.id}
                    </p>
                    <p className="w-full cursor-pointer text-start text-sm font-semibold text-zinc-800 transition-all duration-200 ease-in-out hover:text-blue-500 hover:underline active:text-blue-600">
                      {user.name}
                    </p>
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        id={`user-${user.id}`}
                        checked={user.isChecked}
                        onChange={() => handleCheck(user.id)}
                        className="sr-only"
                      />
                      <label
                        htmlFor={`user-${user.id}`}
                        className={`relative block h-5 w-5 cursor-pointer rounded-[8px] border-2 p-[12px] outline-none focus:outline-none ${
                          user.isChecked
                            ? "border-green-500 bg-green-500"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {user.isChecked && (
                          <img
                            className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 select-none"
                            src="/icons/tick-icon.svg"
                            alt="tick"
                          />
                        )}
                      </label>
                    </div>
                  </article>
                ))}
              </fieldset>
            </main>
          </section>
        </form>
      </div>
    </main>
  );
};

export default BranchEdit;
