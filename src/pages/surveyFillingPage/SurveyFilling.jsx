import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SurveyService from "../../services/SurveyService.js";
import StudentService from "../../services/StudentService.js";
import TrainerTagService from "../../services/TrainerTagService.js";
import "./surveyfilling.css";
import MultipleChoiceSurvey from "./MultipleChoiceSurvey";
import MultiOptionalMultiSelectableSurvey from "./MultiOptionalMultiSelectableSurvey.jsx";
import MultiOptionalMultiSelectableAndOtherSurvey from "./MultiOptionalMultiSelectableAndOtherSurvey.jsx";
import LikertSurvey from "./LikertSurvey";
import OpenEndedSurvey from "./OpenEndedSurvey.jsx";
import MatrixSurveyPreview from "./MatrixSurvey.jsx";
import LocalStorageServiceAuth from "../../store/auth-store.js"
import LocalStorageServiceUser from "../../store/user-store.js"
import axios from "axios";
import AuthService from "../../services/AuthService.js";
import Button from "../../components/Button.jsx";

function SurveyFilling() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tokenValue = searchParams.get("Value");
  const [selectedOption, setSelectedOption] = useState(null);
  const [surveyTitle, setSurveyTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [masterTrainers, setMasterTrainers] = useState({});
  const [assistantTrainers, setAssistantTrainers] = useState({});
  const [requiredIndexes, setRequiredIndexes] = useState([]);
  const [upData, setUpData] = useState([]);

  useEffect(() => {
    const fetchTrainersData = async () => {
      try {
        const response = await TrainerTagService.findTrainersEmailToken(
            tokenValue
        );
        const trainersResponses = response.data;

        trainersResponses.forEach((trainerRes) => {
          if (trainerRes.authorizedRole === "MASTER_TRAINER") {
            setMasterTrainers({
              firstName: trainerRes.firstName,
              lastName: trainerRes.lastName,
              authorizedRole: trainerRes.authorizedRole,
            });
          } else if (trainerRes.authorizedRole === "ASSISTANT_TRAINER") {
            setAssistantTrainers({
              firstName: trainerRes.firstName,
              lastName: trainerRes.lastName,
              authorizedRole: trainerRes.authorizedRole,
            });
          }
        });
      } catch (error) {
        console.error(error);
      }
    };

    const fetchStudentData = async () => {
      try {
        const response = await AuthService.findSurveyByEmail(tokenValue);

        LocalStorageServiceAuth.setToken(response.data.token)
        LocalStorageServiceAuth.setIsAuthenticated();
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        fetchTrainersData();
        fetchData();
      } catch (error) {
        console.error(error);
      }
    };



    fetchStudentData();

  }, []);

  const saveData = (questionId, responseData) => {
    setUpData((prevData) => {
      const existingResponseIndex = prevData.findIndex((data) => data.questionOid === questionId);

      if (existingResponseIndex !== -1) {
        const updatedUpData = [...prevData];
        updatedUpData[existingResponseIndex] = {
          questionOid: questionId,
          response: responseData,
        };
        
        return updatedUpData;
      } else {
        const newResponse = {
          questionOid: questionId,
          response: responseData,
        };
        return [...prevData, newResponse];
      }
    });

    upData.map(item => ({ questionOid: item.questionOid, response: item.response }));
    
  };

  console.log("Güncellenmiş upData:", upData);




  const renderComponent = (type, options, questionId, question) => {
    const handleSaveData = (responseData) => {
      saveData(questionId, responseData);
    };

    if (type === "Çoktan Seçmeli") {
      return (
          <MultipleChoiceSurvey
              multipleQuestionOid={questionId}
              multipleOptions={options}
              onSelected={handleSaveData}
          />
      );
    } else if (type === "Likert") {
      return (
          <LikertSurvey
              likertQuestionOid={questionId}
              likertOptions={options}
              onSelected={handleSaveData}
          />
      );
    } else if (type === "Açık Uçlu") {
      return <OpenEndedSurvey
          questionOid={questionId}
          onSelected={handleSaveData}
          />;
    } else if (type === "Çok Seçenekli Çok Seçilebilir ve Seçenek Girilebilir") {
      return (
          <MultiOptionalMultiSelectableAndOtherSurvey
              multiOptionalMultiSelectableAndOtherQuestionOid={questionId}
              multiOptionalMultiSelectableAndOtherOptions={options}
              onSelected={handleSaveData}
          />
      );
    } else if (type === "Çok Seçenekli Çok Seçilebilir") {
      return (
          <MultiOptionalMultiSelectableSurvey
              multiOptionalMultiSelectableOid={questionId}
              multiOptionalMultiSelectableOptions={options}
              onSelected={handleSaveData}
          />
      );
    } else if (type === "Matriks") {
      return <MatrixSurveyPreview
          options={options}
          question={question}
          onSelected={handleSaveData}
      />;
    } else {
      // Diğer durumları da ele alabilirsiniz.
      return null;
    }
  };



  const fetchData = async () => {
    try {
      const response = await SurveyService.findSurveyByEmailToken(tokenValue);
      console.log(response.data.requiredQuestionIndexes);
      setRequiredIndexes(response.data.requiredQuestionIndexes);
      setQuestions(response.data.questions);
      setSurveyTitle(response.data.surveyTitle);


      const payload = response.data.questions.map((question) => {
        return { questionOid: question.oid };
      });
      console.log("Payload:", payload);


    } catch (error) {
      console.error(error);
    }
  };

  const sendDataToDatabase = async (data) => {
    console.log(data);
    try {

      console.log("upData içeriği:", upData.map(item => ({ questionOid: item.questionOid, response: item.response })));

      const payload = data.map((e) => {
        return { questionOid: e.questionOid, responseString: e.response } 
      });


      const response = await axios.put(
          `http://localhost:8090/api/v1/responses/survey-answers/${tokenValue}`,
          payload
      );


      console.log("Veri başarıyla gönderildi!", response.data);

    } catch (error) {
      console.error("Veri gönderilirken hata oluştu:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendDataToDatabase(upData);
  };

  return (
      <div className="flex flex-col grid-flow-col items-center bg-[#8dc2ec] min-h-screen rounded relative">
        <div className="bg-white mt-9 rounded flex flex-col bg-[#e8f2fb] w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center mb-4 pt-4 ">{surveyTitle}</h2>
          <p className="text-justify pt-2 px-4 mb-7 text-l">
            Merhaba Arkadaşlar, <br />
            Sizlere daha iyi destek olabilmek adına hazırlamış olduğumuz Boost
            Eğitim Süreci Anketini doldurmanızı rica ederiz. Teşekkürler
            <br />
            <br />
            Merhaba,{" "}
            <span className="font-bold">
            {firstName} {lastName}
          </span>{" "}
            .. Bu formu gönderdiğinizde, sahibi adınızı ve e-posta adresinizi görür.
            <br /> <br />
            Uzman Eğitmen:{" "}
            <span className="font-bold">
            {masterTrainers.firstName} {masterTrainers.lastName}
          </span>
            <br />
            Asistan Eğitmen:{" "}
            <span className="font-bold">
            {assistantTrainers.firstName} {assistantTrainers.lastName}
          </span>
            <br />
            <br />
            <strong className="text-red-700">Gerekli*</strong>
          </p>
          {questions.map((question, index) =>
              question.questionType !== "Matriks" ? (
                  <div key={index} className="m-2 p-2">
                    <p className="">
                      {index + 1}. {question.questionString}
                      {requiredIndexes.includes(question.oid) && (
                          <span className="text-red-700 text-xl"> *</span>
                      )}
                    </p>
                    <div className="flex flex-row items-center">
                      {renderComponent(
                          question.questionType,
                          question.options,
                          question.oid
                      )}
                    </div>
                  </div>
              ) : (
                  <div key={index} className="m-2 p-2 flex gap-2">
                    <p className="">{index + 1}.</p>
                    <div className="flex flex-row">
                      {renderComponent(
                          question.questionType,
                          question.options,
                          question.oid,
                          question.questionString
                      )}
                    </div>
                  </div>
              )
          )}

          <Button
              primary
              circle
              fat
              bold
              onClick={handleSubmit}
              id={"submitButton"}
          >
            Anketi Gönder
          </Button>
        </div>
      </div>
  );
}

export default SurveyFilling;