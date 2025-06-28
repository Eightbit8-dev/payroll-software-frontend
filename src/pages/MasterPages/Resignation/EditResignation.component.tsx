import { useEffect, useState } from "react";
import Input from "../../../components/common/Input";
import ButtonSm from "../../../components/common/Buttons";
import type { FormState } from "../../../types/appTypes";
import { useCreateResignation, useEditResignation } from "../../../queries/ResiginationQuery"
import type {  ResignationDetails } from "../../../types/apiTypes";
import { AnimatePresence, motion } from "framer-motion";
import TextArea from "../../../components/common/Textarea";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const ResignationEdit = ({
  Resignation,
  formState,
  setFormState,
}: {
  Resignation: ResignationDetails | null; //null so that user can create new Resignation if the state is create
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
}) => {


  const [ResignationData, setResignationData] = useState<ResignationDetails | null>(null); //Original Resignation data passed from above
  const [newResignationData, setNewResignationData] = useState<ResignationDetails | null>(
    null,
  ); //Local copy to reset if cancel is clicked

  const { mutate: createResignation, isPending, isSuccess } = useCreateResignation();
  const {
    mutate: updateResignation,
    isPending: isUpdatePending,
    isSuccess: isUpdatingSuccess,
  } = useEditResignation();

  useEffect(() => {
    if (Resignation) {
      setResignationData(Resignation);
      setNewResignationData(Resignation);
    }
  }, [Resignation]);

  useEffect(() => {
    if (isSuccess) {
      setResignationData(newResignationData);
      setFormState("display");
    }
  }, [isSuccess]); //cleaning after sumission

  useEffect(() => {
    if (isUpdatingSuccess) {
      setResignationData(newResignationData);
      setFormState("display");
    }
  }, [isUpdatingSuccess]); //.cleanign after user updates



  if (!ResignationData || !newResignationData) {
    return (
      <p className="text-md my-1 self-center-safe text-center text-gray-600">
        Select a Resignation to view details.
      </p>
    );
  }

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`flex max-h-full w-full max-w-[870px] flex-col gap-2`}
    >
      {/* Designation Configuration container */}
      <motion.div
        variants={containerVariants}
        className="Designation-config-container flex flex-col gap-3 rounded-[20px] bg-white/80"
      >
        <header className="header flex w-full flex-row items-center justify-between">
          <h1 className="my-1 text-start text-lg font-semibold text-zinc-800">
            {ResignationData.name} Configuration
          </h1>
          <AnimatePresence mode="wait">
            {formState === "create" && (
              <ButtonSm
                className="font-semibold text-white disabled:opacity-60"
                state="default"
                text={isPending ? "Creating..." : "Create new Resignation"}
                disabled={
                  isPending ||
                  newResignationData.name === "" 
                }
                onClick={() => {
                  createResignation(newResignationData);
                }}
              />
            )}
          </AnimatePresence>
          {/* //To check if the data has changeg */}
          {JSON.stringify(newResignationData) !== JSON.stringify(ResignationData) &&
            formState !== "create" && (
              <section className="ml-auto flex flex-row items-center gap-3">
                {formState === "edit" && (
                  <>
                    <ButtonSm
                      className="font-medium"
                      text="Cancel"
                      state="outline"
                      onClick={() => {
                        setFormState("display");
                        setNewResignationData(ResignationData);
                      }}
                    />
                    <ButtonSm
                      className="font-medium text-white"
                      text={isUpdatePending ? "Updating..." : "Save Changes"}
                      state="default"
                      onClick={() => updateResignation(newResignationData)}
                    />
                  </>
                )}
              </section>
            )}
        </header>

        {/* Designation Details */}
        <section className="Designation-details-section flex max-h-full w-full flex-col gap-2 overflow-clip px-3">
          <Input
            disabled={formState === "display"}
            title="Designation Name *"
            type="str"
            inputValue={newResignationData.name}
            name="Designation"
            placeholder="Enter Designation name"
            maxLength={50}
            onChange={(value) =>
              setNewResignationData({ ...newResignationData, name: value })
            }
          />
          <TextArea
          disabled={formState === "display" || formState === "edit"}
          title="Remarks"
          inputValue={newResignationData.remarks}
          name="Remark"
          placeholder="remarks"
          maxLength={300}
          onChange={(value)=>setNewResignationData({...newResignationData,remarks:value})}
          />
        </section>

      </motion.div>
    </motion.main>
  );
};

export default ResignationEdit;
