import React from "react";

interface PageTitleAndDescriptionProps {
  title: string;
  subtitle: string;
}

const PageTitleAndDescription: React.FC<PageTitleAndDescriptionProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div>
      <h1 className="text-start text-xl font-semibold text-zinc-800">
        {" "}
        {title}
      </h1>
      <p className="text-md text-start font-medium text-slate-500">
        {subtitle}
      </p>
    </div>
  );
};

export default PageTitleAndDescription;
