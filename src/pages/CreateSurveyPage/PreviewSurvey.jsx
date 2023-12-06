import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import BreadCrumbs from "../../components/BreadCrumbs";
import Button from "../../components/Button";
import SurveyService from "../../services/SurveyService.js";
import "./createsurvey.css";
import icon from "../../assets/icons/icons8-arrow-30.png";
import QuestionService from "../../services/QuestionService.js";
import Input from "../../components/Input.jsx";
import MatriksInput from "../../components/QuestionMatriksInput";
import QuestionUpdateComboBoxPlus from "../questionPage/QuestionUpdateComboBoxPlus.jsx";
import QuestionTypeService from "../../services/QuestionTypeService.js";
import MultipleChoiceSurvey from "../surveyFillingPage/MultipleChoiceSurvey.jsx";
import MultiOptionalMultiSelectableSurvey from "../surveyFillingPage/MultiOptionalMultiSelectableSurvey.jsx";
import MultiOptionalMultiSelectableAndOtherSurvey from "../surveyFillingPage/MultiOptionalMultiSelectableAndOtherSurvey.jsx";
import LikertSurvey from "../surveyFillingPage/LikertSurvey.jsx";
import MatrixSurveyPreview from "../surveyFillingPage/MatrixSurvey.jsx";
import OpenEnded from "../surveyFillingPage/OpenEndedSurvey.jsx";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function PreviewSurvey() {
  const location = useLocation();
  const surveyTitle = location.state
    ? location.state.surveyTitle
    : "HATA OLUŞTU";
  const surveyOid = location.state ? location.state.surveyOid : "HATA OLUŞTU";
  const selectedQuestions = location.state
    ? location.state.selectedQuestions
    : [];
  const selectedQuestionsWithStringIds = selectedQuestions.map((question) => {
    return { ...question, questionOid: `${question.questionOid}` };
  });
  const [questionPack, setQuestionPack] = useState(
    selectedQuestionsWithStringIds
  );
  const navigate = useNavigate();
  var requiredIndexes = [];

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCancelConfirmationOpen, setIsCancelConfirmationOpen] =
    useState(false);
  const [editQuestion, setEditQuestion] = useState(false);
  const [questionString, setQuestionString] = useState();
  const [questionType, setQuestionType] = useState();
  const [questionTagIds, setQuestionTagIds] = useState();
  const [questionTypeOptions, setQuestionTypeOptions] = useState([]);
  const [questionTagsOptions, setQuestionTagsOptions] = useState([]);
  const [defaultQuestion, setDefaultQuestion] = useState();
  const [updateQuestion, setUpdateQuestion] = useState({
    questionOid: undefined,
    questionTypeOid: undefined,
    tagOids: [],
    questionString: undefined,
  });

  function updateQuestionEdit(e) {
    e.preventDefault();
    setEditQuestion(false);
    let tagOids = [];

    const defaultQuestionTagStrings = defaultQuestion.questionTags.map(
      (tag) => tag.tagString
    );
    const selectedTagOption = questionTagsOptions.filter((tagOption) =>
      defaultQuestionTagStrings.includes(tagOption.label)
    );

    if (selectedTagOption.length > 0) {
      tagOids = selectedTagOption.map((tag) => tag.value);
    }
    const updateQuestionDto = {
      questionOid: defaultQuestion.questionOid,
      questionTypeOid: questionTypeOptions.find(
        (type) => type.label === defaultQuestion.questionType
      ).value,
      tagOids: tagOids,
      questionString: questionString,
    };
    QuestionService.updateQuestion(updateQuestionDto)
      .then((resp) => {
        console.log(resp.data);
        QuestionService.questionGetById(updateQuestionDto.questionOid).then(
          (resp) => {
            console.log(resp.data);
            setQuestionPack(
              questionPack.map((question) => {
                if (question.questionOid == resp.data.questionOid) {
                  const newQuestion = {
                    ...question,
                    questionString: resp.data.questionString,
                  };
                  return newQuestion;
                }
                return question;
              })
            );
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleChangeQuestionString = (e) => {
    setQuestionString(e.target.value);
  };

  const handleCancelEditQuestion = () => {
    setEditQuestion(false);
    setUpdateQuestion(defaultQuestion);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setIsCancelConfirmationOpen(true);
  };

  const handleEditQuestion = (questionOid) => {
    QuestionService.questionGetById(questionOid).then((resp) => {
      const changingQuestion = { ...resp.data };
      setUpdateQuestion(changingQuestion);
      setQuestionString(changingQuestion.questionString);
      setDefaultQuestion(changingQuestion);
      setQuestionType(changingQuestion.questionType);
      setEditQuestion(true);
    });
  };

  const handleSendSurvey = () => {
    questionPack.forEach((question) => {
      if (question.required) {
        requiredIndexes.push(parseInt(question.questionOid));
      }
    });

    const oid = surveyOid;

    SurveyService.setRequiredQuestions({ oid, requiredIndexes })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });

    const surveyData = {
      surveyId: surveyOid,
      questionIds: questionPack.map((question, index) => ({
        questionOid: parseInt(question.questionOid),
        order: index + 1,
      })),
    };
    console.log("Gönderilen veri:", surveyData);

    SurveyService.addQuestionsToSurvey(surveyData)
      .then((response) => {
        console.log(response.data);
        setIsPopupOpen(true);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const deleteSurveyHandle = async (surveyOid) => {
    try {
      const response = await SurveyService.delete(surveyOid);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateBack = () => {
    navigate(-1);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    navigate("/anketler");
  };
  const header = { header: "Anket Oluşturma", href: "/anket-olustur" };

  const subtitle = [
    {
      title: "Anasayfa",
      href: "/yonetici-sayfasi",
    },
    {
      title: "Anket İşlemleri",
      href: "/anketler",
    },
    {
      title: "Anket Oluşturma",
      href: "/anket-olustur",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      // Databasedeki tüm QuestionTypes geliyor.
      try {
        const response = await QuestionTypeService.getAllType();
        const types = response.data;

        setQuestionTypeOptions(
          types.map((type) => ({
            label: type.questionType,
            value: type.questionTypeId,
          }))
        );
      } catch (error) {
        console.error("Tag verileri alınırken bir hata oluştu:", error);
      }
    };
    const fetchDataTags = async () => {
      // Databasedeki tüm QuestionTags geliyor.
      try {
        const response = await QuestionService.getAllQuestionTags();
        const types = response.data;

        setQuestionTagsOptions(
          types.map((type) => ({
            label: type.tagString,
            value: type.tagStringId,
          }))
        );
      } catch (error) {
        console.error("Tag verileri alınırken bir hata oluştu:", error);
      }
    };
    fetchDataTags();
    fetchData();
  }, []);

  const [upData, setUpData] = useState([]);
  const renderComponent = (type, options, questionId, question) => {
    if (type === "Çoktan Seçmeli") {
      return (
        <MultipleChoiceSurvey
          multipleQuestionOid={questionId}
          multipleOptions={options}
          veriTasi={(veri) => {
            setUpData(veri);
          }}
        />
      );
    } else if (type === "Likert") {
      return (
        <LikertSurvey
          likertQuestionOid={questionId}
          likertOptions={options}
          veriTasi={(veri) => {
            setUpData(veri);
          }}
        />
      );
    } else if (type === "Açık Uçlu") {
      return <OpenEnded />;
    } else if (
      type === "Çok Seçenekli Çok Seçilebilir ve Seçenek Girilebilir"
    ) {
      return (
        <MultiOptionalMultiSelectableAndOtherSurvey
          multiOptionalMultiSelectableAndOtherQuestionOid={questionId}
          multiOptionalMultiSelectableAndOtherOptions={options}
        />
      );
    } else if (type === "Çok Seçenekli Çok Seçilebilir") {
      return (
        <MultiOptionalMultiSelectableSurvey
          multiOptionalMultiSelectableOid={questionId}
          multiOptionalMultiSelectableOptions={options}
        />
      );
    } else if (type === "Matriks") {
      //Matrix durumu icin kontrol
      return <MatrixSurveyPreview options={options} question={question} />;
    } else {
      return null;
    }
  };

  const handleCustomComboBoxPlusData = (data) => {
    const a = data.map((i) => i.value);
    setQuestionTagIds(a);
    setUpdateQuestion({ ...updateQuestion, tagOids: a });
  };
  function handleDragDrop(result) {
    const newOrderedPack = [...questionPack];
    const { source, destination } = result;
    const [movedItem] = newOrderedPack.splice(source.index, 1);
    newOrderedPack.splice(destination.index, 0, movedItem);
    setQuestionPack(newOrderedPack);
  }
  return (
    <Layout>
      <div className="flex flex-col h-full">
        <BreadCrumbs header={header} subtitle={subtitle} />
        <div className="flex h-full justify-center items-center flex-col">
          <div className="flex flex-col grid-flow-col justify-center items-center bg-gray-300 w-11/12 h-5/6 rounded relative">
            <div className="absolute top-0 left-2 py-8">
              <Button secondary circle fat onClick={navigateBack}>
                <img src={icon} alt="Icon" className="w-4 h-6" />
              </Button>
            </div>

            <div className="bg-white h-5/6 w-9/12  rounded flex flex-col overflow-auto px-8">
              <h2 className="text-3xl font-bold text-center mb-4 pt-4 ">
                {surveyTitle}
              </h2>
              <p className="text-justify pt-2 px-4 mb-16 text-l">
                Merhaba Arkadaşlar, <br />
                Sizlere daha iyi destek olabilmek adına hazırlamış olduğumuz
                Boost Eğitim Süreci Anketini doldurmanızı rica ederiz.
                Teşekkürler
                <br />
                <br /> <br />
                Merhaba, İsim.. Bu formu gönderdiğinizde, sahibi adınızı ve
                e-posta adresinizi görür.
                <br /> <br /> <br />
                <strong className="text-red-700">Gerekli*</strong>
              </p>
              <DragDropContext onDragEnd={handleDragDrop}>
                <Droppable
                  key="drag-drop-field"
                  droppableId="drop-area"
                  type="group"
                >
                  {(provided) => {
                    return (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {questionPack.map((question, index) => (
                          <Draggable
                            key={question.questionOid}
                            draggableId={`${question.questionOid}`}
                            index={index}
                          >
                            {(prov) => {
                              return (
                                <div
                                  key={index}
                                  {...prov.dragHandleProps}
                                  {...prov.draggableProps}
                                  ref={prov.innerRef}
                                  className="m-2 p-2"
                                >
                                  <p className="mb-16">
                                    {question.questionType !== "Matriks"
                                      ? `${index + 1}. ${
                                          question.questionString
                                        }`
                                      : `${index + 1}`}
                                    {question.required && (
                                      <span className="text-red-700 text-xl">
                                        {" "}
                                        *
                                      </span>
                                    )}
                                    <Button
                                      primary
                                      rounded
                                      className="mt-8"
                                      onClick={() =>
                                        handleEditQuestion(
                                          parseInt(question.questionOid)
                                        )
                                      }
                                    >
                                      {" "}
                                      Soruyu Düzenle
                                    </Button>
                                  </p>
                                  <div className="flex flex-row">
                                    {renderComponent(
                                      question.questionType,
                                      question.questionOptions,
                                      parseInt(question.questionOid),
                                      question.questionString
                                    )}
                                  </div>
                                </div>
                              );
                            }}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </DragDropContext>
            </div>
            <div className="flex gap-x-8 m-2">
              <Button
                primary
                rounded
                className="mt-8"
                onClick={handleSendSurvey}
              >
                ANKET OLUŞTUR
              </Button>

              <Button
                secondary
                rounded
                className="mt-8"
                onClick={(e) => handleCancel(e)}
              >
                VAZGEÇ
              </Button>
              {isCancelConfirmationOpen && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-75 bg-gray-800">
                  <div className="bg-white p-8 rounded shadow">
                    <p className="text-xl font-bold mb-4">Emin misiniz?</p>
                    <p>
                      Ankete soru ekleme işleminden vazgeçmek istediğinize emin
                      misiniz?
                    </p>
                    <p>Tüm Anketler Sayfasına Yönlendirileceksiniz.</p>
                    <Button
                      primary
                      rounded
                      className="mt-4"
                      onClick={() => {
                        deleteSurveyHandle(surveyOid);
                        setIsCancelConfirmationOpen(false);
                        navigate("/anketler");
                      }}
                    >
                      Onayla
                    </Button>
                    <Button
                      secondary
                      rounded
                      className="mt-4 mr-2"
                      onClick={() => setIsCancelConfirmationOpen(false)}
                    >
                      İptal
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Popup bileşeni */}
        {isPopupOpen && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-75 bg-gray-800">
            <div className="bg-white p-8 rounded shadow">
              <p className="text-xl font-bold mb-4">Başarı!</p>
              <p>Ankete sorular başarıyla kaydedildi.</p>
              <Button primary rounded className="mt-4" onClick={closePopup}>
                Tamam
              </Button>
            </div>
          </div>
        )}
        {/* Soru düzenleme Pop-upı*/}
        {editQuestion && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-75 bg-gray-800">
            <div className="bg-white p-8 rounded shadow">
              <form className="class1 flex justify-center align-center">
                <div className="class2 bg-[#F1F1F1] flex justify-center align-center m-auto ">
                  <div className="class4 bg-[#F1F1F1] m-auto flex flex-col gap-14 ">
                    <div className="flex flex-col gap-14 justify-center items-center mt-7">
                      <div className="flex items-center justify-between w-[600px] ">
                        <label className="font-semibold w-[150px] sm:w-[120px] md:w-[150px] lg:w-[180px] xl:w-[200px]">
                          Soru Id
                        </label>
                        <Input
                          disabled
                          value={updateQuestion.questionOid}
                          full
                        />
                      </div>
                      <div className="flex items-center   w-[600px] ">
                        <label className="font-semibold w-[150px]">
                          Soru Metni
                        </label>
                        {questionType != "Matriks" ? (
                          <Input
                            placeholder={"questionString"}
                            onChange={handleChangeQuestionString}
                            value={questionString}
                            full
                            className="w-full md:w-[80%] lg:w-[70%] xl:w-[60%] p-2 border rounded"
                          />
                        ) : (
                          <MatriksInput
                            questionString={questionString}
                            setQuestionString={setQuestionString}
                          />
                        )}
                      </div>
                      <div className="flex items-center w-[600px]">
                        <label className="font-semibold  w-[150px]">
                          Soru Tipi
                        </label>

                        <div
                          className="flex items-center"
                          style={{
                            paddingLeft: "5vw",
                            position: "relative",
                            height: "100%",
                            left: "12vw",
                          }}
                        >
                          <div
                            style={{
                              top: "0.1vh",
                              width: "20vw",
                              right: "17.0vw",
                              position: "relative",
                            }}
                          >
                            <Input
                              value={updateQuestion.questionType}
                              disabled={true}
                              full
                              className="w-full md:w-[80%] lg:w-[70%] xl:w-[60%] p-2 border rounded"
                            />
                            {/* <CustomComboBox options={questionTypeOptions} placeholder= "Seçiniz" onGetCustomData={handleCustomComboBoxData} className="w-full md:w-[80%] lg:w-[70%] xl:w-[60%]"/>  input ile değişti -Doruk Tokinan*/}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center w-[600px]">
                        <label className="font-semibold  w-[150px]">
                          Soru Etiketi
                        </label>

                        <div
                          className="flex items-center"
                          style={{
                            paddingLeft: "5vw",
                            position: "relative",
                            height: "100%",
                            left: "12.1vw",
                          }}
                        >
                          <div
                            style={{
                              top: "0.1vh",
                              width: "20vw",
                              right: "17.0vw",
                              position: "relative",
                            }}
                          >
                            <QuestionUpdateComboBoxPlus
                              disabled={true}
                              options={questionTagsOptions}
                              placeholder="Değiştirilemez"
                              onGetCustomPlusData={handleCustomComboBoxPlusData}
                              qId={defaultQuestion.questionOid}
                              className="class5 w-full md:w-[80%] lg:w-[70%] xl:w-[60%]"
                              additionalStyle={{
                                width: "60%",
                                height: "50%",
                                padding: "0.5rem",
                                borderRadius: "0.25rem",
                                border: "1px solid #ccc",
                                fontFamily: "Poppins",
                                fontSize: "1rem",
                                lineHeight: "1.5rem",
                                textAlign: "left",
                                outline: "none",
                                cursor: "cursor-not-allowed",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center gap-7 flex-wrap mt-24 sm:mt-6 md:mt-8">
                        <Button
                          primary
                          rounded
                          className="mt-4 w-[91px]"
                          onClick={updateQuestionEdit}
                        >
                          Onayla
                        </Button>
                        <Button
                          secondary
                          rounded
                          className="mt-4 w-[91px]"
                          onClick={handleCancelEditQuestion}
                        >
                          İptal
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default PreviewSurvey;
