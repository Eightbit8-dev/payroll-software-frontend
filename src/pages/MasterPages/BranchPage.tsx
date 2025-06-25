import { useState } from "react";
import ButtonSm, { ButtonLg } from "../../components/common/Buttons";
import CreateNewItemBar from "../../components/masterPage.components/CreateNewItemBar";
import PageTitleAndDescription from "../../components/masterPage.components/PageTitleAndDescription";
import DialogBox from "../../components/common/DialogBox";
import Input from "../../components/common/Input";
import { toast } from "react-toastify";

interface BranchDetails {
  branchId: number;
  name: string;
  address1: string;
  address2: string;
  remarks: string;
}

const branches: BranchDetails[] = [
  {
    branchId: 1,
    name: "Chennai HQ",
    address1: "No. 12, Mount Road, Chennai, Tamil Nadu",
    address2: "Near Anna Salai",
    remarks: "Main office",
  },
  {
    branchId: 2,
    name: "Bangalore Tech Park",
    address1: "Plot 45, Electronic City, Bangalore, Karnataka",
    address2: " Phase 1, Sector 3",
    remarks: "Development center",
  },
  {
    branchId: 3,
    name: "Hyderabad Support Hub",
    address1: "Kukatpally, Hyderabad, Telangana",
    address2: "Near Kukatpally Metro Station",
    remarks: "Customer support",
  },
  {
    branchId: 4,
    name: "Mumbai Sales Office",
    address1: "Andheri East, Mumbai, Maharashtra",
    address2: "Near Western Express Highway",
    remarks: "Handles West India sales",
  },
];

const BranchPage = () => {
  const [isCreateBranchDialogOpen, setIsCreateBranchDialogOpen] =
    useState(false);
  return (
    <div className="mx-auto flex w-full max-w-[1390px] flex-col gap-4">
      {/* Dialog box to add new branch */}
      {isCreateBranchDialogOpen && (
        <DialogBox setToggleDialogueBox={setIsCreateBranchDialogOpen}>
          <DialogBoxChildren
            setIsCreateBranchDialogOpen={setIsCreateBranchDialogOpen}
          />
        </DialogBox>
      )}
      <PageTitleAndDescription
        title="Branch Configuration"
        subtitle="Manage different office branches to streamline your organizational structure."
      />

      <CreateNewItemBar
        iconSrc="/icons/Configpage/Branch.svg"
        title="Create New Branch"
        onClick={() => setIsCreateBranchDialogOpen(true)}
      />

      <div className="table-container flex w-full flex-col gap-3 rounded-[12px] bg-white/80 p-4 shadow-sm">
        <div className="tables flex w-full flex-col gap-2 overflow-clip rounded-[9px]">
          {/* table header */}
          <div className="header flex w-full flex-row items-center gap-2 bg-slate-100 px-3">
            <p className="w-max min-w-[100px] px-2 py-4 text-start text-sm font-semibold text-zinc-900">
              S.No
            </p>
            <p className="w-full text-start text-sm font-semibold text-zinc-900">
              Name
            </p>
            <p className="w-full text-start text-sm font-semibold text-zinc-900">
              Address
            </p>
            <p className="w-full text-start text-sm font-semibold text-zinc-900">
              Remarks
            </p>
            <p className="min-w-[160px] text-start text-sm font-semibold text-zinc-900">
              Action
            </p>
          </div>
          {/* table body */}
          {branches.map((item, index) => {
            return (
              <div
                key={index + 1}
                className="cell-1 flex w-full flex-row items-center gap-2 px-3"
              >
                <p className="w-max min-w-[100px] px-2 py-4 text-start text-sm font-medium text-zinc-700">
                  {index + 1}
                </p>
                <p className="w-full text-start text-sm font-medium text-zinc-700">
                  {item.name}
                </p>
                <p className="w-full text-start text-sm font-medium text-zinc-700">
                  {item.address1}
                </p>
                <p className="w-full text-start text-sm font-medium text-zinc-700">
                  {item.remarks}
                </p>

                <div className="min-w-[160px] text-start text-sm font-medium text-zinc-700">
                  <ButtonSm
                    state="outline"
                    text="Manage settings"
                    onClick={() => console.log("Edit Clicked")}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BranchPage;

const DialogBoxChildren = ({
  setIsCreateBranchDialogOpen,
}: {
  setIsCreateBranchDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [newBranchName, setNewBranchName] = useState<BranchDetails>(
    {} as BranchDetails,
  );
  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success(
          "post request to create branch" + JSON.stringify(newBranchName),
        );
        setIsCreateBranchDialogOpen(false);
      }}
    >
      <section className="header flex w-full flex-row items-center justify-between text-lg font-medium text-zinc-800">
        Create New Branch
        <img
          onClick={() => setIsCreateBranchDialogOpen(false)}
          className="w-5 cursor-pointer"
          src="/icons/close-icon.svg"
          alt="close"
        />
      </section>
      <section className="flex w-full flex-col gap-4">
        <Input
          title="Branch Name *"
          type="str"
          inputValue={newBranchName.name}
          name="branch"
          placeholder="Enter branch name"
          maxLength={50}
          onChange={(value) =>
            setNewBranchName({ ...newBranchName, name: value })
          }
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
          <Input
            title="Address Line 1 *"
            type="str"
            inputValue={newBranchName.address1}
            name="address1"
            placeholder="Enter address line 1"
            maxLength={100}
            onChange={(value) =>
              setNewBranchName({ ...newBranchName, address1: value })
            }
          />
          <Input
            title="Address Line 2"
            type="str"
            inputValue={newBranchName.address2}
            name="address2"
            placeholder="Enter address line 2"
            maxLength={100}
            onChange={(value) =>
              setNewBranchName({ ...newBranchName, address2: value })
            }
          />
        </div>

        <Input
          title="Remarks *"
          type="str"
          inputValue={newBranchName.remarks}
          name="remarks"
          placeholder="Enter remarks"
          maxLength={100}
          onChange={(value) =>
            setNewBranchName({ ...newBranchName, remarks: value })
          }
        />
      </section>

      <section className="mt-1 grid w-full grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
        <ButtonLg
          state="outline"
          text="Cancel"
          onClick={() => setIsCreateBranchDialogOpen(false)}
        />
        <ButtonLg
          state="default"
          type="submit"
          disabled={
            !newBranchName.name ||
            !newBranchName.address1 ||
            !newBranchName.remarks
          }
          text="Create Branch"
        />
      </section>
    </form>
  );
};
