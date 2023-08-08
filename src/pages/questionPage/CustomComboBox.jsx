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
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        value={searchTerm}
        placeholder={placeholder}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        style={{
          width: '60%',
          height: '50%',
          padding: '0.5rem',
          borderRadius: '0.25rem',
          border: '1px solid #ccc',
          fontFamily: 'Poppins',
          fontSize: '1rem',
          lineHeight: '1.5rem',
          textAlign: 'left',
          outline: 'none',
          cursor: 'pointer',
        }}
      />
      {isOpen && (
        <ul
          style={{
            position: 'absolute',
            top: '6vh',
            left: '0',
            width: '100%',
            maxHeight: '17vh', 
            overflowY: 'auto',
            background: '#FFF',
            border: '1px solid #ccc',
            borderRadius: '0.25rem',
            listStyle: 'none',
            padding: '0.25rem',
            zIndex: '100',
          }}
        >
          {filteredOptions.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionSelect(option)}
              style={{
                padding: '0.5rem',
                cursor: 'pointer',
                
              }}
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