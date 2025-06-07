import React from "react";

const EmployeePage: React.FC = () => {
  return (
    <section className="employee-page-container flex flex-row w-full blue-gradient min-h-[1500px] items-start justify-start">
      {/* left side */}
      <section className="employee-overfiew flex w-max px-6 py-4 bg-white flex-col items-start justify-center gap-4">
        <div className="heading-and-back-button-container text-lg font-medium flex items-center gap-2">
          <button className="back-button p-1 bg-slate-100  rounded-full hover:bg-slate-200 active:bg-blue-500 cursor-pointer gr transition-all ease-in-out duration-150">
            <img
              className="transform rotate-180 "
              src="/icons/arrow-icon.svg"
              alt="back"
            />
          </button>
          <h3 className="text-zinc-800">
            Employee <span className="text-blue-500">#7125ECB1</span>
          </h3>
        </div>
        <div className="profile-container w-full flex flex-col py-6 gap-3 items-center justify-center">
          <img
            className="w-24 h-24 rounded-full object-cover"
            src="/images/profile.png"
            alt="profile"
          />
          <div className="name-and-pose flex flex-col gap-0 items-center justify-center">
            <h2 className="text-lg font-medium text-zinc-800">John Doe</h2>
            <h3 className="text-base font-normal text-slate-500">
              Backend Developer
            </h3>
          </div>

          <div className="icons-row flex flex-row gap-4 my-2">
            <img src="/icons/ig.svg" alt="ig" />
            <img src="/icons/linkedin.svg" alt="linkedin" />
            <img src="/icons/mail.svg" alt="mail" />
          </div>
          <h3 className="text-lg font-medium text-slate-500 w-full text-start">
            Company
          </h3>
          <div className="name-and-pose flex flex-col gap-0 items-center justify-center">
            <h3 className="text-base font-normal text-slate-500">
              Backend Developer
            </h3>
            <h2 className="text-lg font-medium text-zinc-800">John Doe</h2>
          </div>
          <h3 className="text-lg font-medium text-slate-500 w-full text-start">
            Funds & Approval
          </h3>
        </div>
      </section>
      {/* Right side */}
      <section className="employee-more-details"></section>
    </section>
  );
};

export default EmployeePage;
