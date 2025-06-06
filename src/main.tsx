import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import MainLayout from "./components/layout/MainLayout";
if (import.meta.env.VITE_MODE === "development") {
  const script = document.createElement("script");
  script.src = "https://unpkg.com/react-scan/dist/auto.global.js";
  script.async = true;
  document.head.appendChild(script);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainLayout>
      <App />
    </MainLayout>
  </StrictMode>
);
