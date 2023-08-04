import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
function HeaderAccordion({ items, mobile }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (index) => {
    setIsOpen(false);
    console.log(index);
  };

  const handleClickLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const render = items.map((item, index) => {
    return (
      <li
        className="flex items-center gap-4 xldektop:gap-8 mb-3  hover:bg-thirdColor hover:text-gray-600 rounded-md cursor-pointer"
        key={index}
        onClick={() => handleSelect(index)}
      >
        <div>{item.icon}</div>
        <div className="text-start ">
          {item.label === "Çıkış" ? (
            <a onClick={handleClickLogout} className="text-start font-semibold">
              {item.label}
            </a>
          ) : (
            <a className="text-start font-semibold">{item.label}</a>
          )}
        </div>
      </li>
    );
  });

  return (
    <div className="relative">
      <div
        className="flex items-center justify-between 
        tablet:justify-center
        tablet:w-10 tablet:h-10 w-full h-10 border-black tablet:rounded-full  bg-secondColor text-gray-900 font-semibold cursor-pointer"
        onClick={handleClick}
      >
        {mobile && <p className="m-2 text-sm">Kullanıcı Bilgileri</p>}
        <AiOutlineUser size={isOpen ? "22" : "18"} className="m-2" />
      </div>
      {isOpen && (
        <div className="absolute mt-3 right-0 w-44 z-10 xldektop:w-56">
          <ul className="flex flex-col border-black bg-secondColor rounded-md px-4 pt-3 pb-1">
            {render}
          </ul>
        </div>
      )}
    </div>
  );
}
export default HeaderAccordion;
