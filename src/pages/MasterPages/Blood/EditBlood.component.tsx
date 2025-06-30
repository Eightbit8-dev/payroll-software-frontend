import { useEffect, useState } from "react";
import Input from "../../../components/common/Input";
import TextArea from "../../../components/common/Textarea";
import ButtonSm from "../../../components/common/Buttons";
import type { FormState } from "../../../types/appTypes";
import type { BloodDetails } from "../../../types/apiTypes";
import { useCreateBlood, useEditBlood } from "../../../queries/BloodQuery";

const BloodEdit = ({
  Blood,
  formState,
  setFormState,
  setBloodData,
}: {
  Blood: BloodDetails | null;
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  setBloodData: React.Dispatch<React.SetStateAction<BloodDetails | null>>;
}) => {
  const [formData, setFormData] = useState<BloodDetails>({
    id: 0,
    name: "",
    remarks: "",
  });

  const {
    mutate: createBlood,
    isPending: isCreating,
    isSuccess: isCreated,
  } = useCreateBlood();
  const {
    mutate: updateBlood,
    isPending: isUpdating,
    isSuccess: isUpdated,
  } = useEditBlood();

  // Set data on formState or prop change
  useEffect(() => {
    if (formState === "create") {
      setFormData({ id: 0, name: "", remarks: "" });
    } else if (Blood) {
      setFormData(Blood);
    }
  }, [formState, Blood]);

  // Reset form on success
  useEffect(() => {
    if (isCreated || isUpdated) {
      setFormState("create");
      setFormData({ id: 0, name: "", remarks: "" });
      setBloodData(null);
    }
  }, [isCreated, isUpdated]);

  const handleCancel = () => {
    setFormState("create");
    setFormData({ id: 0, name: "", remarks: "" });
    setBloodData(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState === "create") {
      createBlood(formData);
    }
  };

  const handleUpdate = () => {
    if (formState === "edit") {
      updateBlood(formData);
    }
  };

  const isDisplay = formState === "display";

  return (
    <main className="flex max-h-full w-full max-w-[870px] flex-col gap-2">
      <div className="designation-config-container flex flex-col gap-3 rounded-[20px]">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <header className="flex w-full flex-row items-center justify-between">
            <h1 className="text-start text-lg font-semibold text-zinc-800">
              {formState === "create"
                ? "Blood Group Configuration"
                : `${formData.name || "Blood Group"} Configuration`}
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
                  className="font-medium text-white"
                  text={isCreating ? "Creating..." : "Create"}
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
                  disabled={isUpdating || !formData.name || !formData.remarks}
                />
              )}
            </section>
          </header>

          <section className="flex w-full flex-col gap-2 overflow-clip px-3">
            <Input
              required
              disabled={isDisplay}
              title="Blood Group Name *"
              type="str"
              inputValue={formData.name}
              name="Blood"
              placeholder="Enter Blood Group name"
              maxLength={5}
              onChange={(value) => setFormData({ ...formData, name: value })}
            />
            <TextArea
              required
              disabled={isDisplay}
              title="Remarks"
              inputValue={formData.remarks}
              name="remarks"
              placeholder="Enter remarks"
              maxLength={300}
              onChange={(value) => setFormData({ ...formData, remarks: value })}
            />
          </section>
        </form>
      </div>
    </main>
  );
};

export default BloodEdit;
