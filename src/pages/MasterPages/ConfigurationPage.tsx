import ConfigCard from "../../components/common/ConfigCard"
import SearchBar from "../../components/common/SearchBar";
import { type  ConfigCardtype } from "../../types/ConfigCard";


const configCards: ConfigCardtype[] = [
  {
    img: "../../../public/icons/Configpage/Allowance.svg",
    title: "Branch",
    desc: "Manage different office branches to streamline your organizational structure.",
    label: "Organisation",
    labelColor: "bg-red-500",
    btnText: "Configure",
    onAction: () => console.log("Branch clicked"),
  },
  {
    img: "../../../public/icons/Configpage/Department.svg",
    title: "Department",
    desc: "Handle team member permissions and access levels.",
    label: "Organisation",
    labelColor: "bg-red-500",
    btnText: "Configure",
    onAction: () => console.log("Users clicked"),
  },
  {
    img: "../../../public/icons/Configpage/Desigination.svg",
    title: "Desigination",
    desc: "Configure payroll settings and salary structures.",
    label: "HR Essentials",
    labelColor: "bg-yellow-500",
    btnText: "Configure",
    onAction: () => console.log("Payroll clicked"),
  },
  {
    img: "../../../public/icons/Configpage/Resigination.svg",
    title: "Resigination",
    desc: "Track employee attendance and working hours.",
    label: "HR Essentials",
    labelColor: "bg-yellow-500",
    btnText: "Configure",
    onAction: () => console.log("Attendance clicked"),
  },
    {
    img: "../../../public/icons/Configpage/BloodGroup.svg",
    title: "Blood Group",
    desc: "Manage employee leave requests and balances.",
    label: "HR Essentials",
    labelColor: "bg-yellow-500",
    btnText: "Configure",
    onAction: () => console.log("Leaves clicked"),
  },
  {
    img: "../../../public/icons/Configpage/Attendance.svg",
    title: "Attendance",
    desc: "Maintain an inventory of all office assets and equipment.",
    label: "Attendance",
    labelColor: "bg-green-500",
    btnText: "Configure",
    onAction: () => console.log("Assets clicked"),
  },
  {
    img: "../../../public/icons/Configpage/Permission.svg",
    title: "Permission",
    desc: "Oversee project timelines, teams, and deliverables.",
    label: "Attendance",
    labelColor: "bg-green-500",
    btnText: "Configure",
    onAction: () => console.log("Projects clicked"),
  },
  {
    img: "../../../public/icons/Configpage/Lop.svg",
    title: "LOP",
    desc: "Monitor and approve timesheet entries submitted by employees.",
    label: "Attendance",
    labelColor: "bg-green-500",
    btnText: "Configure",
    onAction: () => console.log("Timesheet clicked"),
  },
  {
    img: "../../../public/icons/Configpage/Shift.svg",
    title: "Shift",
    desc: "Ensure all regulatory and policy requirements are met.",
    label: "Attendance",
    labelColor: "bg-green-500",
    btnText: "Configure",
    onAction: () => console.log("Compliance clicked"),
  },
  {
    img: "../../../public/icons/Configpage/Holiday.svg",
    title: "Holiday",
    desc: "Evaluate employee performance and appraisals.",
    label: " Holiday & Benefits",
    labelColor: "bg-purple-500",
    btnText: "Configure",
    onAction: () => console.log("Performance clicked"),
  },
  {
    img: "../../../public/icons/Configpage/Loan.svg",
    title: "Loan",
    desc: "Organize skill development sessions for employees.",
    label: " Holiday & Benefits",
   labelColor: "bg-purple-500",
    btnText: "Configure",
    onAction: () => console.log("Training clicked"),
  },
  {
    img: "../../../public/icons/Configpage/Allowance.svg",
    title: "Allowance",
    desc: "Access detailed analytics and operational reports.",
    label: " Holiday & Benefits",
    labelColor: "bg-purple-500",
    btnText: "Configure",
    onAction: () => console.log("Reports clicked"),
  },
];

const ConfigurationPage = () => {
  return (
    <div className="px-6 py-5">
     <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
            <div className="flex flex-col gap-[5px]">
                <div>
                    <p className="text-2xl font-bold text-zinc-800">Configuration</p>
                </div>
                <div>
                    <p className="text-base font-medium text-slate-500">Configure your app and connecct the tool your app will need</p>
                </div>
            </div>
            <div>
                <SearchBar/>
            </div>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {configCards.map((card, index) => (
    <ConfigCard
      key={index}
      img={card.img}
      title={card.title}
      desc={card.desc}
      label={card.label}
      labelColor={card.labelColor}
      btnText={card.btnText}
      onAction={card.onAction}
    />
  ))}
</div>

     </div>
        </div>
  )
}

export default ConfigurationPage