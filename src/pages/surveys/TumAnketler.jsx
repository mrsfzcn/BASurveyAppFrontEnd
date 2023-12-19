import React, { useState, useEffect } from "react";
import Table from "../../components/Table/Table";
import Layout from "../../components/Layout";
import SurveyService from "../../services/SurveyService";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumbs from "../../components/BreadCrumbs";
import Button from "../../components/Button";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";

const TumAnketler = () => {
  const [surveys, setSurveys] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const header = ["No", "Anket Adı", "Konu Başlığı", "Anket etiketleri"];
  const [deleteSurvey, setDeleteSurvey] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [isQuestionPopupOpen, setIsQuestionPopupOpen] = useState(false);
  const [surveyQuestions, setSurveyQuestions] = useState([]);
  const [selectedSurveyId, setSelectedSurveyId] = useState(0);
  const [selectedSurvey, setSelectedSurvey] = useState("");
  const [deletedQuestionCount, setDeletedQuestionCount] = useState(0);
  const [selectedSurveyTopic, setSelectedSurveyTopic] = useState("");
  const [deleteData, setDeleteData] = useState([]);
  const [errorPopup, setErrorPopup] = useState(false);

  const deleteTableRows = async (index, rowData) => {
    const shouldDelete = window.confirm(
      "Bu anketi silmek istediğinize emin misiniz?"
    );
    if (shouldDelete) {
      try {
        const response = await SurveyService.delete(rowData.surveyOid);
        console.log(response);
        if (response.status === 200) {
          console.log(rowData);
          setDeleteMessage(rowData.surveyTitle + " başarıyla silindi.");
          setIsPopupOpen(true);
          const rows = [...surveys];
          rows.splice(index, 1);
          setSurveys(rows);
          setDeleteSurvey(true);
        } else {
          alert("Bir hata meydana geldi");
        }
      } catch (error) {
        console.log(error);
        setDeleteMessage("Cevaplanmış anketler silinemez");
        setIsPopupOpen(true);
      }
    }
  };
  const closePopup = () => {
    setIsPopupOpen(false);
    setErrorPopup(false);
  };
  const navigate = useNavigate();
  const handleEditClick = (rowData) => {
    console.log(rowData);
    navigate(`/anketler/guncelle/${rowData.surveyOid}`, { state: rowData });
  };
  const handleShowButton = async (rowData) => {
    try {
      const response = await SurveyService.getSurveyQuestions(
        rowData.surveyOid
      );
      setDeletedQuestionCount(0);
      setSurveyQuestions(response);
      setIsQuestionPopupOpen(true);
      setSelectedSurvey(rowData.surveyTitle);
      setSelectedSurveyTopic(rowData.courseTopic);
      setSelectedSurveyId(rowData.surveyOid);
      console.log(rowData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const closeShowPopup = () => {
    setIsQuestionPopupOpen(false);
  };
  const handleRemoveQuestion = (index, item) => {
    const updatedQuestions = [...surveyQuestions];
    updatedQuestions[index].deleted = !updatedQuestions[index].deleted;
    setSurveyQuestions(updatedQuestions);
    setDeletedQuestionCount(
      deletedQuestionCount + (updatedQuestions[index].deleted ? 1 : -1)
    );
    if (deleteData.includes(item.questionIds)) {
      setDeleteData((prev) =>
        prev.filter((value) => value !== item.questionIds)
      );
    } else {
      setDeleteData((prev) => [...prev, item.questionIds]);
    }
  };
  const handleRemoveSurveyQuestions = async () => {
    try {
      await SurveyService.removeSurveyQuestions(selectedSurveyId, deleteData);
      setDeleteMessage(deleteData.length + " adet soru çıkarılmıştır.");
      setIsQuestionPopupOpen(false);
      setIsPopupOpen(true);
    } catch (error) {
      setErrorPopup(true);
      setIsQuestionPopupOpen(false);
    }
    setDeleteData([]);
  };
  useEffect(() => {
    setDeleteSurvey(false);
    const fetchSurveys = async () => {
      try {
        const response = await SurveyService.list();
        if (response.status === 200) {
          // API yanıtındaki "surveyTags" alanını düzenle
          const formattedSurveys = response.data.map((survey) => ({
            ...survey,
            surveyTags: survey.surveyTags
              .map((tag) => tag.tagString)
              .join(", "),
          }));
          setSurveys(formattedSurveys.reverse());
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSurveys();

    return () => {
      console.log("useEffect clean up");
    };
  }, [deleteSurvey]);

  const header2 = {
    header: "Tüm Anketler", to: "/anketler", describe:
      "Anket görüntüleme sayfasına hoşgeldiniz buradan anketleri görüntüleyebilir, güncelleyebilir veya silebilirsiniz."
  };

  const subtitle = [
    {
      title: "Anasayfa",
      to: "/yonetici-sayfasi",
    },
    {
      title: "Anket İşlemleri",
      to: "/anketler",
    },
    {
      title: "Anket Oluşturma",
      to: "/anket-olustur"
    },
    {
      title: "Tüm Anketler",
      to: "/anketler",
    },
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-10 bg-slate-100 h-full">
        <BreadCrumbs header={header2} subtitle={subtitle} />
        <Table
          data={surveys}
          header={header}
          useSurveyIcons={true}
          showTableData={handleShowButton}
          deleteTableRows={deleteTableRows}
          editTableRows={handleEditClick}
        />
        {isPopupOpen && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-75 bg-gray-800 ">
            <div className="bg-white p-8 rounded shadow flex flex-col justify-center align-center gap-5">
              <div className="font-semibold text-lg">{deleteMessage}</div>
              <Button gray rounded onClick={closePopup}>
                Tamam
              </Button>
            </div>
          </div>
        )}
        {isQuestionPopupOpen && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-75 bg-gray-800  ">
            <div className="bg-white py-8 px-16 flex flex-col gap-10 max-h-[85vh] overflow-y-auto w-[50vw]">
              <div className="flex flex-col gap-4">
                <div className="text-center text-2xl">{selectedSurvey}</div>
                <div className="text-center text-xl">{selectedSurveyTopic}</div>
              </div>
              <div className="flex flex-col gap-8 ">
                {surveyQuestions.map((item, index) => (
                  <div
                    className={`flex gap-4 justify-between${item.deleted
                        ? " justify-between line-through text-red-500"
                        : ""
                      }`}
                    key={index}
                  >
                    {index + 1} - {item.questionType=="Matriks"? item.questionString.split(" $$ ").join(", ") : item.questionString}{" "} 
                    <RiDeleteBin6Line
                      onClick={() => handleRemoveQuestion(index, item)}
                      className="w-6 h-6 text-red-500 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-10 justify-center mb-4">
                <Button
                  className="w-1/4 rounded font-semibold"
                  gray
                  onClick={closeShowPopup}
                >
                  Kapat
                </Button>
                <Button
                  className="w-1/4 rounded font-semibold"
                  secondary
                  onClick={handleRemoveSurveyQuestions}
                >
                  Çıkart ({deletedQuestionCount})
                </Button>
              </div>
            </div>
          </div>
        )}
        {errorPopup && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-75 bg-gray-800 ">
            <div className="bg-white p-8 rounded shadow flex flex-col justify-center align-center gap-5 w-1/4">
              <div className="flex justify-end">
                <AiOutlineClose
                  className="text-red-600 cursor-pointer"
                  onClick={closePopup}
                />
              </div>
              <div className="font-semibold text-lg text-red-600 pr-1">
                {" "}
                {selectedSurvey} adlı anket atanmıştır. Atama yapılan
                anketlerden soru çıkarılamaz !
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TumAnketler;
