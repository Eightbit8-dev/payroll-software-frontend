import {
  BrowserRouter as Router,
  Routes,
  Route,  
  Navigate,
} from "react-router-dom";
import { Suspense, lazy } from "react";

// Page routes
import { appRoutes } from "./routes/appRoutes";

//Pages
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/DashBoardPage";
import FundsPage from "./pages/FundsPages/FundsPage";
import MemoPage from "./pages/MemoPage";
import SettingsPage from "./pages/SettingsPage";
import DepartmentPage from "./pages/CompanyPages/DepartmentPage";
import EmployeePage from "./pages/CompanyPages/EmployeePage";
import TeamPage from "./pages/CompanyPages/TeamPage";
import TaxInvoicePage from "./pages/FundsPages/TaxInvoicePage";
import LeaveRequestsPage from "./pages/ApprovalPages/LeaveRequestsPage";
import SchedulePage from "./pages/ApprovalPages/SchedulesPage";
const AuthenticationPage = lazy(() => import("./pages/AuthPage"));

export const App = () => {
  return (
    <Router>
      <Suspense fallback={<h1>Loading</h1>}>
        <Routes>
          <Route path="/*" element={<ErrorPage />} />
          <Route
            path="/"
            element={<Navigate to={appRoutes.dashboardPage} replace />}
          />

          <Route path={appRoutes.dashboardPage} element={<HomePage />} />

          {/* Company Pages*/}
          <Route path={appRoutes.departmentPage} element={<DepartmentPage />} />
          <Route path={appRoutes.employeePage} element={<EmployeePage />} />
          <Route path={appRoutes.teamPage} element={<TeamPage />} />

          {/* Funds Pages */}
          <Route path={appRoutes.payRollPage} element={<FundsPage />} />
          <Route path={appRoutes.taxInvoicePage} element={<TaxInvoicePage />} />

          {/* Approval Pages */}
          <Route
            path={appRoutes.leaveRequestsPage}
            element={<LeaveRequestsPage />}
          />
          <Route path={appRoutes.schedulePage} element={<SchedulePage />} />

          {/* memo page */}
          <Route path={appRoutes.memoPage} element={<MemoPage />} />

          {/* settings page */}
          <Route path={appRoutes.SettingsPage} element={<SettingsPage />} />
          <Route
            path={appRoutes.authenticationPage}
            element={<AuthenticationPage />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
};
