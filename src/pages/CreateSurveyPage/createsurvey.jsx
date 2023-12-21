import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import CustomComboBoxPlus from '../../pages/questionPage/CustomComboBoxPlus';
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import SurveyService from "../../services/SurveyService.js";
import icon from "../../assets/icons/icon.png";
import BreadCrumbs from "../../components/BreadCrumbs";
import "./createsurvey.css";
import QuestionService from "../../services/QuestionService";

function CreateSurvey() {
  const [surveyTitle, setSurveyTitle] = useState("");
  const [surveyTagsOptions, setSurveyTagsOptions] = useState([]);
  const [courseTopic, setCourseTopic] = useState("");
  const [customComboBoxData, setCustomComboBoxData] = useState([]);
  const [createSurvey, setCreateSurvey] = useState({

    surveyTags: [],
});
  const [errorTitle, setErrorTitle] = useState(""); 
  const [errorTopic, setErrorTopic] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isCancelConfirmationOpen, setIsCancelConfirmationOpen] =
  useState(false);
  useEffect(() => {

    const fetchDataTags = async () => {
        try {
            const response = await SurveyService.getAllSurveyTags();
            
            const types = response;
            setSurveyTagsOptions(types.map((type) => ({ label: type.tagString, value: type.tagStringId })));

        } catch (error) {
            console.error("Tag verileri alınırken bir hata oluştu:", error);
        }

    };
    fetchDataTags();

}, []);
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
  const handleCustomComboBoxPlusData = (data) => {
    setCustomComboBoxData(data);
    const a = data.map((i) =>
        i.value
    );
    setCreateSurvey({ ...createSurvey, surveyTags: a })

};

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorTitle("");
    setErrorTopic("");
    console.log(createSurvey);
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
      surveyTagIds:createSurvey.surveyTags,
    };

    SurveyService.create(createSurveyData)
      .then((response) => {
        const surveyOid = response.data.surveyOid; 
        navigate("/soru-ekle", { state: { surveyTitle, surveyOid } }); 
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
  const header = {
    header: "Anket Oluşturma", to: "/anket-olustur", describe:
      "Anket oluşturma sayfasına hoşgeldiniz buradan anket oluşturabilirsiniz." };

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
      to: "/anket-olustur",
    },
  ];
  return (
    <Layout>
      <div className="flex flex-col h-full ">
        <BreadCrumbs header={header} subtitle={subtitle} />
        <div className="flex h-full ">

          <div className="flex-[8_8_0%] flex  justify-center items-center ">
            <div className="flex justify-center items-center bg-gray-300 w-11/12 h-5/6 rounded">
              <div className="  bg-white  w-9/12 h-5/6 rounded">
                <form className="flex flex-row justify-center items-center w-full h-full">
                  <div className="flex flex-col gap-9  ">
                    <div className="flex flex-col  items-start gap-8 w-9/10">
                      <Input
                        type="text"
                        placeholder="Yeni anket adını yazınız"
                        value={surveyTitle}
                        onChange={handleTitleChange}
                        className="w-3/4"
                      />
                      {errorTitle && <p className="text-red-500">{errorTitle}</p>}
                      <Input
                        type="text"
                        placeholder="Konu başlığını yazınız"
                        value={courseTopic}
                        onChange={handleTopicChange}
                        className="w-3/4"
                      />
                      {errorTopic && <p className="text-red-500">{errorTopic}</p>}
                      {error && <p className="text-red-500 mt-4">{error}</p>}
                    </div>
                    <div className="flex  items-center " style={{ height: '100%', weight: '120%', left: '2.8vw' }}>
                      <span className="text-base font-medium mr-2">Anket etiketi</span>
                      <span className="mr-3">:</span>
                      <div style={{
                        top: '1vh',
                        width: '20vw',
                        left: '0.8vw',

                      }}>
                        < CustomComboBoxPlus options={surveyTagsOptions} placeholder="Giriniz" onGetCustomPlusData={handleCustomComboBoxPlusData} />
                      </div>
                    </div>
                  </div>

                  <div className=" flex flex-col  ">
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
