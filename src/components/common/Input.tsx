import React from "react";

type InputType = "str" | "num";

/**
 * Generic Input component for handling both string and number values.
 * Can be used in reusable forms with strict type control and validation.
 *
 * @template T - Input value type (string | number)
 */
interface InputProps<T extends string | number> {
  /** Label title above the input field */
  title: string;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Current input value */
  inputValue: T;
  /**
   * Callback triggered on value change
   * @param value - New value of input
   */
  onChange: (value: T) => void;
  /** Input type - "str" for text, "num" for number */
  type?: InputType;
  /** Optional input `name` attribute */
  name?: string;
  /** Prefix label shown before the input (e.g., ₹ or +91) */
  prefixText?: string;
  /** Maximum character length (applies to string input only) */
  maxLength?: number;
  /** Minimum numeric value allowed (for type="num") */
  min?: number;
  /** Maximum numeric value allowed (for type="num") */
  max?: number;
  disabled?: boolean;
  required?: boolean;
}

/**
 * Reusable Input component with strict typing and smart constraints.
 * Supports both text and number fields, with prefix, length limits, and min/max validation.
 *
 * @example
 * ```tsx
 * <Input
 *   title="Phone Number"
 *   inputValue={phone}
 *   onChange={(val) => setPhone(val)}
 *   type="num"
 *   prefixText="+91"
 *   max={9999999999}
 * />
 * ```
 */
const Input = <T extends string | number>({
  required = false,
  title,
  placeholder = "",
  inputValue,
  onChange,
  type = "str",
  name = "",
  prefixText = "",
  maxLength = 36,
  min,
  max,
  disabled = false,
}: InputProps<T>) => {
  const inputType = type === "num" ? "number" : "text";

  /**
   * Handles input changes with type-aware validation.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    if (type === "num") {
      const num = Number(raw);
      if (raw === "") {
        onChange("" as T);
        return;
      }
      if (!isNaN(num)) {
        if (
          (min !== undefined && num < min) ||
          (max !== undefined && num > max)
        )
          return;
        onChange(num as T);
      }
    } else {
      if (raw.length > maxLength) return;
      onChange(raw as T);
    }
  };

  return (
    <div className="relative w-full min-w-[180px] self-stretch">
      <h3 className="mb-0.5 w-full justify-start text-xs leading-loose font-semibold text-slate-700">
        {title}
      </h3>
      <div className="input-container flex cursor-text flex-row items-center justify-center gap-0 overflow-clip rounded-xl border-2 border-slate-300 bg-white transition-all focus-within:border-slate-500">
        {prefixText && (
          <div className="flex h-full items-center justify-start bg-slate-100 px-3 py-2 text-sm leading-loose font-medium text-slate-700">
            {prefixText}
          </div>
        )}
        <input
          required
          readOnly={disabled}
          disabled={disabled}
          type={inputType}
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
          value={inputValue}
          className={`min-h-max w-full px-3 py-3 text-start text-sm font-medium text-slate-600 autofill:text-black focus:outline-none`}
          maxLength={type === "str" ? maxLength : undefined}
          min={type === "num" ? min : undefined}
          max={type === "num" ? max : undefined}
        />
      </div>
    </div>
  );
};

export default Input;

interface InputCheckboxProps {
  title: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
}

/**
 * Checkbox component styled like the main Input component.
 * Label on the left, checkbox on the right inside bordered container.
 */
export const InputCheckbox: React.FC<InputCheckboxProps> = ({
  title,
  checked,
  disabled = false,
  onChange,
}) => {
  return (
    <div className="relative w-full min-w-[180px] self-stretch">
      <div
        className={`input-container flex flex-row items-center justify-between rounded-xl border-2 border-slate-300 bg-white px-4 py-2 transition-all duration-200 ease-in-out`}
      >
        <span className="text-sm font-medium text-slate-600">{title}</span>

        <div className="relative flex items-center">
          <input
            type="checkbox"
            id={`checkbox-${title}`}
            className="sr-only"
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange(e.target.checked)}
          />
          <label
            htmlFor={`checkbox-${title}`}
            className={`relative block h-5 w-5 ${disabled ? "cursor-default" : "cursor-pointer"} rounded-[8px] border-2 p-[12px] transition-all outline-none focus:outline-none ${
              checked
                ? "border-green-500 bg-green-500"
                : "border-slate-300 bg-white"
            }`}
          >
            {checked && (
              <img
                className="pointer-events-none absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 cursor-default select-none"
                src="/icons/tick-icon.svg"
                alt="tick"
              />
            )}
          </label>
        </div>
      </div>
    </div>
  );
};
