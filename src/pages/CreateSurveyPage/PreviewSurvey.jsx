import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Layout from "../../components/Layout";
import BreadCrumbs from "../../components/BreadCrumbs";
import Button from "../../components/Button";
import SurveyService from "../../services/SurveyService.js";
import "./createsurvey.css";
import icon from "../../assets/icons/icons8-arrow-30.png";

function PreviewSurvey() {
  const location = useLocation();
  const surveyTitle = location.state.surveyTitle;
  const surveyOid = location.state.surveyOid;
  const selectedQuestions = location.state.selectedQuestions;
  const navigate = useNavigate();
  var requiredIndexes = [];

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCancelConfirmationOpen, setIsCancelConfirmationOpen] =
    useState(false);

  const handleCancel = (e) => {
    e.preventDefault();
    setIsCancelConfirmationOpen(true);
  };

  const handleSendSurvey = () => {
    console.log(selectedQuestions);

    selectedQuestions.forEach((question) => {
      if (question.required) {
        requiredIndexes.push(question.questionOid);
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
      questionIds: selectedQuestions.map((question) => ({
        questionOid: question.questionOid,
        order: question.order,
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

              {selectedQuestions.map((question, index) => (
                <div key={index} className="m-2 p-2">
                  <p className="mb-16">
                    {index + 1}. {question.questionString}
                    {question.required && (
                      <span className="text-red-700 text-xl"> *</span>
                    )}
                  </p>
                </div>
              ))}
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
      </div>
    </Layout>
  );
}

export default PreviewSurvey;
