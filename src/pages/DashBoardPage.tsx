import React from "react";

const DashBoardPage: React.FC = () => {
  return (
    <div className="dashboard-page-container flex w-full flex-row">
      {/* Left side */}
      <section className="employee-overfiew flex w-max px-6 py-4">
        <div className="heading-and-back-button-container flex items-center gap-2 text-lg font-medium">
          <button className="back-button gr cursor-pointer rounded-full bg-slate-100 p-1 transition-all duration-150 ease-in-out hover:bg-slate-200 active:bg-blue-500">
            <img
              className="rotate-180 transform"
              src="./icons/arrow-icon.svg"
              alt="back"
            />
          </button>
          <h3 className="text-zinc-800">
            Employee <span className="text-blue-500">#7125ECB1</span>
          </h3>
        </div>
      </section>
      {/* Right side */}
      <section className="employee-more-details"></section>
    </div>
  );
};

export default DashBoardPage;
