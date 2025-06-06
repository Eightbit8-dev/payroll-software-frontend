import React, { useState, useEffect } from "react";
import { appRoutes } from "../../routes/appRoutes";

const SideNav: React.FC = () => {
  const [activeRoute, setActiveRoute] = useState<string>("");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    // Get current pathname
    const currentPath = window.location.pathname;
    setActiveRoute(currentPath);

    // Auto-expand section based on current route (only one at a time)
    if (currentPath.startsWith("/company")) {
      setExpandedSection("company");
    } else if (currentPath.startsWith("/funds")) {
      setExpandedSection("funds");
    } else if (currentPath.startsWith("/approval")) {
      setExpandedSection("approvals");
    } else {
      setExpandedSection(null);
    }
  }, []);

  const isRouteActive = (route: string): boolean => {
    return activeRoute === route;
  };

  const isSectionExpanded = (section: string): boolean => {
    return expandedSection === section;
  };

  const toggleSection = (section: string) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  const navigateToRoute = (route: string) => {
    setActiveRoute(route);
    window.history.pushState({}, "", route);

    // Dispatch popstate event to notify other components of route change
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <section className="w-[300px] flex flex-col h-screen py-3 gap-8 select-none">
      {/* Header section */}
      <div className="p-4 w-full flex items-center justify-start">
        {/* logo */}
        <div className="flex items-center gap-2 self-start">
          <img src="./images/logo.png" alt="Logo" />
          <p className="text-3xl font-medium text-gray-800">PayRoll</p>
        </div>
        {/* Roles */}
        <p className="orange-gradient mx-2 text-white text-sm font-normal px-2 py-1.5 rounded">
          HR
        </p>
      </div>

      {/* Navigation items */}
      <div className="main-navigation-items flex flex-col gap-2 px-3 w-full">
        <Navigationdiv
          labelName="Dashboard"
          iconSrc="/icons/dashboard-icon.svg"
          onClick={() => navigateToRoute(appRoutes.dashboardPage)}
          isActive={isRouteActive(appRoutes.dashboardPage)}
        />

        <Navigationdiv
          labelName="Company"
          iconSrc="/icons/company-icon.svg"
          onClick={() => toggleSection("company")}
          isDropdown={true}
          breadCrumbCount={3}
          isExpanded={isSectionExpanded("company")}
          children={
            <>
              <Navigationdiv
                labelName="Department"
                iconSrc="/icons/dashboard-icon.svg"
                onClick={() => navigateToRoute(appRoutes.departmentPage)}
                breadCrumbCount={3}
                isNestedchild={true}
                isActive={isRouteActive(appRoutes.departmentPage)}
              />
              <Navigationdiv
                labelName="Employee"
                iconSrc="/icons/dashboard-icon.svg"
                onClick={() => navigateToRoute(appRoutes.employeePage)}
                breadCrumbCount={3}
                isActive={isRouteActive(appRoutes.employeePage)}
                isNestedchild={true}
              />
              <Navigationdiv
                labelName="Team"
                iconSrc="/icons/dashboard-icon.svg"
                onClick={() => navigateToRoute(appRoutes.teamPage)}
                breadCrumbCount={3}
                isNestedchild={true}
                isActive={isRouteActive(appRoutes.teamPage)}
              />
            </>
          }
        />

        <Navigationdiv
          labelName="Funds"
          iconSrc="/icons/funds-icon.svg"
          onClick={() => toggleSection("funds")}
          isDropdown={true}
          breadCrumbCount={3}
          isExpanded={isSectionExpanded("funds")}
          children={
            <>
              <Navigationdiv
                labelName="Payroll"
                iconSrc="/icons/dashboard-icon.svg"
                onClick={() => navigateToRoute(appRoutes.payRollPage)}
                breadCrumbCount={3}
                isNestedchild={true}
                isActive={isRouteActive(appRoutes.payRollPage)}
              />
              <Navigationdiv
                labelName="Tax & Invoice"
                iconSrc="/icons/dashboard-icon.svg"
                onClick={() => navigateToRoute(appRoutes.taxInvoicePage)}
                breadCrumbCount={3}
                isActive={isRouteActive(appRoutes.taxInvoicePage)}
                isNestedchild={true}
              />
            </>
          }
        />

        <Navigationdiv
          labelName="Approvals"
          iconSrc="/icons/approval-icon.svg"
          onClick={() => toggleSection("approvals")}
          isDropdown={true}
          breadCrumbCount={3}
          isExpanded={isSectionExpanded("approvals")}
          children={
            <>
              <Navigationdiv
                labelName="Leave Requests"
                iconSrc="./icons/dashboard-icon.svg"
                onClick={() => navigateToRoute(appRoutes.leaveRequestsPage)}
                breadCrumbCount={3}
                isNestedchild={true}
                isActive={isRouteActive(appRoutes.leaveRequestsPage)}
              />
              <Navigationdiv
                labelName="Schedules"
                iconSrc="./icons/dashboard-icon.svg"
                onClick={() => navigateToRoute(appRoutes.schedulePage)}
                breadCrumbCount={3}
                isActive={isRouteActive(appRoutes.schedulePage)}
                isNestedchild={true}
              />
            </>
          }
        />
        <div className="lower-settingns flex flex-col gap-2 w-full">
          <h5 className="text-base font-medium text-slate-500 mt-3">Cases</h5>
          <Navigationdiv
            labelName="Memo"
            iconSrc="/icons/memo-icon.svg"
            onClick={() => navigateToRoute(appRoutes.memoPage)}
            isActive={isRouteActive(appRoutes.memoPage)}
          />
          <Navigationdiv
            labelName="Settings"
            iconSrc="/icons/settings-icon.svg"
            onClick={() => navigateToRoute(appRoutes.SettingsPage)}
            isActive={isRouteActive(appRoutes.SettingsPage)}
          />
          {/* logout button with margin */}
          <div className="margin flex mt-auto self-stretch min-h-full items-end justify-center bg-amber-200">
            <div
              className={`dropdown-navigation-div   cursor-pointer w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-lg font-medium transition-colors ease-in-out duration-150 text-slate-500 hover:bg-gray-100 active:bg-blue-500 active:text-white 
          `}
              onClick={() => console.log("Logout clicked")}
            >
              {/* Icon */}
              <img
                src="/icons/logout-icon.svg"
                className="w-5 h-5 flex-shrink-0"
              />
              Logout
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SideNav;

interface NavigationdivProps {
  labelName: string;
  iconSrc: string;
  breadCrumbCount?: number;
  isDropdown?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
  isNestedchild?: boolean;
  isExpanded?: boolean;
}

const Navigationdiv: React.FC<NavigationdivProps> = ({
  labelName,
  iconSrc,
  breadCrumbCount,
  isDropdown = false,
  children,
  onClick,
  isActive = false,
  className = "",
  isNestedchild = false,
  isExpanded = false,
}) => {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <div className={`navigation-div-container ${className}`}>
      <div className="main-button-container flex flex-row gap-2">
        {isNestedchild && (
          <div className="current-section-indicator flex min-h-full w-[3px] relative overflow-clip bg-yellow-300/30 flex-col gap-2">
            <div
              className={`current-section-indicator flex h-6 absolute top-3 w-[3px] flex-1 rounded-full  ${
                isActive ? "bg-orange-500" : "bg-transparent"
              } `}
            >
              <h1 className="hidden">dummy</h1>
            </div>
          </div>
        )}
        <div
          className={`dropdown-navigation-div w-full flex items-center gap-2 px-3 py-2.5 ${
            isNestedchild && "my-1"
          } rounded-xl text-lg font-medium transition-colors ease-in-out duration-150 ${
            isActive
              ? "bg-blue-500 text-white"
              : "text-slate-500 hover:bg-gray-100"
          } cursor-pointer`}
          onClick={handleClick}
        >
          {/* Icon */}
          {!isNestedchild && (
            <img
              src={iconSrc}
              alt={labelName.toLowerCase()}
              className="w-5 h-5 flex-shrink-0"
            />
          )}

          {/* Label */}
          <h6 className="w-full text-start font-medium">{labelName}</h6>

          {/* Badge/Count */}
          {breadCrumbCount !== undefined && breadCrumbCount > 0 && (
            <div
              className={`min-w-6 min-h-6 rounded-full  text-xs font-normal text-white flex items-center justify-center flex-shrink-0 
            ${isActive ? "transparent" : "bg-orange-500"}`}
            >
              {breadCrumbCount > 99 ? "99+" : breadCrumbCount}
            </div>
          )}

          {/* Dropdown Arrow */}
          {isDropdown && (
            <div
              className={`transform transition-transform ease-in-out duration-300 flex-shrink-0 ${
                isExpanded ? "rotate-180" : "rotate-90"
              }`}
              tabIndex={-1}
            >
              <img
                src="/icons/arrow-icon.svg"
                alt="dropdown arrow"
                className="w-4 h-4"
              />
            </div>
          )}
        </div>
      </div>

      {/* Dropdown Content */}
      {isDropdown && isExpanded && children && (
        <div className="dropdown-content flex flex-col px-6 mt-2.5  w-full">
          {children}
        </div>
      )}
    </div>
  );
};
