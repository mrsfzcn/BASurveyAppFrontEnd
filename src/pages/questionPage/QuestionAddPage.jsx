import React, { useState , useEffect} from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Layout from "../../components/Layout";

import AuthService from "../../services/AuthService";
import Alert from "../../components/Alert";
import BreadCrumbs from "../../components/BreadCrumbs";
import MultiDropdown from "../../components/MultiDropdown";
import { BsTextarea } from "react-icons/bs";
import CustomComboBox from './CustomComboBox';
import CustomComboBoxPlus from './CustomComboBoxPlus';
import QuestionPlusIcon from './QuestionPlusIcon';
import QuestionTypeService from "../../services/QuestionTypeService";
import QuestionService from "../../services/QuestionService";

const QuestionAddPage = ({props}) => {
    const [questionTypeOptions, setQuestionTypeOptions] = useState([]);
    const [questionTagsOptions, setQuestionTagsOptions] = useState([]);  
    const [selectedOption, setSelectedOption] = useState(null);
    const [alert, setAlert] = useState({ type: "", message: "" });
    const [customComboBoxData, setCustomComboBoxData] = useState([]);
    const [error, setError] = useState(false);
    const [createQuestion, setCreateQuestion] = useState({
        questionString: "",
        order: null,
        questionTypeOid: null,
        tagOids: [],
      });
     
     
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await QuestionTypeService.getAllType();
            const types = response.data;
      
            setQuestionTypeOptions(types.map((type) => ({ label: type.questionType, value: type.questionTypeId })));
            
          } catch (error) {
            console.error("Tag verileri alınırken bir hata oluştu:", error);
          }
        };

        const fetchDataTags = async () => {
            try {
                const response = await QuestionService.getAllQuestionTags();
                const types = response.data;
          
                setQuestionTagsOptions(types.map((type) => ({ label: type.tagString, value: type.tagStringId })));
                
              } catch (error) {
                console.error("Tag verileri alınırken bir hata oluştu:", error);
              }

        };
        fetchDataTags();
        fetchData();
      }, []);
      const handleCustomComboBoxData = (option) => {
        if(option === null ){
            setSelectedOption(null);
            setCreateQuestion({ ...createQuestion, questionTypeOid: null });
        }else{
            setSelectedOption(option);
            setCreateQuestion({ ...createQuestion, questionTypeOid: option.value})
        }      
      };
      const handleCustomComboBoxPlusData = (data) => {
        setCustomComboBoxData(data);
        const a=data.map((i)=>
         i.value
      );
      setCreateQuestion({ ...createQuestion, tagOids: a})
      };

      const handleCreate =  (event) => {

        event.preventDefault();
        if(createQuestion.questionString.length > 1 &&
            createQuestion.questionTypeOid !== null
             ){
        const newDataArray = [
            {
              questionString: createQuestion.questionString,
              order: createQuestion.order,
              questionTypeOid: createQuestion.questionTypeOid,
              tagOids: createQuestion.tagOids,
            },
          ];
          console.log(newDataArray)
        QuestionService.createQuestions(newDataArray)
          .then((response) => {
            setAlert({ type: "success", message: "Soru başarıyla eklendi." });
            setCreateQuestion({ ...createQuestion, questionString: "" });
            document.getElementById("myTextarea").value = "";
            setTimeout(() => {
                setAlert({ type: "", message: "" }); 
              }, 3000);
          })
          .catch((error) => {
            console.error("Hata:", error);
            console.log(newDataArray)
            setAlert({
              type: "error",
              message:
                "Beklenmeyen bir hata meydana geldi. Lütfen daha sonra tekrar deneyiniz.",
            });
            setTimeout(() => {
                setAlert({ type: "", message: "" }); 
              }, 3000);
          });
        }else{
            if(createQuestion.questionString.length <= 1 ){
                setError(true);         
                setAlert({
                    type: "error",
                    message:
                      "Soru alanı boş olamaz",
                  });
                  setTimeout(() => {
                    setError(false);
                      setAlert({ type: "", message: "" });
                    }, 3000); 
            }
            if(createQuestion.questionTypeOid === null &&(createQuestion.questionString.length > 1)){                     
                setAlert({
                    type: "error",
                    message:
                      "Soru tipi seçimi yapınız. Aradığınız soru tipinin üzerine tıklayarak seçmelisiniz",
                  });
                  setTimeout(() => {
                    setError(false);
                      setAlert({ type: "", message: "" });
                    }, 3000); 
            }
        }
      };
     const handleChange=(e)=>{
        
        const text = e.target.value;
        if (text.length <= 450) {
            setAlert({ type: "", message: "" });
        if (e.target.value.length >= 1 ) {
            const updatedQuestion = { ...createQuestion, questionString: text };
            setCreateQuestion(updatedQuestion);
            setError(false);
            
          } else {
            setError(true);
            setAlert({
                type: "error",
                message:
                  "Soru alanı boş olamaz",
              });
            setTimeout(() => {
                setError(false);
                setAlert({ type: "", message: "" });
              }, 2000);    
          } }
          else{setError(true);
            setAlert({
              type: "error",
              message: "Soru en fazla 450 karakter olmalıdır.",
            });
            }   
     }
     
      
    const handleRedirect = () => {
        window.location.href = '/questionlist'
    };

    const header = { header: "Soru Ekle", href: "/questionlist/add" };
    

    const [isFocused, setIsFocused] = React.useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const subtitle = [
        {
            title: "Anasayfa",
            href: "/adminhome",
        },
        {
            title: "Soru İşlemleri",
            href: "/questionlist"
        },
        {
            title: "Soru Ekle",
            href: "/questionlist/add",
        },
    ];
    const borderColor = error
    ? '#ff3333' 
    : isFocused
    ? '#00a4e4' 
    : '#ccc';  
    return (
        <Layout>
            <div className="flex flex-col bg-[#E5E5E5] h-full">
                <BreadCrumbs header={header} subtitle={subtitle} />
                <div className="  flex justify-center align-center" style={{
                    height: '90%',
                }} >
                    <div className="  bg-[#F1F1F1] flex  justify-center align-center m-auto "
                        style={{
                            width: '41%',
                            height: '76.8vh',
                            borderRadius: '1rem',
                            position: 'absolute',
                            flexDirection: 'column',
                            paddingRight: '5rem',
                            justifyContent: 'center'

                        }}
                    >

                        <div  style={{
                            width: '11vw',                           
                            top: '5rem',
                            right: '27.6vw',
                            fontFamily: 'Poppins',
                            fontSize: '1rem',
                            lineHeight: '1.5rem',
                            textAlign: 'left',
                            position: 'absolute'

                        }}>
                            <p >
                                Soru metninizi giriniz:
                            </p>

                        </div>
                        <div className="flex justify-center align-center m-auto" style={{ right: '1%', position: 'absolute', height: '28%', width: '100%', top: "7rem", }}>
                            <textarea
                                name="text" rows="12" cols="50" id="myTextarea"
                                style={{
                                    width: '89%',
                                    borderRadius: '.1rem',
                                    padding: '.9rem', 
                                    border: `1px solid ${borderColor}`,
                                    boxSizing: 'border-box',
                                    fontSize: '1rem',
                                    lineHeight: '1.5rem',
                                    fontFamily: 'Poppins',
                                    textAlign: 'left',
                                    wordWrap: 'break-word',
                                    resize: 'none', 
                                    overflow: 'auto', 
                                    outline: 'none',
                                   
                                    transition: 'border-color 0.2s ease-in-out', 
                                }}
                                placeholder="Metin giriniz..."
                                onFocus={handleFocus} 
                                onBlur={handleBlur} 
                                required
                                onChange={handleChange
                                  }
                            />
                        </div>
                        <div className="flex  items-center mt-4 justify-end align-center m-auto" style={{
                            top: '34vh',
                            width: '15vw',
                            paddingTop: "2rem",
                            right: '34.3vw',
                            fontFamily: 'Poppins',
                            fontSize: '1rem',
                            lineHeight: '1.5rem',
                            textAlign: 'left',
                            position: 'absolute',


                        }}>
                            <p className="text-base font-medium mr-2">Soru tipi</p>
                            <div className="flex items-center" style={{ paddingLeft: '5vw', position: 'absolute', height: '100%', left: '12vw' }}>
                                <span className="mr-3">:</span>
                                <div style={{
                                    top: '1vh',
                                    width: '20vw',
                                    left: '5.8vw',
                                    position: 'absolute',
                                }}>
                                    <CustomComboBox options={questionTypeOptions} placeholder="Seçiniz" onGetCustomData={handleCustomComboBoxData}/>
                                </div>
                            </div>

                        </div>
                        <div className="flex  items-center mt-4 justify-end align-center m-auto" style={{
                            top: '42vh',
                            width: '15vw',
                            paddingTop: "2rem",
                            right: '33.1vw',
                            fontFamily: 'Poppins',
                            fontSize: '1rem',
                            lineHeight: '1.5rem',
                            textAlign: 'left',
                            position: 'absolute',


                        }}>
                            <p className="text-base font-medium mr-2">Soru etiketi</p>
                            <div className="flex items-center" style={{ paddingLeft: '5vw', position: 'absolute', height: '100%', left: '10.8vw' }}>
                                <span className="mr-3">:</span>
                                <div style={{
                                    top: '1vh',
                                    width: '20vw',
                                    left: '5.8vw',
                                    position: 'absolute',
                                }}>
                                    < CustomComboBoxPlus options={questionTagsOptions} placeholder="Giriniz" onGetCustomPlusData={handleCustomComboBoxPlusData}/>
                                </div>
                            </div>
                           
                        </div>
                        <button
                            style={{
                                width: '6.25vw',
                                height: '55px',
                                top: '42vh',
                                left: '29vw',
                                borderRadius: '0.2604166',
                                background: '#E5E5E5', 
                                color: '#000000', 
                                border: 'none', 
                                fontFamily: 'Poppins',
                                fontSize: '1rem', 
                                fontWeight: 'bold', 
                                cursor: 'pointer', 
                                position: 'absolute',
                            }}
                            onClick={handleCreate}
                        >
                            Ekle
                        </button>
                        
                    </div>
                </div>
                <div  style={{ position: 'absolute',
                               top: '92vh', 
                               right: '1rem', 
                               zindex: 9999,  }}>
                {alert.type && (
                    <Alert type={alert.type} message={alert.message} closable={true} />
                  )}
                  </div>
            </div>
        </Layout>
    );
};

export default QuestionAddPage;