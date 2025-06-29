import { useEffect, useState } from "react";
import Input from "../../../components/common/Input";
import TextArea from "../../../components/common/Textarea";
import ButtonSm from "../../../components/common/Buttons";
import type { FormState } from "../../../types/appTypes";
import type { ResignationDetails } from "../../../types/apiTypes";
import {
  useCreateResignation,
  useEditResignation,
} from "../../../queries/ResiginationQuery";

const ResignationEdit = ({
  Resignation,
  formState,
  setFormState,
  setResignation, // ✅ NEW PROP
}: {
  Resignation: ResignationDetails | null;
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  setResignation: React.Dispatch<React.SetStateAction<ResignationDetails | null>>; // ✅ Declare type
}) => {
  const [resignationData, setResignationData] = useState<ResignationDetails | null>(null);
  const [title, setTitle] = useState("");

  const { mutate: createResignation, isPending, isSuccess } = useCreateResignation();
  const {
    mutate: updateResignation,
    isPending: isUpdatePending,
    isSuccess: isUpdatingSuccess,
  } = useEditResignation();

  // On form mode or data change
  useEffect(() => {
    if (formState === "create") {
      const reset = { id: 0, name: "", remarks: "" };
      setResignationData(reset);
      setTitle("");
    } else if (Resignation) {
      setResignationData(Resignation);
      setTitle(Resignation.name); // Lock title on first load
    }
  }, [Resignation, formState]);

  // On success update title if updated
  useEffect(() => {
    if (isSuccess) {
      const reset = { id: 0, name: "", remarks: "" };
      setResignationData(reset);
      setFormState("create");
      setTitle("");
    } else if (isUpdatingSuccess && resignationData) {
      setFormState("display");
      setResignation(resignationData); // ✅ UPDATE PARENT
      setTitle(resignationData.name); // Update title after save
    }
  }, [isSuccess, isUpdatingSuccess]);

  const handleCancel = () => {
    const reset = { id: 0, name: "", remarks: "" };
    setResignationData(reset);
    setFormState("create");
    setTitle("");
  };

  if (!resignationData) {
    return (
      <p className="text-center text-sm text-gray-500">
        Select a resignation to view details.
      </p>
    );
  }

  const hasData = resignationData.name || resignationData.remarks;

  return (
    <main className="flex max-h-full w-full max-w-[870px] flex-col gap-2">
      <div className="designation-config-container flex flex-col gap-3 rounded-[20px] bg-white/80">
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (formState === "create") {
              createResignation(resignationData);
            }
          }}
        >
          <header className="flex w-full flex-row items-center justify-between">
            <h1 className="text-start text-lg font-semibold text-zinc-800">
              {formState === "create"
                ? "Resignation Configuration"
                : `${title || "Resignation"} Configuration`}
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

              {formState === "display" && resignationData.id !== 0 && (
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
                  type="button"
                  onClick={() => updateResignation(resignationData)}
                />
              )}
            </section>
          </header>

          {/* Resignation Details */}
          <section className="flex w-full flex-col gap-2 overflow-clip px-3">
            <Input
              required
              disabled={formState === "display"}
              title="Resignation Name *"
              type="str"
              inputValue={resignationData.name}
              name="resignation"
              placeholder="Enter resignation name"
              maxLength={50}
              onChange={(value) =>
                setResignationData({ ...resignationData, name: value })
              }
            />
            <TextArea
              disabled={formState === "display"}
              title="Remarks"
              inputValue={resignationData.remarks}
              name="remarks"
              placeholder="Enter remarks"
              maxLength={300}
              onChange={(value) =>
                setResignationData({ ...resignationData, remarks: value })
              }
            />
          </section>
        </form>
      </div>
    </main>
  );
};

export default ResignationEdit;
