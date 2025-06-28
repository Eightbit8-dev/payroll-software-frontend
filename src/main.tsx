import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "./index.css";

if (import.meta.env.VITE_MODE === "development") {
  const script = document.createElement("script");
  script.src = "https://unpkg.com/react-scan/dist/auto.global.js";
  script.async = true;
  document.head.appendChild(script);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <ToastContainer
          position={"top-right"}
          autoClose={1500}
          theme="light"
          pauseOnHover={true}
          closeButton={false}
          limit={3}
        />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
