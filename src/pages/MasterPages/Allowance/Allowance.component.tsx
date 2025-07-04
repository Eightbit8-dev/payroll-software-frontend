import { useEffect, useState } from "react";
import Input from "../../../components/common/Input";
import ButtonSm from "../../../components/common/Buttons";
import type { FormState } from "../../../types/appTypes";
import type { AllowanceDetails } from "../../../types/apiTypes";
import TextArea from "../../../components/common/Textarea";
import DropdownSelect from "../../../components/common/DropDown";
import {
  useCreateAllowance,
  useEditAllowance,
  useFetchAllowanceTypes,
} from "../../../queries/AllowanceQuery";
import isEqual from "lodash.isequal";

const AllowanceEdit = ({
  allowanceDetails,
  formState,
  setFormState,
  setAllowanceData,
}: {
  allowanceDetails: AllowanceDetails | null;
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  setAllowanceData: React.Dispatch<
    React.SetStateAction<AllowanceDetails | null>
  >;
}) => {
  const { data: allowanceTypes } = useFetchAllowanceTypes();

  const emptyAllowance: AllowanceDetails = {
    id: 0,
    name: "",
    mastertypeId: 0,
    percent: 0,
    on: "",
    remarks: "",
  };

  const [formData, setFormData] = useState<AllowanceDetails>(emptyAllowance);
  const [selectedMasterType, setSelectedMasterType] = useState({
    id: 0,
    label: "Select type",
  });
  const [selectedOn, setSelectedOn] = useState({
    id: 0,
    label: "Select type",
  });
  const {
    mutate: createAllowance,
    isPending: isCreating,
    isSuccess: isCreated,
  } = useCreateAllowance();

  const {
    mutate: updateAllowance,
    isPending: isUpdating,
    isSuccess: isUpdated,
  } = useEditAllowance();

  useEffect(() => {
    if (formState === "create") {
      setFormData(emptyAllowance);
    } else if (allowanceDetails) {
      setFormData(allowanceDetails);
    }
  }, [formState, allowanceDetails]);

  useEffect(() => {
    if (
      (formState === "edit" || formState === "display") &&
      allowanceDetails &&
      allowanceTypes
    ) {
      const matched = allowanceTypes.find(
        (type) => type.id === allowanceDetails.mastertypeId,
      );
      const matchedOn =
        allowanceDetails.on === "Basic"
          ? { id: 1, label: "Basic" }
          : { id: 2, label: "CTA" };
      setSelectedMasterType(matched || { id: 0, label: "Select type" });
      setSelectedOn(matchedOn || { id: 0, label: "Select type" });
    }
  }, [formState, allowanceDetails, allowanceTypes]);

  useEffect(() => {
    if (isCreated || isUpdated) {
      setFormState("create");
      setFormData(emptyAllowance);
      setAllowanceData(emptyAllowance);
      setSelectedMasterType({ id: 0, label: "Select type" });
      setSelectedOn({ id: 0, label: "Select type" });
    }
  }, [isCreated, isUpdated]);

  const handleCancel = () => {
    setFormState("create");
    setFormData(emptyAllowance);
    setAllowanceData(emptyAllowance);
    setSelectedMasterType({ id: 0, label: "Select type" });
    setSelectedOn({ id: 0, label: "Select type" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState === "create") {
      createAllowance(formData);
      setSelectedMasterType({ id: 0, label: "Select type" });
      setSelectedMasterType({ id: 0, label: "Select type" });
      setSelectedOn({ id: 0, label: "Select type" });
    }
  };

  const handleUpdate = () => {
    if (formState === "edit") {
      updateAllowance(formData);
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
                ? "Allowance Configuration"
                : `${allowanceDetails!.name || "Allowance"} Configuration`}
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
                  text={isCreating ? "Creating..." : "Create New"}
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
                  disabled={
                    isUpdating ||
                    isEqual(formData, allowanceDetails)
                  }
                />
              )}
            </section>
          </header>

          <section className="flex w-full flex-col gap-2 px-3">
            <Input
              required
              disabled={isDisplay}
              title="Allowance Name *"
              type="str"
              inputValue={formData.name}
              name="Allowance"
              placeholder="Enter allowance name"
              maxLength={50}
              onChange={(value) => setFormData({ ...formData, name: value })}
            />

            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
              <Input
                required
                disabled={isDisplay}
                title="Percentage *"
                type="num"
                prefixText="%"
                inputValue={formData.percent}
                name="percent"
                placeholder="Enter allowance percentage"
                max={100}
                min={0}
                onChange={(value) =>
                  setFormData({ ...formData, percent: value })
                }
              />

              <DropdownSelect
                title="On *"
                disabled={isDisplay}
                options={[
                  { id: 1, label: "Basic" },
                  { id: 2, label: "CTA" },
                ]}
                selected={selectedOn}
                onChange={(opt) => {
                  setSelectedOn(opt);
                  setFormData({ ...formData, on: opt.label });
                }}
              />
            </div>

            <DropdownSelect
              title="Select Type *"
              disabled={isDisplay}
              options={allowanceTypes || []}
              selected={selectedMasterType}
              onChange={(opt) => {
                setSelectedMasterType(opt);
                setFormData({ ...formData, mastertypeId: opt.id });
              }}
            />

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

export default AllowanceEdit;
