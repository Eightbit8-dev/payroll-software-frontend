interface ChipProps {
  label: string;
  isEditable?: boolean;
  onRemove?: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, isEditable = false, onRemove }) => {
  return (
    <div className="flex items-center rounded-md border border-blue-500 bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
      {label}
      {isEditable && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-2 text-blue-500 hover:text-blue-600"
        >
          <img
            className="cursor-pointer transition-all duration-200 ease-in-out transform-3d hover:scale-102"
            src="/icons/chip-x-icon.svg"
            alt="x"
          />
        </button>
      )}
    </div>
  );
};

export default Chip;
