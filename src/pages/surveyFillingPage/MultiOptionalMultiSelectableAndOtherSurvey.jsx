import React, { useEffect, useState } from 'react';
import InputMulti from '../../components/InputMulti';

const MultiOptionalMultiSelectableAndOtherSurvey = (props) => {
  const multipleQuestionOid = props.multiOptionalMultiSelectableAndOtherQuestionOid;
  const [multipleOptions, setMultipleOptions] = useState(props.multiOptionalMultiSelectableAndOtherOptions);
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

           <input type="checkbox"  onClick={() => handleValueSelect(value)} name={multipleQuestionOid}  className="mr-2 cursor-pointer" />
           
           <span className="mr-2 font-poppins text-base ml-1">{option}</span>          
          </div>
        ))}
        <div className="my-2 flex items-center">
                <input
                  type="checkbox"
                  id="addOptionCheckboxStart"
                  className=" flex-start "
                />
                <InputMulti
                  type="text "
                  className="ml-3 font-poppins"
                  placeholder="Yeni opsiyon girebilirsiniz"
                />
              </div>
      </div>
    </div>
  );
};

export default MultiOptionalMultiSelectableAndOtherSurvey;
