import React, { useEffect, useState } from 'react';
import Input from '../../components/Input';

const LikertSurvey = (props) => {
    const likertQuestionOid = props.likertQuestionOid;
  const likertOptions = props.likertOptions;
    const [options, setOptions] = useState([]);
  const [bottomLeftValue, setBottomLeftValue] = useState('');
  const [bottomRightValue, setBottomRightValue] = useState('');
  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(10);

  const handleValueSelect = (value) => {
    setOptions(value);
    console.log("Seçilen Değer:", value,"Soru oid:",likertQuestionOid);
  };



  const renderScale = () => {
    const scaleValues = Array.from({ length: endValue - startValue + 1 }, (_, index) => startValue + index);

    return (
      <div className="flex items-center  ">
        {scaleValues.map((value) => (
          <div
            key={value}
            className={`likert-option ${options === value ? 'bg-[#0178d4] text-white' : 'bg-white border border-gray-300'} px-[1.8rem] justify-center py-3 w-2/3 cursor-pointer transition duration-300`}
            onClick={() => handleValueSelect(value)}
          >
            {value}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="mt-1 pl-[1.2rem] pr-5  w-8/9 h-[11rem] overflow-hidden">
      <div className="flex justify-between mb-8 px-1 py-1">

      </div>
      {renderScale()}
      <div className="flex justify-left w-full text-left ">
        <div className="mt-2 w-3/12">
          <label htmlFor="bottomLeftInput" className="text-xm  mt-3">{likertOptions[2]}</label>
      
        </div>
        <div className="flex justify-end w-full text-right">
          <div className="mt-2 w-3/12">
            <label htmlFor="bottomRightInput" className="text-xm   mt-3 ">{likertOptions[3]}</label>
  
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikertSurvey;