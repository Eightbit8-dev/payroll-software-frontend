import { useEffect, useState } from "react";
import Input from "../../../components/common/Input";
import ButtonSm from "../../../components/common/Buttons";
import TextArea from "../../../components/common/Textarea";
import DropdownSelect from "../../../components/common/DropDown";
import type { FormState } from "../../../types/appTypes";
import type { HolidayDetails } from "../../../types/apiTypes";
import {
  useCreateHoliday,
  useEditHoliday,
  useFetchHolidayMonths,
  useFetchHolidayYears,
} from "../../../queries/HolidayQuery";

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
    branchIds: [],
    departmentIds: [],
    month: "",
    year: "",
    leaveType: "",
    remarks: "",
  };

  const [formData, setFormData] = useState<HolidayDetails>(emptyHoliday);

  const { data: months = [] } = useFetchHolidayMonths();
  const { data: years = [] } = useFetchHolidayYears();

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

  useEffect(() => {
    if (formState === "create") {
      setFormData(emptyHoliday);
    } else if (holidayDetails) {
      setFormData(holidayDetails);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState === "create") {
      createHoliday(formData);
    }
  };

  const handleUpdate = () => {
    if (formState === "edit") {
      updateHoliday(formData);
    }
  };

  const isDisplay = formState === "display";

  return (
    <main className="flex max-h-full w-full max-w-[870px] flex-col gap-2">
      <div className="holiday-config-container flex flex-col gap-3 rounded-[20px]">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <header className="flex w-full flex-row items-center justify-between">
            <h1 className="text-start text-lg font-semibold text-zinc-800">
              {formState === "create"
                ? "Holiday Configuration"
                : `${formData.name || "Holiday"} Configuration`}
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
                    !formData.month ||
                    !formData.year ||
                    !formData.leaveType ||
                    !formData.remarks
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
                  disabled={
                    isUpdating ||
                    !formData.name ||
                    !formData.month ||
                    !formData.year ||
                    !formData.leaveType ||
                    !formData.remarks
                  }
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
              <DropdownSelect
                title="Month *"
                disabled={isDisplay}
                options={months}
                selected={
                  months.find((m) => m.label === formData.month) || {
                    id: 0,
                    label: "Select Month",
                  }
                }
                onChange={(opt) =>
                  setFormData({ ...formData, month: opt.label })
                }
              />

              <DropdownSelect
                title="Year *"
                disabled={isDisplay}
                options={years}
                selected={
                  years.find((y) => y.label === formData.year) || {
                    id: 0,
                    label: "Select Year",
                  }
                }
                onChange={(opt) =>
                  setFormData({ ...formData, year: opt.label })
                }
              />
            </div>

            <Input
              required
              disabled={isDisplay}
              title="Leave Type *"
              type="str"
              inputValue={formData.leaveType}
              name="leaveType"
              placeholder="Optional, Earned, etc."
              onChange={(value) =>
                setFormData({ ...formData, leaveType: value })
              }
            />

            <TextArea
              required
              disabled={isDisplay}
              title="Remarks *"
              inputValue={formData.remarks}
              name="Remarks"
              placeholder="Enter description"
              maxLength={300}
              onChange={(value) =>
                setFormData({ ...formData, remarks: value })
              }
            />
          </section>
        </form>
      </div>
    </main>
  );
};

export default HolidayEdit;
