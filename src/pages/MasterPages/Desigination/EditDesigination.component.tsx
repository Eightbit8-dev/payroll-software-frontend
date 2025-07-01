import { useEffect, useState } from "react";
import Input from "../../../components/common/Input";
import TextArea from "../../../components/common/Textarea";
import ButtonSm from "../../../components/common/Buttons";
import type { FormState } from "../../../types/appTypes";
import type { DesignationsDetails } from "../../../types/apiTypes";
import {
  useCreateDesignation,
  useEditDesignation,
} from "../../../queries/DesiginationQuery";

const DesignationEdit = ({
  DesignationDetails,
  formState,
  setFormState,
  setDesignation,
}: {
  DesignationDetails: DesignationsDetails | null;
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  setDesignation: React.Dispatch<React.SetStateAction<DesignationsDetails>>;
}) => {
  const [designationData, setDesignationData] =
    useState<DesignationsDetails | null>(null);

  const {
    mutate: createDesignation,
    isPending,
    isSuccess,
  } = useCreateDesignation();

  const {
    mutate: updateDesignation,
    isPending: isUpdatePending,
    isSuccess: isUpdatingSuccess,
  } = useEditDesignation();

  const disableButton =
    DesignationDetails?.name === designationData?.name &&
    DesignationDetails?.remarks === designationData?.remarks;

  useEffect(() => {
    if (formState === "create") {
      const newData = { id: 0, name: "", remarks: "", code: "" };
      setDesignationData(newData);
    } else if (DesignationDetails) {
      setDesignationData(DesignationDetails);
    }
  }, [DesignationDetails, formState]);

  useEffect(() => {
    if (isSuccess) {
      const resetData = { id: 0, name: "", remarks: "", code: "" };
      setFormState("create");
      setDesignation(resetData);
      setDesignationData(resetData);
    } else if (isUpdatingSuccess && designationData) {
      setFormState("create");
      setDesignation(designationData);
    }
  }, [isSuccess, isUpdatingSuccess]);

  const handleCancel = () => {
    setFormState("create");
    const resetData = { id: 0, name: "", remarks: "", code: "" };
    setDesignation(resetData);
    setDesignationData(resetData);
  };

  if (!designationData) {
    return (
      <p className="text-center text-sm text-gray-500">
        Select a designation to view details.
      </p>
    );
  }

  const hasData = designationData.name || designationData.remarks;

  return (
    <main className="flex max-h-full w-full max-w-[870px] flex-col gap-2">
      <div className="designation-config-container flex flex-col gap-3 rounded-[20px]">
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (formState === "create" && designationData) {
              createDesignation(designationData);
            }
          }}
        >
          <header className="flex w-full flex-row items-center justify-between">
            <h1 className="text-start text-lg font-semibold text-zinc-800">
              {formState === "create"
                ? "Designation Configuration"
                : `${DesignationDetails?.name} Configuration`}
            </h1>
            <section className="ml-auto flex flex-row items-center gap-3">
              {(formState === "edit" ||
                (formState === "create" && hasData)) && (
                <ButtonSm
                  className="font-medium"
                  text="Cancel"
                  state="outline"
                  type="button"
                  onClick={handleCancel}
                />
              )}

              {formState === "display" && designationData.id !== 0 && (
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
                  text={isPending ? "Creating..." : "Create New"}
                  state="default"
                  type="submit"
                  disabled={isPending}
                />
              )}

              {formState === "edit" && (
                <ButtonSm
                  className="font-medium text-white disabled:opacity-50"
                  text={isUpdatePending ? "Updating..." : "Save Changes"}
                  state="default"
                  type="button"
                  disabled={disableButton || isUpdatePending}
                  onClick={() => {
                    if (designationData) {
                      updateDesignation(designationData);
                    }
                  }}
                />
              )}
            </section>
          </header>

          {/* Designation Details */}
          <section className="flex w-full flex-col gap-2 overflow-clip px-3">
            <Input
              required
              disabled={formState === "display"}
              title="Designation Name *"
              type="str"
              inputValue={designationData.name}
              name="designation"
              placeholder="Enter designation name"
              maxLength={50}
              onChange={(value) =>
                setDesignationData({ ...designationData, name: value })
              }
            />
            <TextArea
              disabled={formState === "display"}
              title="Remarks"
              inputValue={designationData.remarks}
              name="remarks"
              placeholder="Enter remarks"
              maxLength={300}
              onChange={(value) =>
                setDesignationData({ ...designationData, remarks: value })
              }
            />
          </section>
        </form>
      </div>
    </main>
  );
};

export default DesignationEdit;
