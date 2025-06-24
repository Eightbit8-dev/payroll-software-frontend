import React from "react";
import { type ConfigCardtype } from "../../types/ConfigCard";

const ConfigCard: React.FC<ConfigCardtype> = ({
  img,
  title,
  desc,
  label,
  labelColor,
  btnText,
  onAction,
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-xl   rounded-2xl border-2 border-slate-300 px-4 py-5 w-full cursor-default">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {/* Placeholder Icon */}

            <img src={img} alt="icon" className=" w-8 h-8" />

            <h2 className="text-xl font-medium text-zinc-800">{title}</h2>
          </div>
          <span
            className={`text-white text-sm font-medium px-2 py-[6px] rounded-[8px] ${labelColor}`}
          >
            {label}
          </span>
        </div>
        <p className="text-slate-500 text-base font-medium mb-4">{desc}</p>
        <div>
          <button
            onClick={onAction}
            className="bg-[#3A74D3] rounded-[12px] mt-auto text-white  text-base font-medium px-3 py-2  flex items-center gap-2 cursor-pointer hover:bg-[#2a5bb0] transition-colors duration-200 active:bg-[#2a5bb0"
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
