import { useState } from "react";
import Input from "../../../components/common/Input";
import Textarea from "../../../components/common/Textarea";
import PageTitleAndDescription from "../../../components/masterPage.components/PageTitleAndDescription";
import { ButtonLg } from "../../../components/common/Buttons";
import type { BranchDetails } from "../../../types/commonTypes";

const Branchedit = () => {
  // Dummy data for branch and users for api simulation
  const BranchData: BranchDetails = {
    branchId: 1,
    name: "Chennai Branch",
    address1: "26,4d murugan layout coimbatore",
    address2: "Tamil nadu",
    remarks:
      "The designation clearly outlines the  and level within the organization, helping to others",
  };
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
  ];

  const [users, setUsers] = useState(usersData);
  const [branchData, setBranchData] = useState<BranchDetails>(BranchData); //Original branch data
  const [newbranchData, setNewBranchData] = useState<BranchDetails>(BranchData); //Duplicate state for editing and reverting changes

  const handleCheck = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, isChecked: !user.isChecked } : user,
      ),
    );
  };

  return (
    <main className="mx-auto flex w-full max-w-[870px] flex-col gap-6">
      <PageTitleAndDescription
        title=" Chennai Branch configuration"
        subtitle="Manage different office branches to streamline your organizational structure."
      />

      {/* Branch Configuration container */}
      <div className="branch-config-container flex flex-col gap-4 rounded-[20px] bg-white/80 px-10 py-8">
        {/* Branch Details */}
        <section className="branch-details-section flex w-full flex-col gap-3">
          <header className="text-start text-xl font-medium text-zinc-800">
            Branch Details
          </header>

          <section className="flex w-full flex-col gap-4">
            <Input
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
                title="Address Line 1 *"
                type="str"
                inputValue={newbranchData.address1}
                name="address1"
                placeholder="Enter address line 1"
                maxLength={100}
                onChange={(value) =>
                  setNewBranchData({ ...newbranchData, address1: value })
                }
              />
              <Input
                title="Address Line 2"
                type="str"
                inputValue={newbranchData.address2}
                name="address2"
                placeholder="Enter address line 2"
                maxLength={100}
                onChange={(value) =>
                  setNewBranchData({ ...newbranchData, address2: value })
                }
              />
            </div>

            <Textarea
              title="Remarks *"
              inputValue={newbranchData.remarks}
              name="remarks"
              placeholder="Enter remarks"
              maxLength={300}
              onChange={(value) =>
                setNewBranchData({ ...newbranchData, remarks: value })
              }
            />
          </section>
        </section>

        {/* User Access Details */}
        <section className="edit-access-section flex w-full flex-col gap-3">
          <h2 className="text-xl font-medium text-zinc-800">
            User access details
          </h2>
          <main className="flex gap-6">
            {Array.from(
              { length: Math.ceil(users.length / 5) },
              (_, colIndex) => {
                const columnUsers = users.slice(colIndex * 5, colIndex * 5 + 5);
                return (
                  <fieldset
                    key={colIndex}
                    className="w-[400px] items-start space-y-4 overflow-y-auto rounded-[12px] bg-white p-4 px-6 shadow-sm"
                  >
                    {columnUsers.map((user) => (
                      <article
                        key={user.id}
                        className="flex items-center justify-between gap-3 py-2"
                      >
                        <div className="flex-1">
                          <div className="id-and-details-container flex items-start gap-2">
                            <p className="text-base font-semibold text-zinc-800">
                              {user.id}
                            </p>
                            <p className="text-m font-semibold text-zinc-800">
                              {user.name}
                            </p>
                          </div>
                          <p className="ml-4 text-sm font-normal text-slate-400">
                            {user.role}
                          </p>
                        </div>
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
                              <span className="absolute inset-0 flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </span>
                            )}
                          </label>
                        </div>
                      </article>
                    ))}
                  </fieldset>
                );
              },
            )}
          </main>
        </section>
        {newbranchData !== branchData && (
          <section className="ml-auto flex flex-row items-center gap-3">
            <ButtonLg
              text="Cancel"
              state="outline"
              onClick={() => setNewBranchData(branchData)}
            />
            <ButtonLg
              text="Save Changes"
              state="default"
              onClick={() => console.log("save")}
            />
          </section>
        )}

        {/* delete branch section */}
        <section className="delete-section flex w-full flex-col gap-3">
          <h2 className="text-xl font-medium text-red-600">Delete Branch</h2>
          <p className="text-base font-medium text-slate-500">
            By deleting this branch the configured users statuses will be
            affected, this action is irreversible
          </p>
          <button className="flex w-max cursor-pointer rounded-[9px] border border-red-500 bg-red-500 px-3 py-2 text-white">
            Delete Branch
          </button>
        </section>
      </div>
    </main>
  );
};

export default Branchedit;
