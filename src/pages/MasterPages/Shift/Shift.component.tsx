import { useEffect, useState } from "react";
import Input, { TimeInput } from "../../../components/common/Input";
import ToggleField from "../../../components/common/ToggleField";

import ButtonSm from "../../../components/common/Buttons";
import type { FormState } from "../../../types/appTypes";
import type { ShiftDetails } from "../../../types/apiTypes";
import { useCreateShift, useEditShift } from "../../../queries/ShiftQuery";
import DropdownSelect from "../../../components/common/DropDown";

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
    isNight: "No",
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
                  text={isCreating ? "Creating..." : "Create Shift"}
                  state="default"
                  type="submit"
                  disabled={isCreating}
                />
              )}

              {formState === "edit" && (
                <ButtonSm
                  className="font-medium text-white disabled:opacity-50"
                  text={isUpdating ? "Updating..." : "Save Changes"}
                  state="default"
                  type="button"
                  onClick={handleUpdate}
                  disabled={
                    isUpdating ||
                    !formData.name ||
                    !formData.type ||
                    !formData.shiftIn ||
                    !formData.shiftOut
                  }
                />
              )}
            </section>
          </header>

          <section className="flex w-full flex-col gap-2 overflow-clip px-3">
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
              <ToggleField
                title="Present *"
                disabled={isDisplay}
                subtitle="Mark Present"
                value={formData.present === "Yes"}
                onToggle={(val) =>
                  setFormData({ ...formData, present: val ? "Yes" : "No" })
                }
              />

              <ToggleField
                title="LOP *"
                disabled={isDisplay}
                subtitle="Loss of Pay"
                value={formData.lop === "Yes"}
                onToggle={(val) =>
                  setFormData({ ...formData, lop: val ? "Yes" : "No" })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                disabled={isDisplay}
                required
                title="Early Going *"
                type="str"
                prefixText="Minutes"
                inputValue={formData.earlyGoing}
                name="EarlyGoing"
                placeholder="e.g., 15"
                maxLength={10}
                onChange={(value) =>
                  setFormData({ ...formData, earlyGoing: value })
                }
              />

              <Input
                disabled={isDisplay}
                required
                title="Late Coming *"
                prefixText="Minutes"
                type="str"
                inputValue={formData.lateComing}
                name="LateComing"
                placeholder="e.g., 10"
                maxLength={10}
                onChange={(value) =>
                  setFormData({ ...formData, lateComing: value })
                }
              />
            </div>

            <ToggleField
              title="Night Shift *"
              disabled={isDisplay}
              subtitle="Is Night Shift"
              value={formData.isNight === "Yes"}
              onToggle={(val) =>
                setFormData({ ...formData, isNight: val ? "Yes" : "No" })
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

            {formData.type === "Per Hour" && (
              <div className="grid grid-cols-2 gap-3">
                <TimeInput
                  required={formData.type === "Per Hour"}
                  disabled={isDisplay}
                  title="Lunch Out Time"
                  value={formData.lunchOut}
                  onChange={(value) =>
                    setFormData({ ...formData, lunchOut: value })
                  }
                />

                <TimeInput
                  required={formData.type === "Per Hour"}
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
