export const appRoutes = {
  homePage: "/",
  // Master Page Routes
  masterRoutes: {
    masterPage: "/master",
    children: {
      branches: "/master/branches",
      departments: "/master/departments",
      designations: "/master/designations",
      resignations: "/master/resignations",
      bloodGroups: "/master/blood-groups",
      attendance: "/master/attendance",
      permissions: "/master/permissions",
      lop: "/master/lop",
      shifts: "/master/shifts",
      holidays: "/master/holidays",
      loans: "/master/loans",
      allowances: "/master/allowances",
    },
  },
  signInPage: "/signin",
  dashboardPage: "/dashboard",
  attendancePage: "/attendance",
  employeesPage: "/employees",
  loanPage: "/loan",
  usersPage: "/users",

  // Error page
  errorPage: "/error",
};
