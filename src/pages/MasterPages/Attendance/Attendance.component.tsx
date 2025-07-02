import { useEffect, useState } from "react";
import Input from "../../../components/common/Input";
import ButtonSm from "../../../components/common/Buttons";
import type { FormState } from "../../../types/appTypes";
import type { AttendanceDetails } from "../../../types/apiTypes";
import TextArea from "../../../components/common/Textarea";
import DropdownSelect from "../../../components/common/DropDown";
import ToggleField from "../../../components/common/ToggleField";
import {
  useCreateAttendance,
  useEditAttendance,
  useFetchAttendancesTypes,
} from "../../../queries/AttendanceQuery";
import isEqual from "lodash.isequal";

const AttendanceEdit = ({
  attendanceDetails,
  formState,
  setFormState,
  setAttendanceData,
}: {
  attendanceDetails: AttendanceDetails | null;
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  setAttendanceData: React.Dispatch<
    React.SetStateAction<AttendanceDetails | null>
  >;
}) => {
  // Get the details for the dropDown
  const { data: attendanceTypes } = useFetchAttendancesTypes();

  const emptyAttendance: AttendanceDetails = {
    id: 0,
    name: "",
    code: "",
    mastertypeId: 0,
    remarks: "",
    carryForward: false,
    factor: 0,
  };
  const [formData, setFormData] = useState<AttendanceDetails>(emptyAttendance);
  const [selectedOption, setSelectedOption] = useState({
    id: 0,
    label: "Select type",
  });

  const {
    mutate: createAttendanceType,
    isPending: isCreating,
    isSuccess: isCreated,
  } = useCreateAttendance();
  const {
    mutate: updateAttendanceType,
    isPending: isUpdating,
    isSuccess: isUpdated,
  } = useEditAttendance();

  // Set data on formState or prop change
  useEffect(() => {
    if (formState === "create") {
      setFormData(emptyAttendance);
    } else if (attendanceDetails) {
      setFormData(attendanceDetails);
    }
  }, [formState, attendanceDetails]);

  //for chaning the dropDown value when changed from main page prop
  useEffect(() => {
    if (
      (formState === "edit" || formState === "display") &&
      attendanceDetails &&
      attendanceTypes
    ) {
      const matched = attendanceTypes.find(
        (type) => type.id === attendanceDetails.mastertypeId,
      );
      if (matched) {
        setSelectedOption(matched);
      } else {
        setSelectedOption({ id: 0, label: "Select type" });
      }
    }
  }, [formState, attendanceDetails, attendanceTypes]);

  // Reset form on success
  useEffect(() => {
    if (isCreated || isUpdated) {
      setFormState("create");
      setFormData(emptyAttendance);
      setAttendanceData(null);
    }
  }, [isCreated, isUpdated]);

  const handleCancel = () => {
    setFormState("create");
    setFormData(emptyAttendance);
    setSelectedOption({ id: 0, label: "Select type" });
    setAttendanceData(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState === "create") {
      createAttendanceType(formData);
    }
  };

  const handleUpdate = () => {
    if (formState === "edit") {
      updateAttendanceType(formData);
    setSelectedOption({ id: 0, label: "Select type" });
    }
  };

  const isDisplay = formState === "display";

  return (
    <main className="flex max-h-full w-full max-w-[870px] flex-col gap-2">
      <div className="department-config-container flex flex-col gap-3 rounded-[20px]">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <header className="flex w-full flex-row items-center justify-between">
            <h1 className="text-start text-lg font-semibold text-zinc-800">
              {formState === "create"
                ? "Attendance type Configuration"
                : `${attendanceDetails?.name || "Attendance"} Configuration`}
            </h1>

            <section className="ml-auto flex flex-row items-center gap-3">
              {(formState === "edit" ||
                (formState === "create" &&
                  (formData.name || formData.remarks))) && (
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
                  text={isCreating ? "Creating..." : "Create new "}
                  state="default"
                  type="submit"
                />
              )}

              {formState === "edit" && (
                <ButtonSm
                  className="font-medium text-white disabled:opacity-50"
                  text={isUpdating ? "Updating..." : "Save Changes"}
                  state="default"
                  type="button"
                  onClick={handleUpdate}
                  disabled={isUpdating || isEqual(formData, attendanceDetails)}
                />
              )}
            </section>
          </header>

          <section className="flex w-full flex-col gap-2 px-3">
            <Input
              required
              disabled={isDisplay}
              title="Type Name *"
              type="str"
              inputValue={formData.name}
              name="Attendance"
              placeholder="Enter attendance type name"
              maxLength={50}
              onChange={(value) => setFormData({ ...formData, name: value })}
            />

            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
              <Input
                required
                disabled={isDisplay}
                title="Code *"
                type="str"
                inputValue={formData.code}
                name="attendance code"
                placeholder="Enter attendance type code"
                maxLength={10}
                onChange={(value) => setFormData({ ...formData, code: value })}
              />
              <Input
                required
                disabled={isDisplay}
                title="Factor *"
                type="num"
                inputValue={formData.factor}
                name="factor"
                placeholder="Factor ranging from 0 to 1"
                min={0}
                max={1}
                onChange={(value) =>
                  setFormData({ ...formData, factor: value })
                }
              />
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
              <DropdownSelect
                title="Select Type *"
                disabled={isDisplay}
                options={attendanceTypes || []}
                selected={selectedOption}
                onChange={(opt) => {
                  setSelectedOption(opt);
                  setFormData({ ...formData, mastertypeId: opt.id });
                }}
              />

              <ToggleField
                title="Required *"
                disabled={isDisplay}
                subtitle="Carry forward"
                value={formData.carryForward}
                onToggle={(val) =>
                  setFormData({ ...formData, carryForward: val })
                }
              />
            </div>
            <TextArea
              disabled={isDisplay}
              title="Remarks"
              inputValue={formData.remarks}
              name="Remarks"
              placeholder="Enter description"
              maxLength={300}
              onChange={(value) => setFormData({ ...formData, remarks: value })}
            />
          </section>
        </form>

      </div>
    </main>
  );
};

export default AttendanceEdit;
