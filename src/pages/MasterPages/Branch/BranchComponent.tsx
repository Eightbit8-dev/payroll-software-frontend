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
    {
      id: 1,
      name: "Sabarish Vijayakumar",
      role: "Human resource manager",
      isChecked: false,
    },
    {
      id: 2,
      name: "Shanthi Saba",
      role: "Human resource manager",
      isChecked: false,
    },
    {
      id: 3,
      name: "Sachin S",
      role: "Human resource manager",
      isChecked: false,
    },
    {
      id: 4,
      name: "Santosh V VP",
      role: "Human resource manager",
      isChecked: false,
    },
    {
      id: 5,
      name: "Panther parama",
      role: "Human resource manager",
      isChecked: true,
    },
    {
      id: 6,
      name: "Santosh V VP",
      role: "Human resource manager",
      isChecked: false,
    },
    {
      id: 7,
      name: "Panther parama",
      role: "Human resource manager",
      isChecked: true,
    },
    {
      id: 8,
      name: "Panther parama",
      role: "Human resource manager",
      isChecked: true,
    },
    {
      id: 9,
      name: "Panther parama",
      role: "Human resource manager",
      isChecked: true,
    },
    {
      id: 10,
      name: "Panther parama",
      role: "Human resource manager",
      isChecked: true,
    },
    {
      id: 11,
      name: "Panther parama",
      role: "Human resource manager",
      isChecked: true,
    },
    {
      id: 12,
      name: "Panther parama",
      role: "Human resource manager",
      isChecked: true,
    },
    {
      id: 13,
      name: "Panther parama",
      role: "Human resource manager",
      isChecked: true,
    },
    {
      id: 14,
      name: "Panther parama",
      role: "Human resource manager",
      isChecked: true,
    },
    {
      id: 15,
      name: "Panther parama",
      role: "Human resource manager",
      isChecked: true,
    },
  ];

  const [users, setUsers] = useState(usersData); //Dummy data
  const [branchData, setBranchData] = useState<BranchDetails | null>(null); //Original branch data passed from above
  const [newbranchData, setNewBranchData] = useState<BranchDetails | null>(
    null,
  ); //Local copy to reset if cancel is clicked

  const { mutate: createBranch, isPending, isSuccess } = useCreateBranch();
  const {
    mutate: updateBranch,
    isPending: isUpdatePending,
    isSuccess: isUpdatingSuccess,
  } = useEditBranch();

  useEffect(() => {
    if (branchDetails) {
      setBranchData(branchDetails);
      setNewBranchData(branchDetails);
    }
  }, [branchDetails]);

  useEffect(() => {
    if (isSuccess) {
      setBranchData(newbranchData);
      setFormState("display");
    }
  }, [isSuccess]); //cleaning after sumission

  useEffect(() => {
    if (isUpdatingSuccess) {
      setBranchData(newbranchData);
      setFormState("display");
    }
  }, [isUpdatingSuccess]); //.cleanign after user updates

  const handleCheck = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, isChecked: !user.isChecked } : user,
      ),
    );
  };

  if (!branchData || !newbranchData) {
    return (
      <p className="text-center text-sm text-gray-500">
        Select a branch to view details.
      </p>
    );
  }

  return (
    <main className={`} flex max-h-full w-full max-w-[870px] flex-col gap-2`}>
      {/* Branch Configuration container */}
      <div className="branch-config-container flex flex-col gap-3 rounded-[20px] bg-white/80">
        <header className="header flex w-full flex-row items-center justify-between">
          <h1 className="text-start text-lg font-semibold text-zinc-800">
            {branchData.name} Configuration
          </h1>
          {formState === "create" && (
            <ButtonSm
              className="font-semibold text-white"
              state="default"
              text={isPending ? "Creating..." : "Create new branch"}
              onClick={() => {
                createBranch(newbranchData);
              }}
            />
          )}
          {JSON.stringify(newbranchData) !== JSON.stringify(branchData) &&
            formState !== "create" && (
              <section className="ml-auto flex flex-row items-center gap-3">
                {formState === "edit" && (
                  <>
                    <ButtonSm
                      className="font-medium"
                      text="Cancel"
                      state="outline"
                      onClick={() => {
                        setFormState("display");
                        setNewBranchData(branchData);
                      }}
                    />
                    <ButtonSm
                      className="font-medium text-white"
                      text={isUpdatePending ? "Updating..." : "Save Changes"}
                      state="default"
                      onClick={() => updateBranch(newbranchData)}
                    />
                  </>
                )}
              </section>
            )}
        </header>

        {/* Branch Details */}
        <section className="branch-details-section flex max-h-full w-full flex-col gap-2 overflow-clip px-3">
          <Input
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
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
            <Input
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
            User access details TODO
          </h1>
          <main className="scrollbar-visible flex max-h-[300px] w-full scroll-m-0 flex-col gap-3 overflow-y-auto">
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
      </div>
    </main>
  );
};

export default BranchEdit;
