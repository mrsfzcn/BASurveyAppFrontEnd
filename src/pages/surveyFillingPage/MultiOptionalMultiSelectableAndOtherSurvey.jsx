import React, { useEffect, useState } from 'react';
import InputMulti from '../../components/InputMulti';

const MultiOptionalMultiSelectableAndOtherSurvey = (props) => {
    const multipleQuestionOid = props.multiOptionalMultiSelectableAndOtherQuestionOid;
    const [multipleOptions, setMultipleOptions] = useState(props.multiOptionalMultiSelectableAndOtherOptions);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [newOption, setNewOption] = useState('');
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        console.log("MultiOptionalMultiSelectableAndOtherSurvey Seçilen Değerler:", selectedOptions);
    }, [selectedOptions]);

    const handleValueSelect = (value, event) => {
        if (event) {
            setIsActive(!isActive)
        } 

        if (selectedOptions.includes(value)) {
            props.onSelected(selectedOptions.filter((option) => option !== value).join(", "));
        } else {
            props.onSelected([...selectedOptions, value].join(", "));
        }
        setSelectedOptions((prevOptions) => {
            if (prevOptions.includes(value)) {
                return prevOptions.filter((option) => option !== value);
            } else {
                return [...prevOptions, value];
            }
        });
    };
   

    const handleNewOptionChange = (event) => {
        const oldValue = newOption
        console.log(newOption);

        if (selectedOptions.includes (newOption)) {
            setIsActive(false)
            setSelectedOptions((prevOptions) => {
                if (prevOptions.includes(oldValue)) {
                    return prevOptions.filter((option) => option !== oldValue);
                } 
            });
        }

        setNewOption(event.target.value);
    };

    return (
        <div className="App">
            <div className='overflow-x-auto px-4 py-2 overflow-y-auto max-w-[46vh] max-h-[22vh]  p-1 min-w-[46vh] min-h-[22vh] mt-0.5'>
                {multipleOptions.map((option, index) => (
                    <div key={index} className="flex items-center py-1">
                        <input
                            type="checkbox"
                            onClick={() => handleValueSelect(option)}
                            name={multipleQuestionOid}
                            className="mr-2 cursor-pointer"
                        />
                        <span className="mr-2 font-poppins text-base ml-1">{option}</span>
                    </div>
                ))}
                <div className="my-2 flex items-center">
                    <input
                        type="checkbox"
                        id="addOptionCheckboxStart"
                        className=" flex-start"
                        checked={isActive}
                        onClick= { (e) => handleValueSelect(newOption, e)}
                    />
                    <InputMulti
                        type="text"
                        value={newOption}
                        onChange={handleNewOptionChange}
                        className="ml-3 font-poppins"
                        placeholder="Yeni opsiyon girebilirsiniz"
                    />
                </div>
            </div>
        </div>
    );
};

export default MultiOptionalMultiSelectableAndOtherSurvey;
