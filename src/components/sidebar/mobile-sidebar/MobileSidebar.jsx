import React from "react";
import Accordion from "../../Accordion";
import "./mobilesidebar.css";
import { AiOutlineClose } from "react-icons/ai";
import { items } from "../SidebarData";
import HeaderAccordion from "../../header/HeaderAccordion";
const MobileSidebar = ({ isOpen, onClose, itemsAccordion }) => {
  return (
    <React.Fragment>
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50"
          onClick={onClose}
        />
      )}
      <div
        className={`mobile-sidebar ${
          isOpen ? "open" : ""
        } fixed top-0 right-0 bottom-0 w-52 max-w-500 bg-firstColor shadow-lg px-2 transform transition-transform ease-in-out tablet:hidden z-30`}
      >
        <div className="flex flex-col justify-between gap-6">
          <div className="flex flex-col">
            <AiOutlineClose
              color="white"
              size={28}
              className="mt-8 self-end"
              onClick={onClose}
            />
            <Accordion items={items} />
          </div>
          <div>
            <HeaderAccordion items={itemsAccordion} mobile={true} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MobileSidebar;
