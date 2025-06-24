import React from "react";

/**
 * Reusable Textarea component for multiline string input.
 * Can be used in forms with prefix text, maxLength, and controlled value.
 */
interface TextareaProps {
  /** Label title above the textarea */
  title: string;
  /** Placeholder text for the textarea */
  placeholder?: string;
  /** Current textarea value */
  inputValue: string;
  /**
   * Callback triggered on value change
   * @param value - New value of textarea
   */
  onChange: (value: string) => void;
  /** Optional input `name` attribute */
  name?: string;
  /** Prefix label shown before the textarea (e.g., ₹ or +91) */
  prefixText?: string;
  /** Maximum character length */
  maxLength?: number;
}

const Textarea: React.FC<TextareaProps> = ({
  title,
  placeholder = "",
  inputValue,
  onChange,
  name = "",
  prefixText = "",
  maxLength = 500,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const raw = e.target.value;
    if (raw.length <= maxLength) {
      onChange(raw);
    }
  };

  return (
    <div className="relative w-full min-w-[180px] self-stretch">
      <h3 className="mb-0.5 w-full justify-start text-xs leading-loose font-semibold text-slate-700">
        {title}
      </h3>
      <div className="input-container flex cursor-text flex-row items-start justify-center gap-0 overflow-clip rounded-2xl border-2 border-slate-300 bg-white transition-all focus-within:border-slate-500">
        {prefixText && (
          <div className="flex h-full items-start justify-start bg-slate-100 px-3 py-2 text-base leading-loose font-medium text-gray-800">
            {prefixText}
          </div>
        )}
        <textarea
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
          value={inputValue}
          maxLength={maxLength}
          className="w-full resize-none px-4 py-[14px] text-start text-sm font-medium text-slate-600 autofill:text-black focus:outline-none"
          rows={4}
        />
      </div>
    </div>
  );
};

export default Textarea;
