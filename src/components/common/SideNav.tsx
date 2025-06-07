import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <div className="floating-container flex relative h-screen w-[380px]  border-r-2 border-slate-300 ">
      <motion.section
        className="w-[300px] flex flex-col h-screen top-0 fixed  gap-3 select-none overflow-clip"
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "tween", stiffness: 100, damping: 20 }}
      >
        {/* Header section */}
        <motion.div
          className="p-4 w-full flex items-center justify-start"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* logo */}
          <motion.div
            className="flex items-center gap-2 self-start"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "tween", stiffness: 300 }}
          >
            <motion.img
              className="w-10 h-10"
              src="/icons/logo-icon.svg"
              alt="Logo"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            />
            <p className="text-3xl font-medium text-gray-800">PayRoll</p>
          </motion.div>
          {/* Roles */}
          <motion.p
            className="orange-gradient mx-2 text-white text-sm font-normal px-2 py-1.5 rounded"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "tween", stiffness: 200 }}
          >
            HR
          </motion.p>
        </motion.div>

        {/* Navigation items */}
        <motion.div
          className="main-navigation-items flex flex-col gap-2 px-3 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <Navigationdiv
              labelName="Dashboard"
              iconSrc="/icons/dashboard-icon.svg"
              activeIconSrc="/icons/dashboard-icon-active.svg"
              onClick={() => navigateToRoute(appRoutes.dashboardPage)}
              isActive={isRouteActive(appRoutes.dashboardPage)}
            />
          </motion.div>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
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
          </motion.div>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
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
          </motion.div>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          >
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
          </motion.div>

          <motion.div
            className="lower-settingns flex flex-col gap-2 w-full"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <motion.h5
              className="text-base font-medium text-slate-500 mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.3 }}
            >
              Cases
            </motion.h5>
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.3 }}
            >
              <Navigationdiv
                labelName="Memo"
                iconSrc="/icons/memo-icon.svg"
                onClick={() => navigateToRoute(appRoutes.memoPage)}
                isActive={isRouteActive(appRoutes.memoPage)}
                activeIconSrc="/icons/memo-icon-active.svg"
              />
            </motion.div>
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.3 }}
            >
              <Navigationdiv
                labelName="Settings"
                iconSrc="/icons/settings-icon.svg"
                activeIconSrc="/icons/settings-icon-active.svg"
                onClick={() => navigateToRoute(appRoutes.SettingsPage)}
                isActive={isRouteActive(appRoutes.SettingsPage)}
              />
            </motion.div>
            {/* logout button with margin */}
            <motion.div
              className="margin flex mt-auto "
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.3, type: "tween", stiffness: 100 }}
            >
              <motion.div
                className={`dropdown-navigation-div   cursor-pointer w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-lg font-medium transition-colors ease-in-out duration-150 text-slate-500 hover:bg-gray-100 active:bg-blue-500 active:text-white 
          `}
                onClick={() => console.log("Logout clicked")}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(156, 163, 175, 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "tween", stiffness: 300 }}
              >
                {/* Icon */}
                <motion.img
                  src="/icons/logout-icon.svg"
                  className="w-5 h-5 flex-shrink-0"
                  whileHover={{ rotate: 15 }}
                  transition={{ duration: 0.2 }}
                />
                Logout
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
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
  activeIconSrc?: string;
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
  activeIconSrc = iconSrc,
}) => {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <motion.div
      className={`navigation-div-container ${className}`}
      layout
      transition={{ type: "tween", stiffness: 300, damping: 30 }}
    >
      <div className="main-button-container flex flex-row gap-2">
        {isNestedchild && (
          <div className="current-section-indicator flex min-h-full w-[3px] relative overflow-clip bg-yellow-300/30 flex-col gap-2">
            <motion.div
              className={`current-section-indicator flex h-14 absolute top-0 w-[3px] flex-1 rounded-full transition-all ease-in-out duration-500 ${
                isActive ? "bg-orange-500" : "bg-transparent"
              } `}
              animate={{
                backgroundColor: isActive ? "#f97316" : "transparent",
              }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="hidden">dummy</h1>
            </motion.div>
          </div>
        )}
        <motion.div
          className={`dropdown-navigation-div w-full flex items-center gap-2 px-3 py-2.5 ${
            isNestedchild && "my-1"
          } rounded-xl text-lg font-medium transition-colors ease-in-out duration-150 ${
            isActive
              ? "bg-blue-500 text-white"
              : "text-slate-500 hover:bg-gray-100"
          } cursor-pointer`}
          onClick={handleClick}
          whileHover={{
            scale: 1.02,
            backgroundColor: isActive ? "#3b82f6" : "rgba(156, 163, 175, 0.1)",
          }}
          whileTap={{ scale: 0.98 }}
          animate={{
            backgroundColor: isActive ? "#3b82f6" : "transparent",
            color: isActive ? "#ffffff" : "#64748b",
          }}
          transition={{ type: "tween", stiffness: 300, damping: 20 }}
        >
          {/* Icon */}
          {!isNestedchild && (
            <motion.img
              src={isActive ? activeIconSrc : iconSrc}
              alt={labelName.toLowerCase()}
              className="w-5 h-5 flex-shrink-0"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            />
          )}

          {/* Label */}
          <motion.h6 className={`w-full text-start text-lg font-medium`} layout>
            {labelName}
          </motion.h6>

          {/* Badge/Count */}
          {breadCrumbCount !== undefined && breadCrumbCount > 0 && (
            <motion.div
              className={`min-w-6 min-h-6 rounded-full  text-xs font-normal text-white flex items-center justify-center flex-shrink-0 
            ${isActive ? "transparent" : "bg-orange-500"}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "tween", stiffness: 200 }}
            >
              {breadCrumbCount > 99 ? "99+" : breadCrumbCount}
            </motion.div>
          )}

          {/* Dropdown Arrow */}
          {isDropdown && (
            <motion.div
              className={`transform transition-transform ease-in-out duration-300 flex-shrink-0 ${
                isExpanded ? "rotate-180" : "rotate-90"
              }`}
              animate={{
                rotate: isExpanded ? 180 : 90,
              }}
              transition={{
                type: "tween",
                stiffness: 200,
                damping: 15,
              }}
              tabIndex={-1}
            >
              <motion.img
                src="/icons/arrow-icon.svg"
                alt="dropdown arrow"
                className="w-4 h-4"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Dropdown Content */}
      <AnimatePresence>
        {isDropdown && isExpanded && children && (
          <motion.div
            className="dropdown-content flex flex-col px-6 mt-2.5  w-full"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              type: "tween",
              stiffness: 200,
              damping: 20,
              opacity: { duration: 0.2 },
            }}
            style={{ overflow: "hidden" }}
          >
            {React.Children.map(children, (child, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.3,
                }}
              >
                {child}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
