import React from "react";

const ErrorPage: React.FC = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3">
      <h1 className="w-full text-center text-2xl font-medium text-slate-800">
        Page Not Found! Check the URL
      </h1>
    </div>
  );
};

export default ErrorPage;
