import { useEffect, useState } from "react";
import Input, { TimeInput } from "../../../components/common/Input";
import TextArea from "../../../components/common/Textarea";
import ButtonSm from "../../../components/common/Buttons";
import type { FormState } from "../../../types/appTypes";
import type { PermissionDetails } from "../../../types/apiTypes";
import {
  useCreatePermission,
  useEditPermission,
  useFetchPermissionTypes,
} from "../../../queries/PermissionQuery";
import isEqual from "lodash.isequal";
import DropdownSelect from "../../../components/common/DropDown";

const PermissionEdit = ({
  permission,
  formState,
  setFormState,
  setPermissionData,
}: {
  permission: PermissionDetails | null;
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  setPermissionData: React.Dispatch<
    React.SetStateAction<PermissionDetails | null>
  >;
}) => {
  const emptyPermission: PermissionDetails = {
    id: 0,
    name: "",
    mastertypeId: 0,
    mastertypeName: "Select permission type",
    startTime: "",
    endTime: "",
    remarks: "",
  };

  const [formData, setFormData] = useState<PermissionDetails>(emptyPermission);
  const { data: permissionTypes } = useFetchPermissionTypes();
  const [selectedOption, setSelectedOption] = useState({
    id: 0,
    label: "Select permission type",
  });

  const {
    mutate: createPermission,
    isPending: isCreating,
    isSuccess: isCreated,
  } = useCreatePermission();
  const {
    mutate: updatePermission,
    isPending: isUpdating,
    isSuccess: isUpdated,
  } = useEditPermission();

  // Set data on formState or prop change
  useEffect(() => {
    if (formState === "create") {
      setFormData(emptyPermission);
    } else if (permission) {
      setFormData(permission);
    }
  }, [formState, permission]);

  // Reset form on success
  useEffect(() => {
    if (isCreated || isUpdated) {
      setFormState("create");
      setFormData(emptyPermission);
      setPermissionData(null);
      setSelectedOption({ id: 0, label: "Select permission type" });
    }
  }, [isCreated, isUpdated]);

  useEffect(() => {
    if (
      (formState === "edit" || formState === "display") &&
      permission &&
      permissionTypes
    ) {
      const matched = permissionTypes.find(
        (type) => type.id === permission.mastertypeId,
      );
      if (matched) {
        setSelectedOption(matched);
      } else {
        setSelectedOption({ id: 0, label: "Select type" });
      }
    }
  }, [formState, permission, permissionTypes]);

  const handleCancel = () => {
    setFormState("create");
    setFormData(emptyPermission);
    setSelectedOption({ id: 0, label: "Select permission type" });
    setPermissionData(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState === "create") {
      createPermission(formData);
      setFormData(emptyPermission);
      setSelectedOption({ id: 0, label: "Select permission type" });
    }
  };

  const handleUpdate = () => {
    if (formState === "edit") {
      updatePermission(formData);
      setFormData(emptyPermission);
    }
  };

  const isDisplay = formState === "display";

  return (
    <main className="flex max-h-full w-full max-w-[870px] flex-col gap-2">
      <div className="permission-config-container flex flex-col gap-3 rounded-[20px]">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <header className="flex w-full flex-row items-center justify-between">
            <h1 className="text-start text-lg font-semibold text-zinc-800">
              {formState === "create"
                ? "Permission Type Configuration"
                : `${formData.name || "Permission Type"} Configuration`}
            </h1>

            <section className="ml-auto flex flex-row items-center gap-3">
              {(formState === "edit" ||
                (formState === "create" &&
                  (formData.name ||
                    formData.mastertypeId ||
                    formData.startTime ||
                    formData.endTime ||
                    formData.remarks))) && (
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
                  className="font-medium text-white disabled:opacity-60"
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
                    isUpdating || isEqual(formData, permission)
                  }
                />
              )}
            </section>
          </header>

          <section className="flex w-full flex-col gap-2 overflow-clip px-3">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
              <Input
                required
                disabled={isDisplay}
                title="Permission Name *"
                type="str"
                inputValue={formData.name}
                name="Permission"
                placeholder="Enter Permission name"
                maxLength={50}
                onChange={(value) => setFormData({ ...formData, name: value })}
              />
              <DropdownSelect
                title="Select Type *"
                disabled={isDisplay}
                options={permissionTypes || []}
                selected={selectedOption}
                onChange={(opt) => {
                  setSelectedOption(opt);
                  setFormData({ ...formData, mastertypeId: opt.id });
                }}
              />
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
              <TimeInput
                required
                disabled={isDisplay}
                title="Start Time *"
                value={formData.startTime}
                onChange={(value) =>
                  setFormData({ ...formData, startTime: value })
                }
              />
              <TimeInput
                required
                disabled={isDisplay}
                title="End Time *"
                value={formData.endTime}
                onChange={(value) =>
                  setFormData({ ...formData, endTime: value })
                }
              />
            </div>

            <TextArea
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

export default PermissionEdit;
