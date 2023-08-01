import { useState } from "react";
import { AiOutlineQuestion } from "react-icons/ai";
const BreadCrumbs = ({ header, subtitle }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const generalStyle = "flex items-center mt-3 ml-4";

  const mainTextStyle =
    "text-xs tablet:text-base tracking-wide font-medium leading-3 text-gray-800";

  const fullTextStyle =
    "text-[10px] tablet:text-sm font-light tablet:font-normal tracking-normal leading-3 text-gray-900 ml-1";

  const renderedSubtitle = subtitle.map((item, index) => (
    <span key={index}>
      <a className="ml-0.5" href={item.href}>
        {item.title}
      </a>
      {index === subtitle.length - 1 ? "" : ">"}
    </span>
  ));

  return (
    <div className={generalStyle}>
      <div className={mainTextStyle}>
        <h6
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <a href={header.href}>{header.header} | </a>
          {showTooltip && (
            <div className="absolute bg-white border border-gray-200 rounded p-2 shadow-md w-72 tablet:w-96 mt-2 z-10 font-thin text-sm ">
              <p>{header.describe}</p>
            </div>
          )}
        </h6>
      </div>
      <div className={fullTextStyle}>
        <p>{renderedSubtitle}</p>
      </div>
    </div>
  );
};

export default BreadCrumbs;
