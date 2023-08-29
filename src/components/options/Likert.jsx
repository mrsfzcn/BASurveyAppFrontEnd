import React, { useEffect, useState } from 'react';
import Input from '../Input';

const LikertScale = (props) => {
    const [options, setOptions] = useState([]);
  const [bottomLeftValue, setBottomLeftValue] = useState('');
  const [bottomRightValue, setBottomRightValue] = useState('');
  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(10);

  const handleValueSelect = (value) => {
    setOptions(value);
    console.log("Seçilen Değer:", value);
  };

  const handleBottomLeftInputChange = (e) => {
    setBottomLeftValue(e.target.value);
  };
  

  const handleBottomRightInputChange = (e) => {
    setBottomRightValue(e.target.value);
  };

  const handleStartValueChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (newValue >= 0 && newValue<=1 && newValue < endValue) {
      setStartValue(newValue);
    }
  };

  const handleEndValueChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (newValue > startValue && newValue <= 10) {
      setEndValue(newValue);
    }
  };

  useEffect(() => {
    setOptions(prevOptions => {
      const newOptions = [startValue,endValue, bottomLeftValue, bottomRightValue ];
      props.veriTasi(newOptions);
      console.log(newOptions);
      return newOptions;
    });
  }, [bottomLeftValue, bottomRightValue, startValue, endValue]);

  const renderScale = () => {
    const scaleValues = Array.from({ length: endValue - startValue + 1 }, (_, index) => startValue + index);

    return (
      <div className="flex items-center ml-5">
        {scaleValues.map((value) => (
          <div
            key={value}
            className={`likert-option ${options === value ? 'bg-gray-500 text-white' : 'bg-white border border-gray-300'} px-3.5 py-2 cursor-pointer transition duration-300`}
            onClick={() => handleValueSelect(value)}
          >
            {value}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="mt-1 border border-gray-300 pl-5 pr-5 pt-5 w-[31.5rem] h-[11rem] overflow-hidden">
      <div className="flex justify-between mb-2">
        <Input
          id="startValueInput"
          className="px-2 py-1 w-12 text-sm"
          type="number"
          value={startValue}
          onChange={handleStartValueChange}
        />
        <Input
          id="endValueInput"
          className="px-2 py-1 w-12 text-sm"
          type="number"
          value={endValue}
          onChange={handleEndValueChange}
        />
      </div>
      {renderScale()}
      <div className="flex justify-left w-full">
        <div className="text-left">
          <label htmlFor="bottomLeftInput" className="text-xs">Sol Etiket:</label>
          <Input
            id="bottomLeftInput"
            className="px-2 py-1 w-full text-sm  "
            type="text"
            value={bottomLeftValue}
            onChange={handleBottomLeftInputChange}
          />
        </div>
        <div className="flex justify-end w-full">
          <div className="text-right">
            <label htmlFor="bottomRightInput" className="text-xs block mr-[120px] mt-[8px]">Sağ Etiket:</label>
            <Input
              id="bottomRightInput"
              className="px-2 py-1 w-full text-sm  "
              type="text"
              value={bottomRightValue}
              onChange={handleBottomRightInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikertScale;
