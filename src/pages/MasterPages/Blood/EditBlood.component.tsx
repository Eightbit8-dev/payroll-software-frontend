import { useEffect, useState } from "react";
import Input from "../../../components/common/Input";
import TextArea from "../../../components/common/Textarea";
import ButtonSm from "../../../components/common/Buttons";
import type { FormState } from "../../../types/appTypes";
import type { BloodDetails } from "../../../types/apiTypes";
import { useCreateBlood ,useEditBlood } from "../../../queries/BloodQuery";

const BloodEdit = ({
  Blood,
  formState,
  setFormState,
}: {
  Blood: BloodDetails | null;
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
}) => {
  const [bloodData, setBloodData] = useState<BloodDetails | null>(null);

  const { mutate: createResignation, isPending, isSuccess } = useCreateBlood();
  const {
    mutate: updateResignation,
    isPending: isUpdatePending,
    isSuccess: isUpdatingSuccess,
  } = useEditBlood();

  // Handle form state change
  useEffect(() => {
    if (formState === "create") {
      setBloodData({
        id: 0,
        name: "",
        remarks: "",
      });
    } else if (Blood) {
      setBloodData(Blood);
    }
  }, [Blood, formState]);

  // Handle success
  useEffect(() => {
    if (isSuccess) {
      setFormState("create");
      setBloodData({
        id: 0,
        name: "",
        remarks: "",
      });
    } else if (isUpdatingSuccess) {
      setFormState("display");
    }
  }, [isSuccess, isUpdatingSuccess]);

  const handleCancel = () => {
    setFormState("create");
    setBloodData({
      id: 0,
      name: "",
      remarks: "",
    });
  };

  if (!bloodData) {
    return (
      <p className="text-center text-sm text-gray-500">
        Select a Blood Group to view details.
      </p>
    );
  }

  const hasData = bloodData.name || bloodData.remarks;

  return (
    <main className="flex max-h-full w-full max-w-[870px] flex-col gap-2">
      <div className="designation-config-container flex flex-col gap-3 rounded-[20px] bg-white/80">
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (formState === "create") {
              createResignation(bloodData);
            }
          }}
        >
          <header className="flex w-full flex-row items-center justify-between">
            <h1 className="text-start text-lg font-semibold text-zinc-800">
              {formState === "create"
                ? "Blood Group Configuration"
                : `${bloodData.name || "Blood Group"} Configuration`}
            </h1>
            <section className="ml-auto flex flex-row items-center gap-3">
              {(formState === "edit" || (formState === "create" && hasData)) && (
                <ButtonSm
                  className="font-medium"
                  text="Cancel"
                  state="outline"
                  type="button"
                  onClick={handleCancel}
                />
              )}

              {formState === "display" && bloodData.id !== 0 && (
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
                  text={isPending ? "Creating..." : "Create"}
                  state="default"
                  type="submit"
                  disabled={isPending}
                />
              )}

              {formState === "edit" && (
                <ButtonSm
                  className="font-medium text-white"
                  text={isUpdatePending ? "Updating..." : "Save Changes"}
                  state="default"
                  onClick={() => updateResignation(bloodData)}
                />
              )}
            </section>
          </header>

          {/* Resignation Details */}
          <section className="flex w-full flex-col gap-2 overflow-clip px-3">
            <Input
              required
              disabled={formState === "display"}
              title="Blood Group Name *"
              type="str"
              inputValue={bloodData.name}
              name="Blood"
              placeholder="Enter Blood Group name"
              maxLength={50}
              onChange={(value) =>
                setBloodData({ ...bloodData, name: value })
              }
            />
            <TextArea
              disabled={formState === "display"}
              title="Remarks"
              inputValue={bloodData.remarks}
              name="remarks"
              placeholder="Enter remarks"
              maxLength={300}
              onChange={(value) =>
                setBloodData({ ...bloodData, remarks: value })
              }
            />
          </section>
        </form>
      </div>
    </main>
  );
};

export default BloodEdit;
