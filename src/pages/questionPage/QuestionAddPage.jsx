import React, { useState, useEffect } from "react";
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

const QuestionAddPage = ({ props }) => {
    const [questionTypeOptions, setQuestionTypeOptions] = useState([]);
    const [questionTagsOptions, setQuestionTagsOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [alert, setAlert] = useState({ type: "", message: "" });
    const [customComboBoxData, setCustomComboBoxData] = useState([]);
    const [error, setError] = useState(false);
    const [isEmptyTagOids, setIsEmptyTagOids] = useState(false);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
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
        if (option === null) {
            setSelectedOption(null);
            setCreateQuestion({ ...createQuestion, questionTypeOid: null });
        } else {
            setSelectedOption(option);
            setCreateQuestion({ ...createQuestion, questionTypeOid: option.value })
        }
    };
    const handleCustomComboBoxPlusData = (data) => {
        setCustomComboBoxData(data);
        const a = data.map((i) =>
            i.value
        );
        setCreateQuestion({ ...createQuestion, tagOids: a })
    };

    const handleCreate = (event) => {
        
        
        if (createQuestion.questionString.length > 1 &&
            createQuestion.questionTypeOid !== null
        ) {
            if ((createQuestion.tagOids.length === 0) && (!(isEmptyTagOids))) {
                setShowConfirmPopup(true);
            } else {
                event.preventDefault();
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
                        setIsEmptyTagOids(false)
                        setTimeout(() => {
                            setAlert({ type: "", message: "" });
                        }, 5000);
                        console.log(response.data)
                    })
                    .catch((error) => {
                        console.error("Hata:", error);
                        console.log(newDataArray)
                        if (error.response.data.exceptionCode === 9007) {
                            setAlert({
                                type: "error",
                                message:
                                error.response.data.customMessage,
                            });
                            setTimeout(() => {
                                setAlert({ type: "", message: "" });
                            }, 5000);
                        } else {
                        setAlert({
                            type: "error",
                            message:
                                "Beklenmeyen bir hata meydana geldi. Lütfen daha sonra tekrar deneyiniz.",
                        });
                        setTimeout(() => {
                            setAlert({ type: "", message: "" });
                        }, 5000);
                    }
                    });
            }
        } else {
            setIsEmptyTagOids(false)
            if (createQuestion.questionString.length <= 1) {
                setError(true);
                setAlert({
                    type: "error",
                    message:
                        "Soru alanı boş olamaz",
                });
                setTimeout(() => {
                    setError(false);
                    setAlert({ type: "", message: "" });
                }, 5000);
            }
            if (createQuestion.questionTypeOid === null && (createQuestion.questionString.length > 1)) {
                setAlert({
                    type: "error",
                    message:
                        "Soru tipi seçimi yapınız. Aradığınız soru tipinin üzerine tıklayarak seçmelisiniz",
                });
                setTimeout(() => {
                    setError(false);
                    setAlert({ type: "", message: "" });
                }, 5000);
            }
        }
    };
    const handleChange = (e) => {

        const text = e.target.value;
        if (text.length <= 450) {
            setAlert({ type: "", message: "" });
            if (e.target.value.length >= 1) {
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
                }, 5000);
            }
        }
        else {
            setError(true);
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
    return (        <Layout>
        {showConfirmPopup && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-50">
            <div className="bg-[#F1F1F1] p-6 rounded-lg text-center shadow-md">
              <p className="font-normal">
                !!! Soru etiketi eklemediniz. Etiketsiz kaydetmek istediğinize emin misiniz?<br/>
                Eğer "Evet" diyip "Ekle" butonuna basarsanız etiket eklememiş olacaksınız. <br/>
                Etiket eklemek için "Hayır" diyip seçim yapın sonra artı ikonuna tıklayın. <br/>
                "Ekle" butonu ile kaydedin
              </p>
              <div className="mt-4">
                <Button
                  type="submit"
                  primary
                  className="mr-2"
                  rounded
                  bold
                  onClick={() => {
                    setIsEmptyTagOids(true);
                    setShowConfirmPopup(false);
                  }}
                >
                  Evet
                </Button>
                <Button
                  type="submit"
                  secondary
                  rounded
                  bold
                  onClick={() => setShowConfirmPopup(false)}
                >
                  Hayır
                </Button>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col bg-[#E5E5E5] h-full">
          <BreadCrumbs header={header} subtitle={subtitle} />
          <div className="flex flex-col items-center h-90">
      
            <div className="flex justify-center bg-[#F1F1F1]  w-[41%] h-[76.8vh] rounded-lg absolute flex-col  p-8 mobile:w-[95%]">
              <div className="flex justify-center  top-16  font-Poppins text-base leading-6 text-left absolute">
                <p>
                  Soru metninizi giriniz:
                </p>
              </div>
              <div className="flex justify-center  m-auto  absolute h-[28%] w-11/12 top-28 right-4">
                <textarea
                  name="text" rows="12" cols="50" id="myTextarea"
                  className="w-[99%] p-4 text-base leading-[1.5rem] font-poppins text-left break-words"
                  style={{                    
                    border: `1px solid ${borderColor}`,
                    boxSizing: 'border-box',
                    resize: 'none',
                    overflow: 'auto',
                    outline: 'none',
                    transition: 'border-color 0.2s ease-in-out',
                }}
                  placeholder="Metin giriniz..."
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-row justify-start mt-4  items-center pt-8 ">
                <p className="text-base font-medium mr-2 mobile:w-24">Soru tipi</p>
                <div className="flex items-center justify-end left-13vw w-[22vw] h-full">
                  <span className="mr-3">:</span>
                  <div className="top-1vh w-[20vw] left-5.8vw mobile:w-50 ">
                    <CustomComboBox options={questionTypeOptions} placeholder="Seçiniz" onGetCustomData={handleCustomComboBoxData} />
                  </div>
                </div>
              </div>
              <div className="flex flex-row  mt-4 mr-4 items-center  absolute  pt-8 top-[42vh]">
                <p className="flex  text-base font-medium mr-2 mobile:w-24">Soru etiketi</p>
                <div className="flex items-center h-full">
                  <span className="mr-3">:</span>
                  <div className=" w-[20vw] mobile:w-[40vw]    ">
                    <div className="mobile:w-[51vw]">
                    <CustomComboBoxPlus options={questionTagsOptions} placeholder="Giriniz" onGetCustomPlusData={handleCustomComboBoxPlusData} />
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="w-[6.25vw] h-[6.25vh] top-[42vh] left-[29vw] rounded-[0.2604166] bg-[#E5E5E5] text-black border-none font-Poppins text-base font-bold cursor-pointer absolute mobile:left-[70vw] mobile:top-[68vh] mobile:w-[19.25vw]"
                onClick={handleCreate}
              >
                Ekle
              </button>
            </div>
            <div className="  left-9vw z-50">
            {alert.type && (
              <Alert type={alert.type} message={alert.message} closable={true} />
            )}
          </div>
          </div>

        </div>
      </Layout>
    );
};

export default QuestionAddPage;