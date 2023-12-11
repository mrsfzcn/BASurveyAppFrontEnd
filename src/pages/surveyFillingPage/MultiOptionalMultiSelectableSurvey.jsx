import React, { useEffect, useState } from 'react';

const MultiOptionalMultiSelectableSurvey = (props) => {
  const multipleQuestionOid = props.multiOptionalMultiSelectableOid;
  const [multipleOptions, setMultipleOptions] = useState(props.multiOptionalMultiSelectableOptions);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    console.log("MultiOptionalMultiSelectable Seçilen Değerler:", selectedOptions);
  }, [selectedOptions]);

  const handleValueSelect = (value) => {
    if (selectedOptions.includes(value)) {
      props.onSelected(selectedOptions.filter((option) => option !== value).join(", "))
      
    } else {
      props.onSelected([...selectedOptions, value].join(", "))
      
    }
    setSelectedOptions((prevOptions) => {
      if (prevOptions.includes(value)) {
        return prevOptions.filter((option) => option !== value);
      } else {
        return [...prevOptions, value];
      }
    });
  };


  return (
      <div className="App">
        <div className='overflow-x-auto px-4 py-2 overflow-y-auto max-w-[46vh] max-h-[22vh]  p-1 min-w-[46vh] min-h-[22vh] mt-0.5'>
          {multipleOptions.map((option, index) => (
              <div key={index} className="flex items-center py-1">
                <input
                    type="checkbox"
                    onChange={() => handleValueSelect(option)}
                    checked={selectedOptions.includes(option)}
                    name={multipleQuestionOid}
                    className="mr-2 cursor-pointer"
                />
                <span className="mr-2 font-poppins text-base ml-1">{option}</span>
              </div>
          ))}
        </div>
      </div>
  );
};

export default MultiOptionalMultiSelectableSurvey;
