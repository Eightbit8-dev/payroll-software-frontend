import React from "react";
import ButtonSm from "../common/Buttons";

interface CreateNewItemBarProps {
  iconSrc: string;
  title: string;
  onClick: () => void;
}

const CreateNewItemBar: React.FC<CreateNewItemBarProps> = ({
  iconSrc,
  onClick,
  title,
}) => {
  return (
    <div className="flex w-full flex-row items-center gap-6 rounded-[12px] bg-white px-4 py-3 shadow-sm">
      <img className="w-8" src={iconSrc} alt="" />
      <h2 className="text-md text-start font-semibold text-zinc-800">
        {title}
      </h2>
      {/* <button
        className="flex cursor-pointer flex-row items-center gap-2 rounded-[6px] bg-blue-500 px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-600 active:bg-blue-700"
        onClick={onClick}
      >
        Add new
        <img src="/icons/plus-icon.svg" alt="plus" />
      </button> */}
      <ButtonSm
        state="default"
        text="Add new"
        imgUrl="/icons/plus-icon.svg"
        onClick={onClick}
      />
    </div>
  );
};

export default CreateNewItemBar;
