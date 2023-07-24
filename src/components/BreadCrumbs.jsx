const BreadCrumbs = ({ header, subtitle }) => {
  const generalStyle = "flex items-center mt-4 ml-8"; // Tailwind CSS classes

  const mainTextStyle =
    "font-poppins text-base font-medium leading-6 text-gray-800"; // Tailwind CSS classes

  const fullTextStyle =
    "font-poppins text-xs font-light leading-6 text-gray-800 ml-1"; // Tailwind CSS classes

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
