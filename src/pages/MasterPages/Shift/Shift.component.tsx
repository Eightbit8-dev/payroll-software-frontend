import { useEffect, useState } from "react";
import Input, { TimeInput } from "../../../components/common/Input";
import ButtonSm from "../../../components/common/Buttons";
import type { FormState } from "../../../types/appTypes";
import type { ShiftDetails } from "../../../types/apiTypes";
import { useCreateShift, useEditShift } from "../../../queries/ShiftQuery";
import DropdownSelect from "../../../components/common/DropDown";
import isEqual from "lodash.isequal";
import { useFetchAttendances } from "../../../queries/AttendanceQuery";
import { useFetchPermissions } from "../../../queries/PermissionQuery";

const ShiftEdit = ({
  Shift,
  formState,
  setFormState,
  setShiftData,
}: {
  Shift: ShiftDetails | null;
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  setShiftData: React.Dispatch<React.SetStateAction<ShiftDetails | null>>;
}) => {
  const emptyShift: ShiftDetails = {
    id: 0,
    name: "",
    type: "Per Hour",
    present: "Yes",
    lop: "No",
    earlyGoing: "",
    lateComing: "",
    isNight: "Regular shift",
    shiftIn: "",
    shiftOut: "",
    lunchOut: "",
    lunchIn: "",
  };
  const [formData, setFormData] = useState<ShiftDetails>(emptyShift);

  const {
    mutate: createShift,
    isPending: isCreating,
    isSuccess: isCreated,
  } = useCreateShift();
  const {
    mutate: updateShift,
    isPending: isUpdating,
    isSuccess: isUpdated,
  } = useEditShift();

  const shiftTypeOptions = [
    { id: 1, label: "Per Day" },
    { id: 2, label: "Per Hour" },
  ];

  const nightTypeOptions = [
    { id: 1, label: "Regular shift" },
    { id: 2, label: "Night shift" },
    { id: 3, label: "Regular continous night" },
  ];

  const [attendanceTypeOption, setAttendanceTypeOption] = useState<
    { id: number; label: string }[]
  >([]);
  const [permissionTypeOption, setPermissionTypeOption] = useState<
    { id: number; label: string }[]
  >([]);

  const { data: attendanceTypes, isSuccess: isAttendanceTypesSuccess } =
    useFetchAttendances();
  const { data: permissionTypes, isSuccess: isPermissionTypesSuccess } =
    useFetchPermissions();

  useEffect(() => {
    if (isAttendanceTypesSuccess) {
      const options = attendanceTypes?.map((type) => ({
        id: type.id,
        label: type.name,
      }));
      setAttendanceTypeOption(options);
    }
  }, [isAttendanceTypesSuccess]);

  useEffect(() => {
    if (isPermissionTypesSuccess) {
      const options = permissionTypes?.map((type) => ({
        id: type.id || 0,
        label: type.name,
      }));
      setPermissionTypeOption(options);
    }
  }, [isPermissionTypesSuccess]);

  // Set data on formState or prop change
  useEffect(() => {
    if (formState === "create") {
      setFormData(emptyShift);
    } else if (Shift) {
      setFormData(Shift);
    }
  }, [formState, Shift]);

  // Reset form on success
  useEffect(() => {
    if (isCreated || isUpdated) {
      setFormState("create");
      setFormData(emptyShift);
      setShiftData(null);
    }
  }, [isCreated, isUpdated]);

  const handleCancel = () => {
    setFormState("create");
    setFormData(emptyShift);
    setShiftData(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState === "create") {
      createShift(formData);
    }
  };

  const handleUpdate = () => {
    if (formState === "edit") {
      updateShift(formData);
    }
  };

  const isDisplay = formState === "display";

  return (
    <main className="flex max-h-full w-full max-w-[870px] flex-col gap-2">
      <div className="shift-config-container flex flex-col gap-3 rounded-[20px]">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <header className="flex w-full flex-row items-center justify-between">
            <h1 className="text-start text-lg font-semibold text-zinc-800">
              {formState === "create"
                ? "Shift Details Configuration"
                : `${formData.name || "Shift Details"} Configuration`}
            </h1>

            <section className="ml-auto flex flex-row items-center gap-3">
              {formState === "edit" && (
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
                  className="font-medium text-white"
                  text={isCreating ? "Creating..." : "Create New"}
                  state="default"
                  type="submit"
                  disabled={isCreating}
                />
              )}

              {formState === "edit" && (
                <ButtonSm
                  className="w-max font-medium text-white disabled:opacity-50"
                  text={isUpdating ? "Updating..." : "Save Changes"}
                  state="default"
                  type="button"
                  onClick={handleUpdate}
                  disabled={isUpdating || isEqual(formData, Shift)}
                />
              )}
            </section>
          </header>

          <section className="flex w-full flex-col gap-2 px-3">
            <div className="grid grid-cols-2 gap-3">
              <Input
                required
                disabled={isDisplay}
                title="Shift Name *"
                type="str"
                inputValue={formData.name}
                name="ShiftName"
                placeholder="Enter Shift name"
                maxLength={50}
                onChange={(value) => setFormData({ ...formData, name: value })}
              />
              <DropdownSelect
                title="Select Type *"
                disabled={isDisplay}
                options={shiftTypeOptions}
                selected={
                  shiftTypeOptions.find(
                    (opt) => opt.label === formData.type,
                  ) ?? { id: 0, label: "Select type" }
                }
                onChange={(opt) =>
                  setFormData({ ...formData, type: opt.label })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <DropdownSelect
                title="Present *"
                disabled={isDisplay}
                options={attendanceTypeOption}
                selected={
                  attendanceTypeOption.find(
                    (opt) => opt.label === formData.present,
                  ) ?? {
                    id: 0,
                    label: "Select type",
                  }
                }
                onChange={(opt) =>
                  setFormData({ ...formData, present: opt.label })
                }
              />

              <DropdownSelect
                title="Loss of pay*"
                disabled={isDisplay}
                options={attendanceTypeOption}
                selected={
                  attendanceTypeOption.find(
                    (opt) => opt.label === formData.lop,
                  ) ?? {
                    id: 0,
                    label: "Select type",
                  }
                }
                onChange={(opt) => setFormData({ ...formData, lop: opt.label })}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <DropdownSelect
                title="Early going*"
                disabled={isDisplay}
                options={permissionTypeOption}
                selected={
                  permissionTypeOption.find(
                    (opt) => opt.label === formData.earlyGoing,
                  ) ?? {
                    id: 0,
                    label: "Select type",
                  }
                }
                onChange={(opt) =>
                  setFormData({ ...formData, earlyGoing: opt.label })
                }
              />

              <DropdownSelect
                title="Late coming*"
                disabled={isDisplay}
                options={permissionTypeOption}
                selected={
                  permissionTypeOption.find(
                    (opt) => opt.label === formData.lateComing,
                  ) ?? {
                    id: 0,
                    label: "Select type",
                  }
                }
                onChange={(opt) =>
                  setFormData({ ...formData, lateComing: opt.label })
                }
              />
            </div>

            <DropdownSelect
              title="Shift type*"
              disabled={isDisplay}
              options={nightTypeOptions}
              selected={
                nightTypeOptions.find(
                  (opt) => opt.label === formData.isNight,
                ) ?? {
                  id: 0,
                  label: "Select type",
                }
              }
              onChange={(opt) =>
                setFormData({ ...formData, isNight: opt.label })
              }
            />

            <div className="grid grid-cols-2 gap-3">
              <TimeInput
                required
                disabled={isDisplay}
                title="Shift In Time *"
                value={formData.shiftIn}
                onChange={(value) =>
                  setFormData({ ...formData, shiftIn: value })
                }
              />

              <TimeInput
                required
                disabled={isDisplay}
                title="Shift Out Time *"
                value={formData.shiftOut}
                onChange={(value) =>
                  setFormData({ ...formData, shiftOut: value })
                }
              />
            </div>

            {formData.type === "Per Day" && (
              <div className="grid grid-cols-2 gap-3">
                <TimeInput
                  required={formData.type === "Per Day"}
                  disabled={isDisplay}
                  title="Lunch Out Time"
                  value={formData.lunchOut}
                  onChange={(value) =>
                    setFormData({ ...formData, lunchOut: value })
                  }
                />

                <TimeInput
                  required={formData.type === "Per Day"}
                  disabled={isDisplay}
                  title="Lunch In Time"
                  value={formData.lunchIn}
                  onChange={(value) =>
                    setFormData({ ...formData, lunchIn: value })
                  }
                />
              </div>
            )}
          </section>
        </form>
      </div>
    </main>
  );
};

export default ShiftEdit;
