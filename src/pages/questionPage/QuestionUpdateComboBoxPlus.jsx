import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import QuestionPlusIcon from './QuestionPlusIcon';
import CrossIcon from './CrossIcon';
import LabelIcon from './LabelIcon';
import QuestionAddPage from './QuestionAddPage';
import QuestionService from "../../services/QuestionService";
import QuestionTypeService from "../../services/QuestionTypeService";

const QuestionUpdateComboBoxPlus = ({ qId ,options, placeholder , onGetCustomPlusData, disabled}) => {

  let params = useParams();
  const location = useLocation();
  const rowData = location.state;

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedData, setSelectedData] = useState([]);
  const [showSelected, setShowSelected] = useState(false);
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  useEffect(()=>{
    if (params.id){
      QuestionService.questionGetById(params.id)
        .then((response) => {
          console.log(response.data);
          setSelectedData(response.data.questionTags.map((questionTag) => ({ label: questionTag.tagString, value: questionTag.tagStringId })))
          onGetCustomPlusData(response.data.questionTags.map((questionTag) => ({ value: questionTag.tagStringId })));
          if (selectedData != []) {
            setShowSelected(true);
          }
        })
        .catch((error) => {
          alert(params.id + "nolu soru bulunamamıştır");
        });
      }
      else if(qId != null){
        QuestionService.questionGetById(qId)
        .then((response) => {
          console.log(qId);
          setSelectedData(response.data.questionTags.map((questionTag) => ({ label: questionTag.tagString, value: questionTag.tagStringId })))
          onGetCustomPlusData(response.data.questionTags.map((questionTag) => ({ value: questionTag.tagStringId })));
          if (selectedData != []) {
            setShowSelected(true);
          }
        })
        .catch((error) => {
          alert(qId + "nolu soru bulunamamıştır");
        });
      }
  },[]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSearchTerm(option.label);
    setIsOpen(false);
  };

  const handleQuestionPlusIconClick = () => {
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
        disabled={disabled && true}
        type="text"
        value={searchTerm}
        placeholder={placeholder}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className='disabled:text-white disabled:bg-neutral-900 disabled:opacity-40 disabled:cursor-not-allowed'
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
          cursor: disabled!=true ? 'pointer' : 'cursor-not-allowed',
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
      { disabled!=true&&
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
      </button>}
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

export default QuestionUpdateComboBoxPlus;