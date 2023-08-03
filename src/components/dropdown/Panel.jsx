import classNames from "classnames";

function Panel({ children, className, ...rest }) {
  const finalClassNames = classNames(
    "border rounded p-2 tablet:p-3 shadow bg-white w-48",
    className
  );

  return (
    <div {...rest} className={finalClassNames}>
      {children}
    </div>
  );
}
export default Panel;
