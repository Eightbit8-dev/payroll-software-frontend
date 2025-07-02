import React, { useState, useRef, useEffect } from "react";

export interface DropdownOption {
  label: string;
  id: number;
}

interface DropdownSelectProps {
  title?: string;
  options: DropdownOption[];
  selected: DropdownOption;
  onChange: (option: DropdownOption) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  disabled = false,
  title,
  options,
  selected,
  onChange,
  required = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: DropdownOption) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div
      className={`relative w-full min-w-[180px] self-stretch ${className}`}
      ref={dropdownRef}
    >
      {title && (
        <h3 className="mb-0.5 w-full justify-start text-xs leading-loose font-semibold text-slate-700">
          {title}
          {required && <span className="text-red-500">*</span>}
        </h3>
      )}

      <div
        onClick={toggleDropdown}
        className={`input-container flex cursor-pointer flex-row items-center justify-between rounded-xl border-2 border-slate-300 bg-white px-3 py-3 transition-all ${
          isOpen ? "border-slate-500" : ""
        } ${disabled ? "pointer-events-none " : ""}`}
      >
        <span className="text-sm font-medium text-slate-600">
          {selected.label}
        </span>
        <img
          src="/icons/dropdown.svg"
          alt="Dropdown icon"
          className="h-4 w-4"
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          {options.map((option) => (
            <button
              key={option.label}
              onClick={() => handleSelect(option)}
              className={`flex w-full cursor-pointer items-center justify-between px-4 py-2 hover:bg-slate-100 ${
                selected.label === option.label
                  ? "font-semibold text-blue-600"
                  : "text-slate-700"
              }`}
            >
              <span className="text-sm">{option.label}</span>
              {selected.label === option.label && (
                <img
                  src="/icons/tick-icon-dark.svg"
                  alt="Selected"
                  className="h-4 w-4"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownSelect;
