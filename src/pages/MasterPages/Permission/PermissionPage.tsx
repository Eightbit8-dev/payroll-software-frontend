import ButtonSm from "../../../components/common/Buttons";

import PageHeader from "../../../components/masterPage.components/PageHeader";
import { AnimatePresence } from "motion/react";
import { useState } from "react";

import MasterPagesSkeleton from "../../../components/masterPage.components/LoadingSkeleton";
import ErrorComponent from "../../../components/common/Error";
import type { FormState } from "../../../types/appTypes";
import type { PermissionDetails } from "../../../types/apiTypes";
import { useFetchPermissions } from "../../../queries/PermissionQuery";
import DialogBox from "../../../components/common/DialogBox";
import { DeletePermissionDialogBox } from "./PerissionDeleteDialog";
import PermissionEdit from "./Permisson.component";

const PermissionPage = () => {
  const [isDeletePermissionDialogOpen, setIsDeletePermissionDialogOpen] =
    useState(false);
  const [permission, setPermission] = useState<PermissionDetails | null>(null);
  const [formState, setFormState] = useState<FormState>("create");

  const { data: permissions, isLoading, isError } = useFetchPermissions();

  if (isLoading) return <MasterPagesSkeleton />;
  if (isError) return <ErrorComponent />;

  const handleRowClick = (item: PermissionDetails) => {
    setPermission({
      id: item.id,
      name: item.name,
      mastertypeId: item.mastertypeId,
      startTime: item.startTime,
      endTime: item.endTime,
      remarks: item.remarks || "",
    });
    setFormState("display");
  };

  const handleEdit = (item: PermissionDetails) => {
    setPermission({
      id: item.id,
      name: item.name,
      mastertypeId: item.mastertypeId,
      startTime: item.startTime,
      endTime: item.endTime,
      remarks: item.remarks || "",
    });
    setFormState("edit");
  };

  const handleDelete = (item: PermissionDetails) => {
    setPermission(item);
    setIsDeletePermissionDialogOpen(true);
  };

  return (
    <main className="flex w-full max-w-full flex-col gap-4 md:flex-row">
      <AnimatePresence>
        {isDeletePermissionDialogOpen && permission && (
          <DialogBox setToggleDialogueBox={setIsDeletePermissionDialogOpen}>
            <DeletePermissionDialogBox
              setIsDeletePermissionDialogOpen={setIsDeletePermissionDialogOpen}
              Permission={permission}
              setPermissionData={setPermission}
            />
          </DialogBox>
        )}
      </AnimatePresence>

      {/* Left Table Section */}
      <section className="table-container flex w-full flex-col gap-3 rounded-[12px] bg-white/80 p-4 shadow-sm md:w-[50%]">
        <header className="flex h-max flex-row items-center justify-between">
          <PageHeader title="Permission Type Configuration" />
        </header>

        <div className="tables flex w-full flex-col overflow-clip rounded-[9px]">
          {/* Table Header */}
          <header className="header flex w-full flex-row items-center gap-2 bg-gray-200 px-3">
            <p className="w-max min-w-[60px] px-2 py-4 text-start text-sm font-semibold text-zinc-900">
              S.No
            </p>
            <p className="w-full text-start text-sm font-semibold text-zinc-900">
              Name
            </p>
            <p className="w-full text-start text-sm font-semibold text-zinc-900">
              Type
            </p>

            <p className="min-w-[120px] text-start text-sm font-semibold text-zinc-900">
              Action
            </p>
          </header>

          {/* No Data */}
          {permissions?.length === 0 && (
            <h2 className="text-md my-3 text-center font-medium text-zinc-600">
              No Permission Type Found
            </h2>
          )}

          {/* Table Rows */}
          {permissions?.map((item: PermissionDetails, index) => {
            const isSelected = permission?.id === item.id;
            return (
              <div
                key={item.id}
                className={`cell-1 flex w-full cursor-pointer flex-row items-center gap-2 px-3 py-2 text-zinc-700 ${
                  isSelected
                    ? "bg-gray-100"
                    : index % 2 === 0
                      ? "bg-white"
                      : "bg-slate-50"
                } hover:bg-slate-100 active:bg-slate-200`}
                onClick={() => handleRowClick(item)}
              >
                <p className="w-max min-w-[60px] px-2 py-4 text-start text-sm font-medium">
                  {index + 1}
                </p>
                <p className="w-full text-start text-sm font-medium">
                  {item.name}
                </p>

                <p className="w-full text-start text-sm font-medium">
                  {item.remarks}
                </p>

                <div className="flex min-w-[120px] flex-row gap-2 text-start text-sm font-medium">
                  <ButtonSm
                    className={`${
                      formState === "edit" && isSelected
                        ? "!hover:!bg-blue-600 !active:!bg-blue-700 !bg-blue-500 !text-white"
                        : "bg-white"
                    }`}
                    state="outline"
                    text="Edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(item);
                    }}
                  />
                  <ButtonSm
                    className="bg-red-100 text-red-500 outline-1 outline-red-500 hover:bg-red-100 hover:text-red-500 active:bg-red-100 active:text-red-500"
                    state="default"
                    text="Delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Right Edit/Create Form Section */}
      <section className="table-container max-h-full w-full flex-col gap-3 rounded-[12px] bg-white/80 p-4 shadow-sm md:w-[50%]">
        <PermissionEdit
          permission={permission}
          formState={formState}
          setFormState={setFormState}
          setPermissionData={setPermission}
        />
      </section>
    </main>
  );
};

export default PermissionPage;
