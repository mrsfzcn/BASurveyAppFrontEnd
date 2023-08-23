import React, { useState, useEffect } from 'react';

const CustomComboBox = ({ options, placeholder ,onGetCustomData}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);
    setIsOpen(true);
    if (inputValue !== '') {
      const matchingOption = options.find(
        (option) => option.label.toLowerCase() === inputValue.toLowerCase()
      );

      if (!matchingOption) {
        setSelectedOption(null);
        onGetCustomData(null);
      }
    }else{
      setSelectedOption(null);
        onGetCustomData(null);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSearchTerm(option.label);
    setIsOpen(false);
    onGetCustomData(option);
  };
  

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
  <input
    type="text"
    value={searchTerm}
    placeholder={placeholder}
    onChange={handleInputChange}
    onFocus={() => setIsOpen(true)}
    onBlur={() => setTimeout(() => setIsOpen(false), 200)}
    className="w-52 h-11 py-2 px-2 rounded border border-gray-300 font-poppins text-base leading-6 text-left outline-none cursor-pointer
    mobile:w-40 mobile:ml-2
    "
  />
  {isOpen && (
    <ul
      className="absolute top-[6vh] left-0 w-3/4 max-h-40 overflow-y-auto bg-white border border-gray-300 rounded list-none p-1 z-10 bg-transparent border-0 border-b-2 border-black-200 appearance-none dark:text-black-400 dark:border-black-700 focus:outline-none focus:ring-0 focus:border-black-200 peer mobile:w-44 "
    >
      {filteredOptions.map((option) => (
        <li
          key={option.value}
          onClick={() => handleOptionSelect(option)}
          className="py-2 px-2 cursor-pointer hover:bg-[#64E9B1] rounded"
        >
          {option.label}
        </li>
      ))}
    </ul>
  )}
</div>
  );
};

export default CustomComboBox;