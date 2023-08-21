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
    // selectedData state'i güncellendiğinde onGetCustomData fonksiyonunu çağırarak güncel veriyi gönderin
    onGetCustomPlusData(selectedData);
  }, [selectedData]);

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
       <button
        onClick={handleQuestionPlusIconClick}
        style={{
          top: '1.3vh',
          left: '12.5vw',
          cursor: 'pointer',
          position: 'absolute',
        }}
      >
        <QuestionPlusIcon />
      </button>
      {showSelected && (
        <div style={{ top: '9vh', left: '0.1vw', position: 'absolute' ,display: 'flex', flexDirection: 'row',  flexWrap: 'wrap'}}>
          {selectedData.map((data, index) => (
            <div key={index} style={{ marginBottom: '1.8rem', marginRight: '0.5rem'}}>
              <span style={{ background: '#D9D9D9',  color: '#000000', paddingTop: '0.22rem ',paddingBottom:'0.22rem' ,borderRadius: '0.2604166vh' }}>
              <span style={{  position: 'relative', top: '2vh', right: '0.12vw',left:'0.1vw' ,paddingRight: '0.01vw'}}>
              <LabelIcon/>
                </span>
                <span style={{  paddingLeft: '1.2rem ',paddingRight: '0.5rem'}}>
                {data.label}
                </span>
                <button
                  onClick={() => handleRemoveSelectedData(data)}
                  style={{  position: 'relative', top: '-0.55vh', right: '0.12vw', cursor: 'pointer' ,paddingLeft: '0.01vw'}}
                >    
                  <CrossIcon/>
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