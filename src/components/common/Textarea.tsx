import React from "react";

interface TextAreaProps {
  title: string;
  placeholder?: string;
  inputValue: string;
  onChange: (value: string) => void;
  name?: string;
  prefixText?: string;
  maxLength?: number;
  disabled?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  title,
  placeholder = "",
  inputValue,
  onChange,
  name = "",
  prefixText = "",
  maxLength = 100,
  disabled = false,
}) => {
  const [count, setCount] = React.useState<string>(
    (inputValue ?? "").length.toString(),
  );
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      onChange(value);
      setCount(value.length.toString());
    }
  };

  return (
    <div className="relative w-full min-w-[180px] self-stretch">
      <div className="flex min-w-full flex-row items-center justify-between">
        <h3 className="mb-0.5 w-full justify-start text-xs leading-loose font-semibold text-slate-700">
          {title}
        </h3>
        <h3 className="mb-0.5 justify-start text-xs leading-loose font-semibold text-slate-700">
          {count}/{maxLength}
        </h3>
      </div>
      <div className="input-container flex cursor-text flex-row items-center justify-center gap-0 overflow-clip rounded-xl border-2 border-slate-300 bg-white transition-all focus-within:border-slate-500">
        {prefixText && (
          <div className="flex h-full items-center justify-start bg-slate-100 px-3 py-2 text-sm leading-loose font-medium text-slate-700">
            {prefixText}
          </div>
        )}
        <textarea
          readOnly={disabled}
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
          value={inputValue}
          maxLength={maxLength}
          className="min-h-max w-full px-4 py-[14px] text-start text-sm font-medium text-slate-600 autofill:text-black focus:outline-none"
          rows={4}
        />
      </div>
    </div>
  );
};

export default TextArea;
