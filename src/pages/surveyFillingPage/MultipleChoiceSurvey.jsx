import React, { useEffect, useState } from 'react';

const MultipleChoiceSurvey = (props) => {
  const multipleQuestionOid = props.multipleQuestionOid;
  const [multipleOptions, setMultipleOptions] = useState(props.multipleOptions);
  const [options, setOptions] = useState([]);
  const handleValueSelect = (value) => {
    setOptions(value);
    console.log("Seçilen Değer:", value);
  };
  return (
    <div className="App">
      <div className='overflow-x-auto px-4 py-2 overflow-y-auto max-w-[46vh] max-h-[22vh]  p-1 min-w-[46vh] min-h-[22vh] mt-0.5'>
        {multipleOptions.map((option, index) => (
          <div key={index} className="flex items-center py-1">

           <input type="radio"  onClick={() => handleValueSelect(value)} name={multipleQuestionOid}  className="mr-2 cursor-pointer" />
           
           <span className="mr-2 font-poppins text-base ml-1">{option}</span>          
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoiceSurvey;
