import { useState, useEffect, useRef } from "react";
import Panel from "./dropdown/Panel";
import { GoChevronDown } from "react-icons/go";

function MultiDropdown({ options, selectedOptions, onChange,extraClassName }) {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!divEl.current) {
        return;
      }
      if (!divEl.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handler, true);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    const isOptionSelected = selectedOptions.some(
      (selectedOption) => selectedOption.value === option.value
    );

    if (isOptionSelected) {
      const updatedOptions = selectedOptions.filter(
        (selectedOption) => selectedOption.value !== option.value
      );
      onChange(updatedOptions);
    } else {
      const updatedOptions = [...selectedOptions, option];
      onChange(updatedOptions);
    }
  };
  const renderedOptions = options.map((option) => {
    const isSelected = selectedOptions.some(
      (selectedOption) => selectedOption.value === option.value
    );
    const optionClassName = `hover:bg-secondColor rounded cursor-pointer p-1 ${
      isSelected ? "bg-slate-600 text-white font-semibold" : ""
    }`;

    return (
      <div
        className={optionClassName}
        onClick={() => handleOptionClick(option)}
        key={option.value}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div ref={divEl} className="w-48 relative">
      <Panel
        className={`flex justify-between items-center cursor-pointer font-semibold ${extraClassName && extraClassName}`}
        onClick={handleClick}
      >
        {selectedOptions.length === 0 ? "Seçim yapınız" : "Seçim yapınız"}
        <GoChevronDown className="text-xs" />
      </Panel>
      {isOpen && (
        <Panel className={`absolute top-full z-10 ${extraClassName && extraClassName}`}>{renderedOptions}</Panel>
      )}
    </div>
  );
}

export default MultiDropdown;
