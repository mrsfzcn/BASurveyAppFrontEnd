import React, { useState, useEffect } from 'react';
import QuestionPlusIcon from './QuestionPlusIcon';
import CrossIcon from './CrossIcon';
import LabelIcon from './LabelIcon';
import QuestionAddPage from './QuestionAddPage';
const CustomComboBoxPlus = ({ options, placeholder , onGetCustomPlusData}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedData, setSelectedData] = useState([]);
  const [showSelected, setShowSelected] = useState(false);
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSearchTerm(option.label);
    setIsOpen(false);
  };

  const handleQuestionPlusIconClick = (e) => {
    e.preventDefault();
    if (selectedOption) {
      const alreadyExists = selectedData.some((dataItem) => dataItem.value === selectedOption.value);
    if (!alreadyExists) {
      setSelectedData((prevSelectedData) => [...prevSelectedData, selectedOption]);
      setShowSelected(true);
    }
      setSelectedOption(null);
      setSearchTerm('')
     
    }
  };

  const handleRemoveSelectedData = (selectedItem) => {
    setSelectedData((prevSelectedData) => prevSelectedData.filter((item) => item.value !== selectedItem.value));

  };

  useEffect(() => {

    if(selectedData.length ===0){
      setShowSelected(false)
    }
    onGetCustomPlusData(selectedData);
  }, [selectedData]);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <div className="flex">
    <input
      type="text"
      value={searchTerm}
      placeholder={placeholder}
      onChange={handleInputChange}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      className="w-52 h-12 py-2 px-2 rounded border border-gray-300 font-poppins text-base leading-6 text-left outline-none cursor-pointer mobile:w-40"
    />
    {isOpen && (
      <ul className="absolute top-[6vh] left-0 w-3/4 max-h-[17vh] overflow-y-auto bg-white border border-gray-300 rounded list-none p-1 z-10  bg-transparent border-0 border-b-2 border-black-200 appearance-none dark:text-black-400 dark:border-black-700 focus:outline-none focus:ring-0 focus:border-black-200 peer">
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
    <button
      onClick={handleQuestionPlusIconClick}
      className="top-[1.3vh] left-[11.5vw] cursor-pointer ml-4 mobile:mt-1 "
    >
      <QuestionPlusIcon />
    </button>
    </div>
    {showSelected && (
      <div className="max-w-[38vh] max-h-[22vh] min-w-[38vh] min-h-[22vh] overflow-y-auto left-[0.1vw] absolute flex flex-row flex-wrap mobile:text-xs mobile:h-20 mobile:m-0 mobile:p-0
      border border-gray-300
       p-1 mt-5
      ">
        {selectedData.map((data, index) => (
          <div
            key={index}
            className=" mb-2 mr-2"
          >
            <span className="bg-[#D9D9D9] text-black py-1 px-2 w-full flex items-center">
              <span className="relative top-[0.1vh] left-[0.1vw]">
                <LabelIcon />
              </span>
              <span className="pl-1.5">{data.label}</span>
              <button
                onClick={() => handleRemoveSelectedData(data)}
                className="relative top-[-0.55vh] right-[0.12vw] cursor-pointer pl-1"
              >
                <CrossIcon />
              </button>
            </span>
          </div>
        ))}
      </div>
    )}
  </div>
  );
};

export default CustomComboBoxPlus;