import { useState } from "react";
import Input from "../../../components/common/Input";
import Textarea from "../../../components/common/TextArea";
import PageTitleAndDescription from "../../../components/masterPage.components/PageHeader";
import { ButtonLg } from "../../../components/common/Buttons";
import type { DepartmentDetails } from "../../../types/commonTypes";
import { AnimatePresence } from "motion/react";
import DialogBox from "../../../components/common/DialogBox";
import { DeleteBranchDialogBox } from "./../Branch/DeleteBranchDialogBox";

const DepartmentEdit = () => {
  // Dummy data for branch and users for api simulation
  const department: DepartmentDetails = {
    departmentId: 1,
    name: "Headquarters",
    remarks: "Corporate operations and executive management",
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
    {
      id: 7,
      name: "Panther parama",
      role: "Human resource manager",
      isChecked: true,
    },
    {
      id: 7,
      name: "Panther parama",
      role: "Human resource manager",
      isChecked: true,
    },
    {
      id: 7,
      name: "Panther parama",
      role: "Human resource manager",
      isChecked: true,
    },
    {
      id: 7,
      name: "Panther parama",
      role: "Human resource manager",
      isChecked: true,
    },
    {
      id: 7,
      name: "Panther parama",
      role: "Human resource manager",
      isChecked: true,
    },
    {
      id: 7,
      name: "Panther parama",
      role: "Human resource manager",
      isChecked: true,
    },
    {
      id: 7,
      name: "Panther parama",
      role: "Human resource manager",
      isChecked: true,
    },

    {
      id: 7,
      name: "Panther parama",
      role: "Human resource manager",
      isChecked: true,
    },
  ];

  const [users, setUsers] = useState(usersData);
  const [departmentData] = useState<DepartmentDetails>(department); //Original department data
  const [newDepartmentData, setNewDepartmentData] =
    useState<DepartmentDetails>(department); //Duplicate state for editing and reverting changes

  const handleCheck = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, isChecked: !user.isChecked } : user,
      ),
    );
  };

  const [isDeleteBranchDialogOpen, setIsDeleteBranchDialogOpen] =
    useState(false);

  return (
    <main className="mx-auto flex w-full max-w-[870px] flex-col gap-6">
      <AnimatePresence>
        {isDeleteBranchDialogOpen && (
          <DialogBox setToggleDialogueBox={setIsDeleteBranchDialogOpen}>
            <DeleteBranchDialogBox
              setIsDeleteBranchDialogOpen={setIsDeleteBranchDialogOpen}
            />
          </DialogBox>
        )}
      </AnimatePresence>
      <PageTitleAndDescription
        title="Package Department configuration"
        subtitle="Create and manage job titles to clarify employee roles and hierarchy."
      />

      {/* Branch Configuration container */}
      <div className="branch-config-container flex flex-col gap-4 rounded-[20px] bg-white/80 px-10 py-8">
        {/* Branch Details */}
        <section className="branch-details-section flex w-full flex-col gap-3">
          <header className="text-start text-xl font-medium text-zinc-800">
            Department Details
          </header>

          <section className="flex w-full flex-col gap-4">
            <Input
              title="Branch Name *"
              type="str"
              inputValue={department.name}
              name="branch"
              placeholder="Enter branch name"
              maxLength={50}
              onChange={(value) =>
                setNewDepartmentData({ ...departmentData, name: value })
              }
            />

            <Textarea
              title="Remarks *"
              inputValue={newDepartmentData.remarks}
              name="remarks"
              placeholder="Enter remarks"
              maxLength={300}
              onChange={(value) =>
                setNewDepartmentData({ ...newDepartmentData, remarks: value })
              }
            />
          </section>
        </section>

        {/* User Access Details */}
        <section className="edit-access-section flex w-full flex-col gap-3">
          <h2 className="overflow-clip text-xl font-medium text-zinc-800">
            User access details
          </h2>
          <main className="flex w-full gap-6 overflow-scroll">
            {Array.from(
              { length: Math.ceil(users.length / 5) },
              (_, colIndex) => {
                const columnUsers = users.slice(colIndex * 5, colIndex * 5 + 5);
                return (
                  <fieldset
                    key={colIndex}
                    className="min-w-[350px] items-start space-y-4 overflow-y-auto rounded-[12px] bg-white p-4 px-6"
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
                            <p className="text-m cursor-pointer font-semibold text-zinc-800 transition-all duration-200 ease-in-out hover:text-blue-500 hover:underline active:text-blue-600">
                              {user.name}
                            </p>
                          </div>
                          <p className="ml-4 cursor-pointer text-sm font-normal text-slate-400 transition-all duration-200 ease-in-out hover:text-blue-500 hover:underline active:text-blue-600">
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
        {newDepartmentData !== departmentData && (
          <section className="ml-auto flex flex-row items-center gap-3">
            <ButtonLg
              text="Cancel"
              state="outline"
              onClick={() => setNewDepartmentData(departmentData)}
            />
            <ButtonLg
              text="Save Changes"
              state="default"
              onClick={() => console.log("save")}
            />
          </section>
        )}

        {/* delete department section */}
        <section className="delete-section flex w-full flex-col gap-4">
          <div className="container flex-col gap-2">
            <h2 className="text-xl font-medium text-zinc-800">
              Delete Department
            </h2>
            <p className="text-base font-medium text-slate-500">
              By deleting this department the configured users statuses will be
              affected, this action is irreversible
            </p>
          </div>
          <button
            onClick={() => setIsDeleteBranchDialogOpen(true)}
            className="flex w-max cursor-pointer rounded-[9px] border border-red-500 bg-red-500 px-3 py-2 text-white"
          >
            Delete Branch
          </button>
        </section>
      </div>
    </main>
  );
};

export default DepartmentEdit;
