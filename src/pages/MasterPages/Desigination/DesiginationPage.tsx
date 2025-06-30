import ButtonSm from "../../../components/common/Buttons";
import DesignationEdit from "./EditDesigination.component";
import PageHeader from "../../../components/masterPage.components/PageHeader";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import DialogBox from "../../../components/common/DialogBox";
import { DeleteDesignationDialogBox } from "./DeleteDesiginationDialogBox";
import { useFetchDesignations } from "../../../queries/DesiginationQuery";
import MasterPagesSkeleton from "../../../components/masterPage.components/LoadingSkeleton";
import ErrorComponent from "../../../components/common/Error";
import type { FormState } from "../../../types/appTypes";
import type { DesignationsDetails } from "../../../types/apiTypes";

const DesignationsPage = () => {
  const [isDeleteDesignationDialogOpen, setIsDeleteDesignationDialogOpen] =
    useState(false);

  const [designation, setDesignation] = useState<DesignationsDetails>({
    id: 0,
    name: "",
    remarks: "",
    code: "",
  });

  const [formState, setFormState] = useState<FormState>("create");

  const { data: designations, isLoading, isError } = useFetchDesignations();

  const handleDesignationDeleted = () => {
    setDesignation({
      id: 0,
      name: "",
      remarks: "",
      code: "",
    });
    setFormState("create");
  };

  if (isLoading) return <MasterPagesSkeleton />;
  if (isError) return <ErrorComponent />;

  return (
    <main className="flex w-full max-w-full flex-col gap-4 md:flex-row">
      <AnimatePresence>
        {isDeleteDesignationDialogOpen && (
          <DialogBox setToggleDialogueBox={setIsDeleteDesignationDialogOpen}>
            <DeleteDesignationDialogBox
              setIsDeleteDesignationDialogOpen={
                setIsDeleteDesignationDialogOpen
              }
              Designation={designation}
              onDeleted={handleDesignationDeleted}
            />
          </DialogBox>
        )}
      </AnimatePresence>

      {/* Left Table */}
      <section className="table-container flex w-full flex-col gap-3 rounded-[12px] bg-white/80 p-4 shadow-sm md:w-[50%]">
        <header className="flex h-max flex-row items-center justify-between">
          <PageHeader title="Designation Configuration" />
        </header>

        <div className="tables flex w-full flex-col overflow-clip rounded-[9px]">
          <header className="header flex w-full flex-row items-center gap-2 bg-gray-200 px-3">
            <p className="w-max min-w-[100px] px-2 py-4 text-start text-sm font-semibold text-zinc-900">
              S.No
            </p>
            <p className="w-full text-start text-sm font-semibold text-zinc-900">
              Name
            </p>
            <p className="w-full text-start text-sm font-semibold text-zinc-900">
              Remarks
            </p>
            <p className="min-w-[120px] text-start text-sm font-semibold text-zinc-900">
              Action
            </p>
          </header>

          {designations?.length === 0 && (
            <h2 className="text-md my-3 text-center font-medium text-zinc-600">
              No Designations Found
            </h2>
          )}
          {designations?.map((item: DesignationsDetails, index) => (
            <div
              key={item.id}
              className={`cell-1 flex w-full cursor-pointer flex-row items-center gap-2 px-3 py-2 text-zinc-700 ${
                designation?.id === item.id
                  ? "bg-blue-100 font-semibold text-blue-800"
                  : index % 2 === 0
                    ? "bg-white"
                    : "bg-slate-50"
              } hover:bg-slate-100 active:bg-slate-200`}
              onClick={(e) => {
                e.stopPropagation();
                if (designation?.id === item.id && formState !== "edit") return;
                setFormState("display");
                setDesignation({ ...item });
              }}
            >
              <p className="w-max min-w-[100px] px-2 py-4 text-start text-sm font-medium">
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
                    formState === "edit" && designation?.id === item.id
                      ? "!hover:!bg-blue-500 !hover:!text-black !active:!bg-blue-600 !bg-blue-500 !text-white"
                      : "bg-white"
                  }`}
                  state="outline"
                  text="Edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFormState("edit");
                    setDesignation({ ...item });
                  }}
                />
                <ButtonSm
                  className="bg-red-100 text-red-500 outline-1 outline-red-500 hover:bg-red-100 hover:text-red-500 active:bg-red-100 active:text-red-500"
                  state="default"
                  text="Delete"
                  onClick={() => {
                    setDesignation(item);
                    setIsDeleteDesignationDialogOpen(true);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Right Form */}
      <section className="table-container max-h-full w-full flex-col gap-3 rounded-[12px] bg-white/80 p-4 shadow-sm md:w-[50%]">
        <DesignationEdit
          DesignationDetails={designation}
          formState={formState}
          setFormState={setFormState}
          setDesignation={setDesignation}
        />
      </section>
    </main>
  );
};

export default DesignationsPage;
