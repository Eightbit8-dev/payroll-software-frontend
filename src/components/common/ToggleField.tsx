import React from "react";

interface ToggleFieldProps {
  title: string;
  subtitle: string;
  value: boolean;
  onToggle: (val: boolean) => void;
  disabled?: boolean;
}

const ToggleField: React.FC<ToggleFieldProps> = ({
  title,
  subtitle,
  value,
  onToggle,
  disabled = false,
}) => {
  return (
    <div className="relative w-full min-w-[180px] self-stretch">
      <h3 className="mb-0.5 w-full justify-start text-xs leading-loose font-semibold text-slate-700">
        {title}
      </h3>

      <div className="flex items-center justify-between rounded-xl border-2 border-slate-300 bg-white px-4 py-3">
        <span className="text-sm font-medium text-slate-700">{subtitle}</span>

        <label
          className={`relative inline-flex ${disabled ? "cursor-default" : "cursor-pointer"} items-center`}
        >
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => onToggle(e.target.checked)}
            disabled={disabled}
            className="peer sr-only"
          />
          <div className="peer h-5 w-9 rounded-full bg-slate-300 transition-all duration-200 peer-checked:bg-blue-500 peer-focus:outline-none"></div>
          <div className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all duration-200 peer-checked:translate-x-4"></div>
        </label>
      </div>
    </div>
  );
};

export default ToggleField;
