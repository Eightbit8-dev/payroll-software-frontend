import { toast } from "react-toastify";
import ButtonSm from "../../../components/common/Buttons";
import type { PermissionDetails } from "../../../types/apiTypes";
import { useDeletePermission } from "../../../queries/PermissionQuery";
import { useEffect } from "react";

export const DeletePermissionDialogBox = ({
  setIsDeletePermissionDialogOpen,
  Permission,
  setPermissionData,
}: {
  setIsDeletePermissionDialogOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  Permission: PermissionDetails;
  setPermissionData: React.Dispatch<
    React.SetStateAction<PermissionDetails | null>
  >;
}) => {
  const {
    mutate: deletePermission,
    isPending: isDeletePermissionLoading,
    isSuccess,
  } = useDeletePermission();

  useEffect(() => {
    if (isSuccess) {
      setPermissionData({
        id: 0,
        name: "",
        mastertypeId: 0,
        mastertypeName: "Select permission type",
        startTime: "",
        endTime: "",
        remarks: "",
      } as PermissionDetails);
    }
  }, [isSuccess]);

  const handleDelete = (Permission: PermissionDetails) => {
    deletePermission(Permission);
  };

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("Deleted Permission Type " + JSON.stringify(":"));
        setIsDeletePermissionDialogOpen(false);
      }}
    >
      <header className="header flex w-full flex-row items-center justify-between text-lg font-medium text-red-600">
        Delete Permission Type
        <img
          onClick={() => setIsDeletePermissionDialogOpen(false)}
          className="w-5 cursor-pointer"
          src="/icons/close-icon.svg"
          alt="close"
        />
      </header>

      <p className="text-md font-medium text-zinc-700">
        Are you sure want to delete the Permission Type {Permission.name} ? This
        action is irreversible
      </p>

      <section className="mt-1 grid w-full grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
        <ButtonSm
          className="justify-center font-semibold"
          state="outline"
          text="Cancel"
          onClick={() => setIsDeletePermissionDialogOpen(false)}
        />
        <ButtonSm
          className="items-center justify-center bg-red-500 text-center text-white hover:bg-red-700 active:bg-red-500"
          state="default"
          onClick={() => {
            handleDelete(Permission);
            setIsDeletePermissionDialogOpen(false);
          }}
          text={isDeletePermissionLoading ? "Deleting..." : "Delete"}
        />
      </section>
    </form>
  );
};
