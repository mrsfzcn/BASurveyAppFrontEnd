import React, { useEffect, useState } from 'react';

const MultipleChoice = (props) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddOption = () => {
    const trimmedValue = inputValue.trim();

    if (trimmedValue !== '') {
      if (options.includes(trimmedValue)) {
        alert('Bu değer zaten eklenmiş!');
      } else {
        if (editIndex !== null) {
          const updatedOptions = [...options];
          updatedOptions[editIndex] = trimmedValue;
          setOptions(updatedOptions);
          setEditIndex(null);
        } else {
          setOptions([...options, trimmedValue]);
        }
        setInputValue('');
        console.log("Yeni Değer Eklendi:", trimmedValue);
      }
    }
  };

  const handleDeleteOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const handleEditOption = (index) => {
    setInputValue(options[index]);
    setEditIndex(index);
  };

  const handleCancelEdit = () => {
    setInputValue('');
    setEditIndex(null);
  };
  
  useEffect(() => {
    props.veriTasi(options);
    }, [options]);
  console.log(options);

  return (
    <div className="App">
      <div className='overflow-x-auto overflow-y-auto max-w-[46vh] max-h-[22vh] border border-gray-300 p-1 min-w-[46vh] min-h-[22vh] mt-0.5'>
        {options.map((option, index) => (
          <div key={index} className="flex items-center">
            {/* <input type="radio" name="options" className="mr-2" /> */}
            {editIndex === index ? (
              <div>
                <button
                  className="bg-green-500 text-white py-0.4 px-1 rounded my-1"
                  onClick={handleAddOption}
                >
                  Kaydet
                </button>
                <button
                  className="bg-gray-500 text-white py-0.4 px-1 rounded my-1 mx-1"
                  onClick={handleCancelEdit}
                >
                  Vazgeç
                </button>
              </div>
            ) : (
              <>
               <button
                  className="py-0.4 px-1 rounded my-1 mx-1"
                  onClick={() => handleEditOption(index)}
                >
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="edit-btn" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"></path></svg>
                </button>
                <button
                  className="py-0.4 px-1 rounded my-1 mx-1"
                  onClick={() => handleDeleteOption(index)}
                >
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="delete-btn" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path></svg>
                </button>
               
              </>
            )}
            <div className="flex-grow">
              {editIndex === index ? (
                <input
                  className="w-52 h-8 py-2 px-2 rounded border border-gray-300 font-poppins text-base leading-6 text-left outline-none mobile:w-40 mobile:ml-2"
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddOption();
                    }
                  }}
                />
              ) : (
                <span className="mr-2 font-poppins text-base ml-1">{option}</span>
              )}
            </div>
           
          </div>
        ))}
      </div>
      <div>
        <input
          className={`w-52 h-11 py-2 px-2 mx-4 rounded border border-gray-300 font-poppins text-base leading-6 text-left outline-none mobile:w-40 mobile:ml-2 ${
            editIndex !== null ? 'hidden' : ''
          }`}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddOption();
            }
          }}
          placeholder="Bir seçenek girin"
        />
        <button
          onClick={handleAddOption}
          className={` text-white py-1 px-2 rounded mt-5 ${
            editIndex !== null ? 'hidden' : '' } `}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 7.34784 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C4.8043 18.9464 7.34784 20 10 20ZM9.0625 13.4375V10.9375H6.5625C6.04297 10.9375 5.625 10.5195 5.625 10C5.625 9.48047 6.04297 9.0625 6.5625 9.0625H9.0625V6.5625C9.0625 6.04297 9.48047 5.625 10 5.625C10.5195 5.625 10.9375 6.04297 10.9375 6.5625V9.0625H13.4375C13.957 9.0625 14.375 9.48047 14.375 10C14.375 10.5195 13.957 10.9375 13.4375 10.9375H10.9375V13.4375C10.9375 13.957 10.5195 14.375 10 14.375C9.48047 14.375 9.0625 13.957 9.0625 13.4375Z" fill="#212A3E"></path></svg>
        </button>
      </div>
    </div>
  );
};

export default MultipleChoice;
