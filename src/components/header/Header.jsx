import HeaderAccordion from "./HeaderAccordion";
import { BiSolidUser } from "react-icons/bi";
import { FaExchangeAlt } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { FaUserCircle } from "react-icons/fa";
import Accordion from "../Accordion";
import Sidebar from "../sidebar/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import MobileSidebar from "../sidebar/mobile-sidebar/MobileSidebar";
import Logo from "../../assets/images/logo.png";
import Btlogo from "../../assets/images/bilgeteknolojilogo";
import { Link } from "react-router-dom";
function Header() {
  const headerAccordion = [
    { label: "Profil Bilgileri", icon: <BiSolidUser /> },
    { label: "Rol Değiştir", icon: <FaExchangeAlt /> },
    { label: "Çıkış", icon: <ImExit /> },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div className="h-20 laptop:h-24 xldesktop:h-28  bg-firstColor flex items-center justify-between gap-x-4">
      <p className="ml-4 hidden tablet:block text-white font-medium text-3xl xldektop:text-4xl ">
        Survey App
      </p>     
      <Link to={"/yonetici-sayfasi"} className="tablet:hidden">
        <Btlogo />
      </Link>
      <div className="hidden tablet:block mr-10 tablet:flex-col-reverse">
        <HeaderAccordion items={headerAccordion} />
      </div>
      {!isOpen && (
        <div className="tablet:hidden">
          <GiHamburgerMenu
            size={28}
            color="white"
            className="mr-3"
            onClick={handleClick}
          />
        </div>
      )}
      {isOpen && (
        <MobileSidebar
          isOpen={isOpen}
          onClose={handleClose}
          itemsAccordion={headerAccordion}
          mobile={false}
        />
      )}
    </div>
  );
}
export default Header;
