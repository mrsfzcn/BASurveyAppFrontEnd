const BreadCrumbs = ({ header, subtitle }) => {
  const generalStyle = "flex items-center mt-4 ml-8";

  const mainTextStyle =
    "font-poppins text-base font-medium leading-6 text-gray-800";

  const fullTextStyle =
    "font-poppins text-xs font-light leading-6 text-gray-800 ml-1";

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
        <h6>
          <a href={header.href}>{header.header} | </a>
        </h6>
      </div>
      <div className={fullTextStyle}>
        <p>{renderedSubtitle}</p>
      </div>
    </div>
  );
};

export default BreadCrumbs;
