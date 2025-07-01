import { useEffect, useState } from "react";
import Input, { InputCheckbox } from "../../../components/common/Input";
import ButtonSm from "../../../components/common/Buttons";
import type { FormState } from "../../../types/appTypes";
import type { DepartmentDetails } from "../../../types/apiTypes";
import { AnimatePresence, motion } from "framer-motion";
import isEqual from "lodash.isequal";
import {
  useCreateDepartment,
  useEditDepartment,
} from "../../../queries/DepartmentQuery";
import { usersData } from "../../../utils/userData";
import UserAccessDetails from "../Users.component";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const DepartmentEdit = ({
  departmentDetails,
  formState,
  setFormState,
}: {
  departmentDetails: DepartmentDetails | null;
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
}) => {
  // State management
  const [users, setUsers] = useState(usersData);
  const [departmentData, setDepartmentData] =
    useState<DepartmentDetails | null>(null);
  const [newDepartmentData, setNewDepartmentData] =
    useState<DepartmentDetails | null>(null);

  //Tanstack queries
  const {
    mutate: createDepartment,
    isPending,
    isSuccess,
  } = useCreateDepartment();
  const {
    mutate: updateDepartment,
    isPending: isUpdatePending,
    isSuccess: isUpdatingSuccess,
  } = useEditDepartment();

  //Dummy data for cleanuo
  const emptyDepartment: DepartmentDetails = {
    name: "",
    code: "",
    remarks: "",
    active: true,
    id: 0,
  };

  // On form mode or data change
  useEffect(() => {
    if (departmentDetails) {
      setDepartmentData(departmentDetails);
      setNewDepartmentData(departmentDetails);
    }
  }, [departmentDetails]);

  useEffect(() => {
    if (isSuccess && formState === "create") {
      setNewDepartmentData(emptyDepartment);
      setDepartmentData(null);
      setFormState("create");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isUpdatingSuccess && formState === "edit") {
      setNewDepartmentData(emptyDepartment);
      setDepartmentData(null);
      setFormState("create");
    }
  }, [isUpdatingSuccess]);

  if (!departmentData && formState !== "create") {
    return (
      <p className="text-md my-1 self-center-safe text-center text-gray-600">
        Select a department to view its details.
      </p>
    );
  }

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex max-h-full w-full max-w-[870px] flex-col gap-2"
    >
      <motion.div
        variants={containerVariants}
        className="department-config-container flex flex-col gap-3 rounded-[20px]"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (formState === "create") {
              createDepartment(newDepartmentData!);
            } else {
              updateDepartment(newDepartmentData!);
            }
          }}
        >
          <header className="flex w-full flex-row items-center justify-between">
            <h1 className="my-1 text-start text-lg font-semibold text-zinc-800">
              {formState === "create"
                ? "Create Department"
                : `${departmentData?.name ?? "Department"} Configuration`}
            </h1>

            <AnimatePresence mode="wait">
              {formState === "create" && (
                <ButtonSm
                  type="submit"
                  className="font-semibold text-white"
                  state="default"
                  text={isPending ? "Creating..." : "Create new "}
                />
              )}
            </AnimatePresence>

            {formState === "display" && (
              <ButtonSm
                className="font-medium outline-2"
                text="Back"
                state="outline"
                onClick={() => {
                  setFormState("create");
                  setNewDepartmentData({
                    name: "",
                    code: "",
                    remarks: "",
                    active: true,
                    id: 0,
                  });
                  setDepartmentData(null);
                }}
              />
            )}

            {formState === "edit" && (
              <section className="ml-auto flex flex-row items-center gap-3">
                <ButtonSm
                  className="font-medium"
                  text="Cancel"
                  state="outline"
                  onClick={() => {
                    setFormState("create");
                    setNewDepartmentData({
                      name: "",
                      code: "",
                      remarks: "",
                      active: true,
                      id: 0,
                    });
                    setDepartmentData(null);
                  }}
                />
                <ButtonSm
                  className="font-medium text-white disabled:opacity-50"
                  text={isUpdatePending ? "Updating..." : "Save Changes"}
                  state="default"
                  type="submit"
                  disabled={isEqual(newDepartmentData, departmentData)}
                />
              </section>
            )}
          </header>

          <section className="department-details-section flex max-h-full w-full flex-col gap-2 overflow-clip px-3">
            <Input
              required
              disabled={formState === "display"}
              title="Department Name *"
              type="str"
              inputValue={newDepartmentData?.name ?? ""}
              name="Department"
              placeholder="Enter department name"
              maxLength={50}
              onChange={(value) =>
                setNewDepartmentData({ ...newDepartmentData!, name: value })
              }
            />
          </section>
        </form>

        <section className="flex w-full flex-col gap-3">
          <header className="flex flex-col gap-0 py-2">
            <h1 className="text-start text-lg font-semibold text-zinc-800">
              Department shifts
            </h1>
            <p className="text-sm font-medium text-slate-500">
              Describes whether the department follows day shift, night shift or
              both
            </p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 px-3 py-3">
              <InputCheckbox
                title="Day Shift"
                disabled={formState === "display"}
                checked={true}
                onChange={(value) => console.log("Day shift:", value)}
              />
              <InputCheckbox
                title="Night Shift"
                disabled={formState === "display"}
                checked={true}
                onChange={(value) => console.log("Night shift:", value)}
              />
            </div>
          </header>
        </section>

        <UserAccessDetails userData={users} setUserData={setUsers} />
      </motion.div>
    </motion.main>
  );
};

export default DepartmentEdit;
