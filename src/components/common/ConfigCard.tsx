import React from "react";
import { type ConfigCardtype } from "../../types/ConfigCard";

const ConfigCard:React.FC<ConfigCardtype> = ({img, title, desc, label, labelColor, btnText, onAction }) => {
  return (
    <div className="bg-white shadow-md rounded-lg px-4 py-5 w-full ">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {/* Placeholder Icon */}
          <div className="w-8 h-8">
            <img src={img} alt="icon" className="w-full h-full" />
          </div>
          <h2 className="text-2xl font-medium text-zinc-800">{title}</h2>
        </div>
        <span
          className={`text-white text-base font-medium px-2 py-[6px] rounded-[6px] ${labelColor}`}
        >
          {label}
        </span>
      </div>
      <p className="text-slate-500 text-lg font-medium mb-4">
        {desc}
      </p>
      <div>
        <button
        onClick={onAction}
        className="bg-[#3A74D3] rounded-[10px] text-white  text-lg font-medium px-3 py-2 rounded flex items-center gap-2"
      >
        {btnText}
        <span className="">→</span>
      </button>
      </div>
      </div>
    </div>
  );
};

export default ConfigCard;
