import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Auth from "./pages/Auth";

const App = () => {
  return (
    <div>
      <Auth/>
   </div>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
