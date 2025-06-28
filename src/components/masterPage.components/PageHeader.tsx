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
        className="h-6 w-6 items-center justify-start rounded-full bg-blue-500"
        onClick={() => navigate(-1)}
      >
        <img src="/icons/back-icon.svg" alt="back " />
      </button>
      <h1 className="my-1 text-start text-lg font-semibold text-zinc-800">
        {title}
      </h1>
    </div>
  );
};

export default PageHeader;
