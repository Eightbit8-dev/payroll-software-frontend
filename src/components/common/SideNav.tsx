import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  iconSrc: string;
  count?: number;
  submenu?: SubmenuItem[];
}

interface SubmenuItem {
  id: string;
  label: string;
  href?: string;
  count?: number;
}

interface NavSection extends NavItem {}

const SideNav = () => {
  const [expandedSection, setExpandedSection] = useState<string>('company');
  const [selectedItem, setSelectedItem] = useState<string>('company-employees');

  // Dynamic counts
  const navCounts = {
    company: 6,
    funds: 4,
    approvals: 8,
    departments: 8,
    employees: 12,
    teams: 5,
    offices: 3,
    contractors: 15,
    payroll: 23,
    taxInvoice: 7,
    benefits: 9,
    expenses: 11,
    leaveRequests: 14,
    schedule: 6,
    overtime: 3,
    budgetApprovals: 2
  };

  // Main navigation sections with submenus
  const navSections: NavSection[] = [
    {
      id: 'company',
      label: 'Company',
      iconSrc: './icons/Company-con.svg',
      count: navCounts.company,
      submenu: [
        { id: 'company-departments', label: 'Departments', count: navCounts.departments },
        { id: 'company-employees', label: 'Employees', count: navCounts.employees },
        { id: 'company-teams', label: 'Teams', count: navCounts.teams },
        { id: 'company-offices', label: 'Offices', count: navCounts.offices }
      ]
    },
    {
      id: 'funds',
      label: 'Funds',
      iconSrc: './icons/funds-icon.svg',
      count: navCounts.funds,
      submenu: [
        { id: 'funds-payroll', label: 'Payroll', count: navCounts.payroll },
        { id: 'funds-tax-invoice', label: 'Tax and invoice', count: navCounts.taxInvoice },
        { id: 'funds-benefits', label: 'Benefits', count: navCounts.benefits },
        { id: 'funds-expenses', label: 'Expenses', count: navCounts.expenses }
      ]
    },
    {
      id: 'approvals',
      label: 'Approvals',
      iconSrc: './icons/approval-icon.svg',
      count: navCounts.approvals,
      submenu: [
        { id: 'approvals-leave-requests', label: 'Leave requests', count: navCounts.leaveRequests },
        { id: 'approvals-schedule', label: 'Schedule', count: navCounts.schedule },
        { id: 'approvals-overtime', label: 'Overtime', count: navCounts.overtime },
        { id: 'approvals-budget-approvals', label: 'Budget ', count: navCounts.budgetApprovals }
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSection(prev => prev === sectionId ? '' : sectionId);
  };

  return (
    <>
      <div className="w-64 bg-white border-r overflow-y-hidden border-gray-200 h-screen flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 w-full flex items-center justify-between">
          <div>
            <img src="./images/logo.png" alt="Logo" />
          </div>
          <div>
            <p className="text-3xl font-medium text-gray-800">PayRoll</p>
          </div>
          <div>
            <p className="orange-gradient text-white text-sm font-normal px-2 py-1 rounded">HR</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 flex flex-col justify-between custom-scrollbar">
          <ul className="space-y-2">
            {/* Dashboard */}
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 gap-3 px-3 py-[10px] text-lg font-medium text-slate-500  hover:bg-gray-50 rounded-lg"
              >
                <img src="./icons/dash-icon.svg" alt="Dashboard Icon" className="w-5 h-5" />
                <span>Dashboard</span>
              </a>
            </li>

            {/* Dynamic Navigation Sections */}
            {navSections.map((section) => (
              <li key={section.id}>
                <div
                  className="flex items-center justify-between  gap-2 px-3 py-[10px]   text-lg font-medium text-slate-500 hover:bg-gray-50 rounded-lg cursor-pointer"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="flex items-center gap-3">
                    <img src={section.iconSrc} alt={`${section.label} Icon`} className="w-5 h-5" />
                    <span>{section.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {section.count && (
                      <span className="bg-orange-400 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {section.count}
                      </span>
                    )}
                    {expandedSection === section.id ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </div>
                </div>

                {/* Submenu */}
                {expandedSection === section.id && (
                  <div className="ml-4 mt-2 relative ">
                    <div className="max-h-100 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100  [&::-webkit-scrollbar-thumb]:bg-gray-300">
                      <ul className="space-y-1">
                        {section.submenu?.map((item) => (
                          <li key={item.id}>
                            <a
                              href="#"
                              className={`flex items-center justify-between px-7 py-[10px] rounded-lg font-medium text-base transition-colors ${
                                selectedItem === item.id
                                  ? 'text-white bg-blue-500'
                                  : 'text-gray-500 hover:bg-gray-50'
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedItem(item.id);
                              }}
                            >
                              <span>{item.label}</span>
                              {item.count && (
                                <span
                                  className={`text-xs w-5 h-5 rounded-full flex items-center justify-center ${
                                    selectedItem === item.id
                                      ? 'bg-transparent  text-white'
                                      : 'bg-orange-400 text-white'
                                  }`}
                                >
                                  {item.count}
                                </span>
                              )}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Cases Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-400 uppercase tracking-wide mb-3">CASES</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-3 px-3 py-2 gap-2 text-lg font-medium text-slate-500 hover:bg-gray-50 rounded-lg"
                >
                  <img src="./icons/memo-icon.svg" alt="Memo Icon" className="w-5 h-5" />
                  <span>Memo</span>
                </a>
              </li>
              <li>
              <a
                href="#"
                className="flex items-center space-x-3 px-3 py-2 text-lg font-medium gap-2 text-slate-500 hover:bg-gray-50 rounded-lg"
              >
                <img src="./icons/settings-icon.svg" alt="Settings Icon" className="w-5 h-5" />
                <span>Settings</span>
              </a>
            </li>
            </ul>
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-200">
          <ul className="space-y-2">
          
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 px-3 py-2 text-lg font-medium gap-2 text-slate-500 hover:bg-gray-50 rounded-lg"
              >
                <img src="./icons/logout-icon.svg" alt="Logout Icon" className="w-5 h-5" />
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideNav;