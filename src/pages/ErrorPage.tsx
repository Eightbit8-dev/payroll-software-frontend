import React from "react";

const ErrorPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center h-screen gap-3 ">
      <h1 className="text-3xl text-center w-full text-slate-800 font-medium">
        Page Not Found! Check the URL
      </h1>
      <img
        src="/images/sad-cat.jpg"
        alt="Sad cat"
        className="max-w-xs rounded-2xl"
      />
    </div>
  );
};

export default ErrorPage;
