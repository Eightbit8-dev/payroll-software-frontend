import { useEffect, useState } from "react";
import Input from "../../../components/common/Input";
import ButtonSm from "../../../components/common/Buttons";
import DropdownSelect from "../../../components/common/DropDown";
import type { FormState } from "../../../types/appTypes";
import {
  useCreateHoliday,
  useEditHoliday,
} from "../../../queries/HolidayQuery";
import type { HolidayDetails } from "../../../types/apiTypes";
import Chip from "../../../components/common/Chips";
import { useFetchAttendancesTypes } from "../../../queries/AttendanceQuery";
import { useFetchBranchOptions } from "../../../queries/BranchQuery";
import { useFetchDepartmentOptions } from "../../../queries/DepartmentQuery";

const HolidayEdit = ({
  holidayDetails,
  formState,
  setFormState,
  setHolidayData,
}: {
  holidayDetails: HolidayDetails | null;
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  setHolidayData: React.Dispatch<React.SetStateAction<HolidayDetails | null>>;
}) => {
  const emptyHoliday: HolidayDetails = {
    id: 0,
    name: "",
    holidayDate: "",
    branches: [],
    departments: [],
    leaveType: "",
    remarks: "",
    month: "",
    year: "",
  };

  const [formData, setFormData] = useState<HolidayDetails>(emptyHoliday);

  const {
    mutate: createHoliday,
    isPending: isCreating,
    isSuccess: isCreated,
  } = useCreateHoliday();

  const {
    mutate: updateHoliday,
    isPending: isUpdating,
    isSuccess: isUpdated,
  } = useEditHoliday();

  const { data: attendanceTypes } = useFetchAttendancesTypes();
  const { data: departmentOptions } = useFetchDepartmentOptions();
  const { data: branchOptions } = useFetchBranchOptions();

  useEffect(() => {
    if (formState === "create") {
      setFormData(emptyHoliday);
    } else if (holidayDetails) {
      const formattedBranches =
        holidayDetails.branches && Array.isArray(holidayDetails.branches[0])
          ? holidayDetails.branches
          : [];

      const formattedDepartments =
        holidayDetails.departments && Array.isArray(holidayDetails.departments[0])
          ? holidayDetails.departments
          : [];

      setFormData({
        ...holidayDetails,
        branches: formattedBranches,
        departments: formattedDepartments,
      });
    }
  }, [formState, holidayDetails]);

  useEffect(() => {
    if (isCreated || isUpdated) {
      setFormState("create");
      setFormData(emptyHoliday);
      setHolidayData(null);
    }
  }, [isCreated, isUpdated]);

  const handleCancel = () => {
    setFormState("create");
    setFormData(emptyHoliday);
    setHolidayData(null);
  };

  const preparePayload = () => {
    const dateObj = new Date(formData.holidayDate);
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear().toString();

    return {
      id: formData.id,
      name: formData.name,
      holidayDate: formData.holidayDate,
      branchIds: formData.branches.map(([id]) => id),
      departmentIds: formData.departments.map(([id]) => id),
      leaveType: formData.leaveType,
      remarks: formData.remarks,
      month,
      year,
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState === "create") {
      createHoliday(preparePayload());
    }
  };

  const handleUpdate = () => {
    if (formState === "edit") {
      updateHoliday(preparePayload());
    }
  };

  const isDisplay = formState === "display";

  const handleAddDepartment = (opt: { id: number; label: string }) => {
    const exists = formData.departments.some((d) => d[0] === opt.id);
    if (!exists) {
      setFormData({
        ...formData,
        departments: [...formData.departments, [opt.id, opt.label]],
      });
    }
  };

  const handleRemoveDepartment = (id: number) => {
    setFormData({
      ...formData,
      departments: formData.departments.filter((d) => d[0] !== id),
    });
  };

  const handleAddBranch = (opt: { id: number; label: string }) => {
    const exists = formData.branches.some((b) => b[0] === opt.id);
    if (!exists) {
      setFormData({
        ...formData,
        branches: [...formData.branches, [opt.id, opt.label]],
      });
    }
  };

  const handleRemoveBranch = (id: number) => {
    setFormData({
      ...formData,
      branches: formData.branches.filter((b) => b[0] !== id),
    });
  };

  return (
    <main className="flex max-h-full w-full max-w-[870px] flex-col gap-2">
      <div className="holiday-config-container flex flex-col gap-3 rounded-[20px]">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <header className="flex w-full flex-row items-center justify-between">
            <h1 className="text-start text-lg font-semibold text-zinc-800">
              {formState === "create"
                ? "Holiday Configuration"
                : `${holidayDetails?.name || "Holiday"} Configuration`}
            </h1>
            <section className="ml-auto flex flex-row items-center gap-3">
              {(formState === "edit" ||
                (formState === "create" && formData.name)) && (
                <ButtonSm
                  className="font-medium"
                  text="Cancel"
                  state="outline"
                  type="button"
                  onClick={handleCancel}
                />
              )}
              {formState === "display" && formData.id !== 0 && (
                <ButtonSm
                  className="font-medium"
                  text="Back"
                  state="outline"
                  type="button"
                  onClick={handleCancel}
                />
              )}
              {formState === "create" && (
                <ButtonSm
                  className="font-medium text-white disabled:opacity-50"
                  text={isCreating ? "Creating..." : "Create Holiday"}
                  state="default"
                  type="submit"
                  disabled={
                    isCreating ||
                    !formData.name ||
                    !formData.holidayDate ||
                    !formData.leaveType ||
                    !formData.departments.length ||
                    !formData.branches.length
                  }
                />
              )}
             {formState === "edit" && (
  <ButtonSm
    className="font-medium text-white disabled:opacity-50"
    text={isUpdating ? "Updating..." : "Save Changes"}
    state="default"
    type="button"
    onClick={handleUpdate}
    disabled={isUpdating} // ✅ Only disable if updating in progress
  />
)}
            </section>
          </header>

          <section className="flex w-full flex-col gap-2 px-3">
            <Input
              required
              disabled={isDisplay}
              title="Holiday Name *"
              type="str"
              inputValue={formData.name}
              name="Holiday"
              placeholder="Enter holiday name"
              maxLength={50}
              onChange={(value) => setFormData({ ...formData, name: value })}
            />

            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
              <Input
                required
                disabled={isDisplay}
                title="Holiday Date *"
                inputValue={formData.holidayDate}
                name="holidayDate"
                placeholder="Select date"
                onChange={(value) =>
                  setFormData({ ...formData, holidayDate: value })
                }
              />

              {!isDisplay && attendanceTypes && (
                <DropdownSelect
                  title="Leave Type *"
                  options={attendanceTypes}
                  selected={
                    attendanceTypes.find(
                      (opt) => opt.label === formData.leaveType
                    ) || { id: 0, label: "Select leave type" }
                  }
                  onChange={(opt) =>
                    setFormData({ ...formData, leaveType: opt.label })
                  }
                />
              )}

              {isDisplay && (
                <Input
                  disabled
                  title="Leave Type"
                  type="str"
                  inputValue={formData.leaveType}
                  name="leaveType"
                  placeholder=""
                  onChange={() => {}}
                />
              )}
            </div>

            {/* Departments Section */}
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium text-slate-700">
                Departments *
              </h3>
              <div className="flex flex-wrap gap-2">
                {formData.departments.map(([id, label]) => (
                  <Chip
                    key={id}
                    label={label}
                    isEditable={!isDisplay}
                    onRemove={() => handleRemoveDepartment(id)}
                  />
                ))}
              </div>
              {!isDisplay && departmentOptions && (
                <DropdownSelect
                  title="Select departments to add"
                  options={departmentOptions}
                  selected={{ id: 0, label: "Select department" }}
                  onChange={handleAddDepartment}
                />
              )}
            </div>

            {/* Branches Section */}
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium text-slate-700">Branches *</h3>
              <div className="flex flex-wrap gap-2">
                {formData.branches.map(([id, label]) => (
                  <Chip
                    key={id}
                    label={label}
                    isEditable={!isDisplay}
                    onRemove={() => handleRemoveBranch(id)}
                  />
                ))}
              </div>
              {!isDisplay && branchOptions && (
                <DropdownSelect
                  title="Select branches to add"
                  options={branchOptions}
                  selected={{ id: 0, label: "Select branch" }}
                  onChange={handleAddBranch}
                />
              )}
            </div>
          </section>
        </form>
      </div>
    </main>
  );
};

export default HolidayEdit;
