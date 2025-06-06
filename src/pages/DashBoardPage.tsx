import React from "react";

const DashBoardPage: React.FC = () => {
  return (
    <div className="dashboard-page-container flex flex-row w-full">
      {/* Left side */}
      <section className="employee-overfiew flex w-max px-6 py-4">
        <div className="heading-and-back-button-container text-lg font-medium flex items-center gap-2">
          <button className="back-button p-1 bg-slate-100  rounded-full hover:bg-slate-200 active:bg-blue-500 cursor-pointer gr transition-all ease-in-out duration-150">
            <img
              className="transform rotate-180 "
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
