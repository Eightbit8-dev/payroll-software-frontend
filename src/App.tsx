import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import MainLayout from "./components/layout/MainLayout";

// Routes
import { appRoutes } from "./routes/appRoutes";
import { Spinner } from "./components/layout/Spinner";

// Pages
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const HomePage = lazy(() => import("./pages/DashBoardPage"));
const FundsPage = lazy(() => import("./pages/FundsPages/FundsPage"));
const MemoPage = lazy(() => import("./pages/MemoPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const DepartmentPage = lazy(
  () => import("./pages/CompanyPages/DepartmentPage")
);
const EmployeePage = lazy(() => import("./pages/CompanyPages/EmployeePage"));
const TeamPage = lazy(() => import("./pages/CompanyPages/TeamPage"));
const TaxInvoicePage = lazy(() => import("./pages/FundsPages/TaxInvoicePage"));
const LeaveRequestsPage = lazy(
  () => import("./pages/ApprovalPages/LeaveRequestsPage")
);
const SchedulePage = lazy(() => import("./pages/ApprovalPages/SchedulesPage"));
const AuthenticationPage = lazy(() => import("./pages/AuthPage"));

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-full h-screen">
          <Spinner />
        </div>
      }
    >
      <Routes>
        {/* Auth Page - No Layout */}
        <Route
          path={appRoutes.authenticationPage}
          element={<AuthenticationPage />}
        />

        {/* Main Layout Routes */}
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={<Navigate to={appRoutes.dashboardPage} replace />}
          />
          <Route path="*" element={<ErrorPage />} />
          <Route path={appRoutes.dashboardPage} element={<HomePage />} />

          {/* Company */}
          <Route path={appRoutes.departmentPage} element={<DepartmentPage />} />
          <Route path={appRoutes.employeePage} element={<EmployeePage />} />
          <Route path={appRoutes.teamPage} element={<TeamPage />} />

          {/* Funds */}
          <Route path={appRoutes.payRollPage} element={<FundsPage />} />
          <Route path={appRoutes.taxInvoicePage} element={<TaxInvoicePage />} />

          {/* Approvals */}
          <Route
            path={appRoutes.leaveRequestsPage}
            element={<LeaveRequestsPage />}
          />
          <Route path={appRoutes.schedulePage} element={<SchedulePage />} />

          {/* Others */}
          <Route path={appRoutes.memoPage} element={<MemoPage />} />
          <Route path={appRoutes.SettingsPage} element={<SettingsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
