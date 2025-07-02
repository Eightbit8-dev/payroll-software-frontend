import React from "react";
import { useNavigate } from "react-router-dom";

interface PageTitleAndDescriptionProps {
  title: string;
}

const PageHeader: React.FC<PageTitleAndDescriptionProps> = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row items-center justify-start gap-2">
      <button
        className="min-h-6 min-w-6 cursor-pointer items-center justify-start rounded-full bg-blue-500"
        onClick={() => navigate(-1)}
      >
        <img className="aspect-auto" src="/icons/back-icon.svg" alt="back " />
      </button>
      <h1 className="my-1 flex w-max text-start text-lg font-semibold text-zinc-800">
        {title}
      </h1>
    </div>
  );
};

export default PageHeader;
