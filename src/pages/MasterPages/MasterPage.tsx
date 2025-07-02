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
      desc: "Define departments to better organize teams and responsibilities.",
      label: "Organisation",
      labelColor: "bg-red-500",
      btnText: "Configure",
      onAction: () => navigate(appRoutes.masterRoutes.children.departments),
    },
    {
      img: "/icons/Configpage/Desigination.svg",
      title: "Desigination",
      desc: "Create and manage job titles to clarify employee roles and hierarchy.",
      label: "HR Essentials",
      labelColor: "bg-yellow-500",
      btnText: "Configure",
      onAction: () => navigate(appRoutes.masterRoutes.children.designations),
    },
    {
      img: "/icons/Configpage/Resigination.svg",
      title: "Resigination",
      desc: "Track and manage employee resignations efficiently with proper records.",
      label: "HR Essentials",
      labelColor: "bg-yellow-500",
      btnText: "Configure",
      onAction: () => navigate(appRoutes.masterRoutes.children.resignations),
    },
    {
      img: "/icons/Configpage/BloodGroup.svg",
      title: "Blood Group",
      desc: "Store employee blood group information for medical and emergency use.",
      label: "HR Essentials",
      labelColor: "bg-yellow-500",
      btnText: "Configure",
      onAction: () => navigate(appRoutes.masterRoutes.children.bloodGroups),
    },
    {
      img: "/icons/Configpage/Attendance.svg",
      title: "Attendance",
      desc: "Monitor and manage employee attendance records accurately",
      label: "Attendance",
      labelColor: "bg-green-500",
      btnText: "Configure",
      onAction: () => navigate(appRoutes.masterRoutes.children.attendance),
    },
    {
      img: "/icons/Configpage/Permission.svg",
      title: "Permission",
      desc: "Allow short-duration leave requests and approvals through permission logs",
      label: "Attendance",
      labelColor: "bg-green-500",
      btnText: "Configure",
      onAction: () => navigate(appRoutes.masterRoutes.children.permissions),
    },
    {
      img: "/icons/Configpage/Lop.svg",
      title: "LOB",
      desc: "Leave opening balance, Track leaves without pay and maintain data.",
      label: "Attendance",
      labelColor: "bg-green-500",
      btnText: "Configure",
      onAction: () => console.log("Timesheet clicked"),
    },
    {
      img: "./icons/Configpage/Shift.svg",
      title: "Shift",
      desc: "Define work shifts and allocate employees accordingly.",
      label: "Attendance",
      labelColor: "bg-green-500",
      btnText: "Configure",
      onAction: () => navigate(appRoutes.masterRoutes.children.shifts),
    },
    {
      img: "/icons/Configpage/Holiday.svg",
      title: "Holiday",
      desc: "lan and manage company-wide holidays and off days",
      label: " Holiday & Benefits",
      labelColor: "bg-purple-500",
      btnText: "Configure",
      onAction: () => navigate(appRoutes.masterRoutes.children.holidays),
    },
    {
      img: "/icons/Configpage/Loan.svg",
      title: "Loan",
      desc: "Track employee loans and repayment details with ease",
      label: " Holiday & Benefits",
      labelColor: "bg-purple-500",
      btnText: "Configure",
      onAction: () => navigate(appRoutes.masterRoutes.children.loans),
    },
    {
      img: "/icons/Configpage/Allowance.svg",
      title: "Allowance",
      desc: "Configure various allowances provided to employees beyond salary.",
      label: " Holiday & Benefits",
      labelColor: "bg-purple-500",
      btnText: "Configure",
      onAction: () => navigate(appRoutes.masterRoutes.children.allowances),
    },
  ];
  return (
    <div className="mx-auto flex w-full max-w-[1390px] origin-top flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-[2px]">
          <div>
            <p className="text-xl font-bold text-zinc-800">Configuration</p>
          </div>
          <div>
            <p className="text-base font-medium text-slate-500">
              Configure your app and connect the tool your app will need
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
