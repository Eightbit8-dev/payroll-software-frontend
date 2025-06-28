import { useEffect, useState } from "react";
import Input from "../../../components/common/Input";
import ButtonSm from "../../../components/common/Buttons";
import type { FormState } from "../../../types/appTypes";
import { useCreateDesignation, useEditDesignation } from "../../../queries/DesiginationQuery";
import type { DesignationsDetails } from "../../../types/apiTypes";
import { AnimatePresence, motion } from "framer-motion";
import TextArea from "../../../components/common/Textarea";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const DesignationEdit = ({
  DesignationDetails,
  formState,
  setFormState,
}: {
  DesignationDetails: DesignationsDetails | null; //null so that user can create new Designation if the state is create
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
}) => {


  const [DesignationData, setDesignationData] = useState<DesignationsDetails | null>(null); //Original Designation data passed from above
  const [newDesignationData, setNewDesignationData] = useState<DesignationsDetails | null>(
    null,
  ); //Local copy to reset if cancel is clicked

  const { mutate: createDesignation, isPending, isSuccess } = useCreateDesignation();
  const {
    mutate: updateDesignation,
    isPending: isUpdatePending,
    isSuccess: isUpdatingSuccess,
  } = useEditDesignation();

  useEffect(() => {
    if (DesignationDetails) {
      setDesignationData(DesignationDetails);
      setNewDesignationData(DesignationDetails);
    }
  }, [DesignationDetails]);

  useEffect(() => {
    if (isSuccess) {
      setDesignationData(newDesignationData);
      setFormState("display");
    }
  }, [isSuccess]); //cleaning after sumission

  useEffect(() => {
    if (isUpdatingSuccess) {
      setDesignationData(newDesignationData);
      setFormState("display");
    }
  }, [isUpdatingSuccess]); //.cleanign after user updates



  if (!DesignationData || !newDesignationData) {
    return (
      <p className="text-md my-1 self-center-safe text-center text-gray-600">
        Select a Designation to view details.
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
            {DesignationData.name} Configuration
          </h1>
          <AnimatePresence mode="wait">
            {formState === "create" && (
              <ButtonSm
                className="font-semibold text-white disabled:opacity-60"
                state="default"
                text={isPending ? "Creating..." : "Create new Designation"}
                disabled={
                  isPending ||
                  newDesignationData.name === "" 
                }
                onClick={() => {
                  createDesignation(newDesignationData);
                }}
              />
            )}
          </AnimatePresence>
          {/* //To check if the data has changeg */}
          {JSON.stringify(newDesignationData) !== JSON.stringify(DesignationData) &&
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
                        setNewDesignationData(DesignationData);
                      }}
                    />
                    <ButtonSm
                      className="font-medium text-white"
                      text={isUpdatePending ? "Updating..." : "Save Changes"}
                      state="default"
                      onClick={() => updateDesignation(newDesignationData)}
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
            inputValue={newDesignationData.name}
            name="Designation"
            placeholder="Enter Designation name"
            maxLength={50}
            onChange={(value) =>
              setNewDesignationData({ ...newDesignationData, name: value })
            }
          />
          <TextArea
          disabled={formState === "display" || formState === "edit"}
          title="Remarks"
          inputValue={newDesignationData.remarks}
          name="Remark"
          placeholder="remarks"
          maxLength={300}
          onChange={(value)=>setNewDesignationData({...newDesignationData,remarks:value})}
          />
        </section>

      </motion.div>
    </motion.main>
  );
};

export default DesignationEdit;
