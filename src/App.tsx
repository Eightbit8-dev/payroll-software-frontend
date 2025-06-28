import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import MainLayout from "./components/layout/MainLayout";

// Routes
import { appRoutes } from "./routes/appRoutes";
import { Spinner } from "./components/layout/Spinner";
import ProtectedRoute from "./components/layout/ProtectedRoute";

// Pages
const AttendancePage = lazy(() => import("./pages/AttendancePage"));
const DashBoardPage = lazy(() => import("./pages/DashBoardPage"));
const EmployeesPage = lazy(() => import("./pages/EmployeesPage"));
const LoanPage = lazy(() => import("./pages/LoanPage"));
const UsersPage = lazy(() => import("./pages/UsersPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));

// Master Pages
const MasterPage = lazy(() => import("./pages/MasterPages/MasterPage"));
const BranchesPage = lazy(
  () => import("./pages/MasterPages/Branch/BranchesPage"),
);
const DepartmentsPage = lazy(
  () => import("./pages/MasterPages/Department/DepartmentPage"),
);

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <Routes>
        {/* Auth route */}
        <Route path={appRoutes.signInPage} element={<SignInPage />} />

        {/* Other Routes */}
        <Route
          path="/"
          element={<Navigate to={appRoutes.dashboardPage} replace />}
        />
        <Route path="*" element={<ErrorPage />} />

        {/* Main Layout Routes */}
        {/* These are all authenticated routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path={appRoutes.dashboardPage} element={<DashBoardPage />} />
            <Route
              path={appRoutes.attendancePage}
              element={<AttendancePage />}
            />
            <Route path={appRoutes.employeesPage} element={<EmployeesPage />} />
            <Route path={appRoutes.loanPage} element={<LoanPage />} />

            {/* Master Page and its nested components */}
            <Route
              path={appRoutes.masterRoutes.masterPage}
              element={<MasterPage />}
            />
            {/* Branches pages */}
            <Route
              path={appRoutes.masterRoutes.children.branches}
              element={<BranchesPage />}
            />

            {/* Department Pages */}
            <Route
              path={appRoutes.masterRoutes.children.departments}
              element={<DepartmentsPage />}
            />

            <Route path={appRoutes.usersPage} element={<UsersPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
