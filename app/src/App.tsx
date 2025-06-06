import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Page routes
import { appRoutes } from "./routes/appRoutes";

//Pages
import ErrorPage from "./pages/ErrorPage";
const AuthenticationPage = lazy(() => import("./pages/AuthPage"));

export const App = () => {
  return (
    <Router>
      <Suspense fallback={<h1>Loading</h1>}>
        <Routes>
          <Route path="/*" element={<ErrorPage />} />
          <Route
            path={appRoutes.authenticationPage}
            element={<AuthenticationPage />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
};
