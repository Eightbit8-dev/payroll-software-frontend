import { useNavigate } from "react-router-dom";
import ConfigCard from "../../components/common/ConfigCard";
import SearchBar from "../../components/common/SearchBar";
import { appRoutes } from "../../routes/appRoutes";

export interface ConfigCardtype {
  img: string;
  title: string;
  desc: string;
  label: string;
  labelColor: string;
  btnText: string;
  onAction: () => void;
}

export const MasterPage = () => {
  const navigate = useNavigate();

  const configCards: ConfigCardtype[] = [
    {
      img: "/icons/Configpage/Branch.svg",
      title: "Branch",
      desc: "Manage different office branches to streamline your organizational structure.",
      label: "Organisation",
      labelColor: "bg-red-500",
      btnText: "Configure",
      onAction: () => navigate(appRoutes.masterRoutes.children.branches),
    },
    {
      img: "/icons/Configpage/Department.svg",
      title: "Department",
      desc: "Handle team member permissions and access levels.",
      label: "Organisation",
      labelColor: "bg-red-500",
      btnText: "Configure",
      onAction: () => navigate(appRoutes.masterRoutes.children.departments),
    },
    {
      img: "/icons/Configpage/Desigination.svg",
      title: "Desigination",
      desc: "Configure payroll settings and salary structures.",
      label: "HR Essentials",
      labelColor: "bg-yellow-500",
      btnText: "Configure",
      onAction: () => navigate(appRoutes.masterRoutes.children.designations),
    },
    {
      img: "/icons/Configpage/Resigination.svg",
      title: "Resigination",
      desc: "Track & manage employee attendance and working hours.",
      label: "HR Essentials",
      labelColor: "bg-yellow-500",
      btnText: "Configure",
      onAction: () => navigate(appRoutes.masterRoutes.children.resignations),
    },
    {
      img: "/icons/Configpage/BloodGroup.svg",
      title: "Blood Group",
      desc: "Manage employee leave requests and balances.",
      label: "HR Essentials",
      labelColor: "bg-yellow-500",
      btnText: "Configure",
      onAction: () => navigate(appRoutes.masterRoutes.children.bloodGroups),
    },
    {
      img: "/icons/Configpage/Attendance.svg",
      title: "Attendance",
      desc: "Maintain an inventory of all office assets and equipment.",
      label: "Attendance",
      labelColor: "bg-green-500",
      btnText: "Configure",
      onAction: () => console.log("Assets clicked"),
    },
    {
      img: "/icons/Configpage/Permission.svg",
      title: "Permission",
      desc: "Oversee project timelines, teams, and deliverables.",
      label: "Attendance",
      labelColor: "bg-green-500",
      btnText: "Configure",
      onAction: () => console.log("Projects clicked"),
    },
    {
      img: "/icons/Configpage/Lop.svg",
      title: "LOP",
      desc: "Monitor and approve timesheet entries submitted by employees.",
      label: "Attendance",
      labelColor: "bg-green-500",
      btnText: "Configure",
      onAction: () => console.log("Timesheet clicked"),
    },
    {
      img: "./icons/Configpage/Shift.svg",
      title: "Shift",
      desc: "Ensure all regulatory and policy requirements are met.",
      label: "Attendance",
      labelColor: "bg-green-500",
      btnText: "Configure",
      onAction: () => console.log("Compliance clicked"),
    },
    {
      img: "/icons/Configpage/Holiday.svg",
      title: "Holiday",
      desc: "Evaluate employee performance and appraisals.",
      label: " Holiday & Benefits",
      labelColor: "bg-purple-500",
      btnText: "Configure",
      onAction: () => console.log("Performance clicked"),
    },
    {
      img: "/icons/Configpage/Loan.svg",
      title: "Loan",
      desc: "Organize skill development sessions for employees.",
      label: " Holiday & Benefits",
      labelColor: "bg-purple-500",
      btnText: "Configure",
      onAction: () => console.log("Training clicked"),
    },
    {
      img: "/icons/Configpage/Allowance.svg",
      title: "Allowance",
      desc: "Access detailed analytics and operational reports.",
      label: " Holiday & Benefits",
      labelColor: "bg-purple-500",
      btnText: "Configure",
      onAction: () => console.log("Reports clicked"),
    },
  ];
  return (
    <div className="mx-auto flex w-full max-w-[1390px] flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-[5px]">
          <div>
            <p className="text-2xl font-bold text-zinc-800">Configuration</p>
          </div>
          <div>
            <p className="text-base font-medium text-slate-500">
              Configure your app and connecct the tool your app will need
            </p>
          </div>
        </div>
        <div>
          <SearchBar />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
  );
};

export default MasterPage;
