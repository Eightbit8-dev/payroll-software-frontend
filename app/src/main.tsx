import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const App = () => {
  return (
    <div className=" flex flex-row bg-black py-8 items-start justify-center gap-16 text-white">
      {/* Headlines */}
      <div className="flex flex-col ">
        <h4 className="headline-6 text-primary mb-4">Headlines</h4>
        <h1 className="headline-1 text-white  shadow-amber-50">Heading 1</h1>
        <div className="headline-2">Headline 2</div>
        <div className="headline-3">Headline 3</div>
        <div className="headline-4">Headline 4</div>
        <div className="headline-5">Headline 5</div>
        <div className="headline-6">Headline 6</div>
        <div className="headline-7">Headline 7</div>
      </div>

      {/* Body Text */}
      <div className="space-y-4 flex flex-col">
        <h4 className="headline-6 text-primary mb-4">Body</h4>
        <div className="body-1">
          Body 1 - Primary content text for main paragraphs
        </div>
        <div className="body-1-semi">Body 1 Semi - Medium weight variation</div>
        <div className="body-1-bold">Body 1 Bold - Bold emphasis text</div>
        {/* body 2 */}
        <div className="body-2">
          Body 2 - Primary content text for main paragraphs
        </div>
        <div className="body-2-semi">Body 2 Semi - Medium weight variation</div>
        <div className="body-2-bold">Body 2 Bold - Bold emphasis text</div>
        <div className="caption space-y-4 flex flex-col">
          <h4 className="headline-6 text-primary mb-4">Captions</h4>
          <div className="caption-1">
            Caption 1 - Primary content text for main paragraphs
          </div>
          <div className="caption-1-semi">
            Caption 1 Semi - Medium weight variation
          </div>
          <div className="caption-1-bold">
            Caption 1 Bold - Bold emphasis text
          </div>
          {/* caption 2 */}
          <div className="caption-2">
            Caption-2 - Primary content text for main paragraphs
          </div>
          <div className="caption-2-semi">
            Caption-2 Semi - Medium weight variation
          </div>
          <div className="caption-2-bold">
            Caption-2 Bold - Bold emphasis text
          </div>
        </div>

        <div className="hairline-1">Hairline 1 - Section Headers</div>
        <div className="hairline-2">Hairline 2 - Small Headers</div>
        {/* buttons */}
        <div className="button-xl">Button XL - Extra Large button text</div>
        <div className="button-l">Button L - Large button text</div>
        <div className="button-m"> Button M - Medium button text</div>
        <div className="button-s"> Button S - Small button text</div>
        <div className="button-xs">Button XS - Extra Small button text</div>
      </div>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
