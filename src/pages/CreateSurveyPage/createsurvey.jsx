import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import SurveyService from "../../services/SurveyService.js";
import icon from "../../assets/icons/icon.png";
import BreadCrumbs from "../../components/BreadCrumbs";
import "./createsurvey.css";

function CreateSurvey() {
  const [surveyTitle, setSurveyTitle] = useState("");
  const [courseTopic, setCourseTopic] = useState("");
  const [errorTitle, setErrorTitle] = useState(""); 
  const [errorTopic, setErrorTopic] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isCancelConfirmationOpen, setIsCancelConfirmationOpen] =
  useState(false);

  const handleTitleChange = (e) => {
    setSurveyTitle(e.target.value);
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setIsCancelConfirmationOpen(true);
  };
  const handleTopicChange = (e) => {
    setCourseTopic(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorTitle("");
    setErrorTopic("");

    if (!surveyTitle && !courseTopic) {
      setErrorTitle("Lütfen Anket Adı alanını doldurunuz!");
      setErrorTopic("Lütfen Anket Konu Başlığı alanını doldurunuz!");
      return;
    } else if (!surveyTitle) {
      setErrorTitle("Lütfen Anket Adı alanını doldurunuz!");
      return;
    } else if (!courseTopic) {
      setErrorTopic("Lütfen Anket Konu Başlığı alanını doldurunuz!");
      return;
    }


    const createSurveyData = {
      surveyTitle,
      courseTopic,
    };

    SurveyService.create(createSurveyData)
      .then((response) => {
        const surveyOid = response.data.surveyOid; 
        navigate("/addquestion", { state: { surveyTitle, surveyOid } }); 
        console.log(surveyOid)

      })
      .catch((error) => {
        console.log(error.response);
        if (error.response && error.response.data && error.response.data.customMessage) {
          setError(error.response.data.customMessage);
        } else {
          setError("Bir hata oluştu!");
        }
      });
  };
  const header = { header: "Anket Oluşturma", href: "/createsurvey" };

  const subtitle = [
    {
      title: "Anasayfa",
      href: "/adminhome",
    },
    {
      title: "Anket İşlemleri",
      href: "/anketler",
    },
    {
      title: "Anket Oluşturma",
      href: "/createsurvey",
    },
  ];
  return (
    <Layout>
           <div className="flex flex-col h-full">
      <BreadCrumbs header={header} subtitle={subtitle} />
      <div className="flex h-full ">

        <div className="flex-[8_8_0%] flex  justify-center items-center ">
          <div className="flex justify-center items-center bg-gray-300 w-11/12 h-5/6 rounded">
            <div className="flex bg-white justify-center items-center w-9/12 h-5/6 rounded">
              <form className="space-y-8 ">
                <Input
                  type="text"
                  placeholder="Yeni anket adını yazınız"
                  value={surveyTitle}
                  onChange={handleTitleChange}
                  className="w-full"
                />
                  {errorTitle && <p className="text-red-500">{errorTitle}</p>}
                <Input
                  type="text"
                  placeholder="Konu başlığını yazınız"
                  value={courseTopic}
                  onChange={handleTopicChange}
                  className="w-full"
                />
                   {errorTopic && <p className="text-red-500">{errorTopic}</p>}
                   {error && <p className="text-red-500 mt-4">{error}</p>}
                <div className="flex justify-center items-center">
                  <label htmlFor="submitButton" className="mr-2 text-lg font-bold font-poppins">
                    Soru ekle/düzenle
                  </label>
                  <Button primary circle fat onClick={handleSubmit} id="submitButton">
                    <img src={icon} alt="Icon" className="w-8 h-10" />
                  </Button>
                </div>
                <div className="flex justify-center">
                <Button secondary rounded bold onClick={(e) => handleCancel(e)}>
  VAZGEÇ
</Button>
                    {isCancelConfirmationOpen && (
                      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-75 bg-gray-800">
                        <div className="bg-white p-8 rounded shadow">
                          <p className="text-xl font-bold mb-4">
                            Emin misiniz?
                          </p>
                          <p>
                            Anket oluşturma işleminden vazgeçmek istediğinize
                            emin misiniz?
                          </p>
                          <p>Tüm Anketler Sayfasına Yönlendirileceksiniz.</p>
                          <Button
                            primary
                            rounded
                            className="mt-4"
                            onClick={() => {
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

              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
}

export default CreateSurvey;
