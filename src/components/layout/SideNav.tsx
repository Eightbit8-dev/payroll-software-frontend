import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { appRoutes } from "../../routes/appRoutes";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const SideNav: React.FC = () => {
  const [activeRoute, setActiveRoute] = useState<string>("");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(true);

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
    if (isSideNavExpanded) {
      setExpandedSection((prev) => (prev === section ? null : section));
    }
  };

  const navigateToRoute = (route: string) => {
    setActiveRoute(route);
    window.history.pushState({}, "", route);

    // Dispatch popstate event to notify other components of route change
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const toggleSideNav = () => {
    setIsSideNavExpanded(!isSideNavExpanded);
    if (!isSideNavExpanded) {
      setExpandedSection(null); // Close all sections when expanding
    }
  };

  return (
    <div
      className={`floating-container flex relative h-screen ${
        isSideNavExpanded ? "w-[380px]" : "w-[80px]"
      } transition-all duration-300 border-r-2 border-slate-300  `}
    >
      <motion.section
        className={`flex flex-col h-screen top-0 left-0 right-0 fixed gap-3  items-center justify-start select-none overflow-clip transition-all duration-300 ${
          isSideNavExpanded ? "w-[380px]" : "w-[80px]"
        }`}
        initial={{ x: -300, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          width: isSideNavExpanded ? 300 : 80,
        }}
        transition={{ type: "tween", stiffness: 100, damping: 20 }}
      >
        {/* Header section */}
        <motion.div
          className="p-4 w-full flex items-center justify-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* logo */}
          <motion.div
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 self-start cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "tween", stiffness: 300 }}
          >
            <motion.img
              className={`${
                isSideNavExpanded ? "w-8 h-8 " : "min-w-10 min-h-10 "
              }`}
              src="/icons/logo-icon-side-nav.svg"
              alt="Logo"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            <AnimatePresence>
              {isSideNavExpanded && (
                <motion.p
                  className="text-2xl font-medium text-gray-800"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  PayRoll
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Roles */}
          <AnimatePresence>
            {isSideNavExpanded && (
              <motion.p
                className="orange-gradient mx-2 text-white text-xs font-normal px-1.5 py-1 rounded"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: 0.4, type: "tween", stiffness: 200 }}
              >
                HR
              </motion.p>
            )}
          </AnimatePresence>

          {/* collapse button */}
          {isSideNavExpanded && (
            <motion.img
              className={`w-6 h-6 cursor-pointer ${
                isSideNavExpanded ? "ml-auto" : "ml-0"
              }`}
              src="/icons/collapse-icon.svg"
              alt="Collapse"
              onClick={toggleSideNav}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              animate={{
                rotate: isSideNavExpanded ? 0 : 180,
                marginLeft: isSideNavExpanded ? "auto" : "0",
              }}
            />
          )}
        </motion.div>

        {/* Expand button when collapsed - positioned below logo */}
        <AnimatePresence>
          {!isSideNavExpanded && (
            <motion.div
              className="px-4 "
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                className="w-6 h-6 cursor-pointer mx-auto"
                src="/icons/collapse-icon.svg"
                alt="Expand"
                onClick={toggleSideNav}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ rotate: 180 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

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
              isSideNavExpanded={isSideNavExpanded}
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
              onClick={() => navigateToRoute(appRoutes.companyPage)}
              onDropDownClick={() => toggleSection("company")}
              isDropdown={true}
              isActive={isRouteActive(appRoutes.companyPage)}
              activeIconSrc="/icons/company-icon-active.svg"
              breadCrumbCount={3}
              isExpanded={isSectionExpanded("company")}
              isSideNavExpanded={isSideNavExpanded}
              children={
                <>
                  <Navigationdiv
                    labelName="Department"
                    iconSrc="/icons/dashboard-icon.svg"
                    onClick={() => navigateToRoute(appRoutes.departmentPage)}
                    breadCrumbCount={3}
                    isNestedchild={true}
                    isActive={isRouteActive(appRoutes.departmentPage)}
                    isSideNavExpanded={isSideNavExpanded}
                  />
                  <Navigationdiv
                    labelName="Employee"
                    iconSrc="/icons/dashboard-icon.svg"
                    onClick={() => navigateToRoute(appRoutes.employeePage)}
                    breadCrumbCount={3}
                    isActive={isRouteActive(appRoutes.employeePage)}
                    isNestedchild={true}
                    isSideNavExpanded={isSideNavExpanded}
                  />
                  <Navigationdiv
                    labelName="Team"
                    iconSrc="/icons/dashboard-icon.svg"
                    onClick={() => navigateToRoute(appRoutes.teamPage)}
                    breadCrumbCount={3}
                    isNestedchild={true}
                    isActive={isRouteActive(appRoutes.teamPage)}
                    isSideNavExpanded={isSideNavExpanded}
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
              onClick={() => navigateToRoute(appRoutes.fundsPage)}
              onDropDownClick={() => toggleSection("funds")}
              activeIconSrc="/icons/funds-icon-active.svg"
              isActive={isRouteActive(appRoutes.fundsPage)}
              isDropdown={true}
              breadCrumbCount={3}
              isExpanded={isSectionExpanded("funds")}
              isSideNavExpanded={isSideNavExpanded}
              children={
                <>
                  <Navigationdiv
                    labelName="Payroll"
                    iconSrc="/icons/dashboard-icon.svg"
                    onClick={() => navigateToRoute(appRoutes.payRollPage)}
                    breadCrumbCount={3}
                    isNestedchild={true}
                    isActive={isRouteActive(appRoutes.payRollPage)}
                    isSideNavExpanded={isSideNavExpanded}
                  />
                  <Navigationdiv
                    labelName="Tax & Invoice"
                    iconSrc="/icons/dashboard-icon.svg"
                    onClick={() => navigateToRoute(appRoutes.taxInvoicePage)}
                    breadCrumbCount={3}
                    isActive={isRouteActive(appRoutes.taxInvoicePage)}
                    isNestedchild={true}
                    isSideNavExpanded={isSideNavExpanded}
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
              onClick={() => navigateToRoute(appRoutes.approvalPage)}
              isActive={isRouteActive(appRoutes.approvalPage)}
              onDropDownClick={() => toggleSection("approvals")}
              isDropdown={true}
              activeIconSrc="/icons/approval-icon-active.svg"
              breadCrumbCount={3}
              isExpanded={isSectionExpanded("approvals")}
              isSideNavExpanded={isSideNavExpanded}
              children={
                <>
                  <Navigationdiv
                    labelName="Leave Requests"
                    iconSrc="./icons/dashboard-icon.svg"
                    onClick={() => navigateToRoute(appRoutes.leaveRequestsPage)}
                    breadCrumbCount={3}
                    isNestedchild={true}
                    isActive={isRouteActive(appRoutes.leaveRequestsPage)}
                    isSideNavExpanded={isSideNavExpanded}
                  />
                  <Navigationdiv
                    labelName="Schedules"
                    iconSrc="./icons/dashboard-icon.svg"
                    onClick={() => navigateToRoute(appRoutes.schedulePage)}
                    breadCrumbCount={3}
                    isActive={isRouteActive(appRoutes.schedulePage)}
                    isNestedchild={true}
                    isSideNavExpanded={isSideNavExpanded}
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
            <AnimatePresence>
              {isSideNavExpanded && (
                <motion.h5
                  className="text-base font-medium text-slate-500 mt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 1.0, duration: 0.3 }}
                >
                  Cases
                </motion.h5>
              )}
            </AnimatePresence>
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
                isSideNavExpanded={isSideNavExpanded}
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
                isSideNavExpanded={isSideNavExpanded}
              />
            </motion.div>
            {/* logout button with margin */}
            <motion.div
              className="margin flex mt-auto"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.3, type: "tween", stiffness: 100 }}
            >
              <motion.div
                className={`dropdown-navigation-div cursor-pointer w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-lg font-medium transition-colors ease-in-out duration-150 text-slate-500 hover:bg-gray-100 active:bg-blue-500 active:text-white ${
                  !isSideNavExpanded ? "justify-center" : ""
                }`}
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
                <AnimatePresence>
                  {isSideNavExpanded && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      Logout
                    </motion.span>
                  )}
                </AnimatePresence>
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
  isSideNavExpanded?: boolean;
  onDropDownClick?: () => void;
}

const Navigationdiv: React.FC<NavigationdivProps> = ({
  labelName,
  iconSrc,
  breadCrumbCount,
  isDropdown = false,
  children,
  onClick,
  onDropDownClick,
  isActive = false,
  className = "",
  isNestedchild = false,
  isExpanded = false,
  activeIconSrc = iconSrc,
  isSideNavExpanded = true,
}) => {
  const handleClick = () => {
    onClick?.();
  };

  const handleDropDownClick = () => {
    onDropDownClick?.();
  };

  // Show orange dot when sidebar is collapsed and there's a breadcrumb count
  const showOrangeDot =
    !isSideNavExpanded && breadCrumbCount !== undefined && breadCrumbCount > 0;

  return (
    <motion.div
      className={`navigation-div-container ${className}`}
      layout
      transition={{ type: "tween", stiffness: 300, damping: 30 }}
    >
      <div className="main-button-container flex flex-row gap-2 ">
        {isNestedchild && (
          <div className="current-section-indicator flex min-h-full w-[3px] relative overflow-clip bg-yellow-300/30 flex-col gap-2">
            <motion.div
              className={`current-section-indicator flex h-14 absolute top-0 w-[3px] flex-1 rounded-full transition-all ease-in-out duration-500 ${
                isActive ? "bg-orange-500" : "bg-transparent"
              }`}
              animate={{
                backgroundColor: isActive ? "#f97316" : "transparent",
              }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="hidden">dummy</h1>
            </motion.div>
          </div>
        )}
        <Tooltip>
          <TooltipTrigger className="min-w-full">
            {!isSideNavExpanded && (
              <TooltipContent
                side="right"
                sideOffset={10}
                className="bg-slate-200 text-zinc-800 ] "
              >
                {<h2 className="text-sm font-medium">{labelName}</h2>}
              </TooltipContent>
            )}
            <motion.div
              className={`dropdown-navigation-div w-full flex items-center ${
                !isSideNavExpanded && !isNestedchild ? "justify-center" : ""
              } gap-2 p-3 ${
                isNestedchild && "my-1"
              } rounded-xl text-lg font-medium transition-colors ease-in-out duration-150 ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-slate-500 hover:bg-gray-100"
              } cursor-pointer relative`}
              onClick={handleClick}
              whileHover={{
                scale: 1.02,
                backgroundColor: isActive
                  ? "#3b82f6"
                  : "rgba(156, 163, 175, 0.1)",
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

              {/* Label - only show when expanded */}
              <AnimatePresence>
                {isSideNavExpanded && (
                  <motion.h6
                    className="w-full text-start text-lg font-medium"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "100%" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.3 }}
                    layout
                  >
                    {labelName}
                  </motion.h6>
                )}
              </AnimatePresence>

              {/* Badge/Count - only show when expanded */}
              <AnimatePresence>
                {isSideNavExpanded &&
                  breadCrumbCount !== undefined &&
                  breadCrumbCount > 0 && (
                    <motion.div
                      className={`min-w-6 min-h-6 rounded-full text-xs font-normal text-white flex items-center justify-center flex-shrink-0 ${
                        isActive ? "transparent" : "bg-orange-500"
                      }`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "tween", stiffness: 200 }}
                    >
                      {breadCrumbCount > 99 ? "99+" : breadCrumbCount}
                    </motion.div>
                  )}
              </AnimatePresence>

              {/* Orange dot when collapsed */}
              <AnimatePresence>
                {showOrangeDot && (
                  <motion.div
                    className="absolute top-1 right-2 w-3 h-3 bg-orange-500 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "tween", stiffness: 200 }}
                  />
                )}
              </AnimatePresence>

              {/* Dropdown Arrow - only show when expanded */}
              <AnimatePresence>
                {isDropdown && isSideNavExpanded && (
                  <motion.div
                    onClick={handleDropDownClick}
                    className={`transform transition-transform ease-in-out duration-300 flex-shrink-0 ${
                      isExpanded ? "rotate-180" : "rotate-90"
                    }`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: isExpanded ? 180 : 90,
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{
                      type: "tween",
                      stiffness: 200,
                      damping: 15,
                    }}
                    tabIndex={-1}
                  >
                    <motion.img
                      src={
                        isActive
                          ? "/icons/arrow-icon-white.svg"
                          : "/icons/arrow-icon.svg"
                      }
                      alt="dropdown arrow"
                      className="w-5 h-5"
                      whileHover={{ scale: 1.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </TooltipTrigger>
        </Tooltip>
      </div>

      {/* Dropdown Content - only show when sidebar is expanded */}
      <AnimatePresence>
        {isDropdown && isExpanded && children && isSideNavExpanded && (
          <motion.div
            className="dropdown-content flex flex-col px-6 mt-2.5 w-full"
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
