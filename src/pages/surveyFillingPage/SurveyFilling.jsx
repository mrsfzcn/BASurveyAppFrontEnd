import { useLocation, useNavigate,useParams  } from "react-router-dom";
import { useState,useEffect  } from "react";
import SurveyService from "../../services/SurveyService.js";
import StudentService from "../../services/StudentService.js";
import "./surveyfilling.css"
import MultipleChoiceSurvey from "./MultipleChoiceSurvey";
import LikertSurvey from "./LikertSurvey";
function SurveyFilling() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const tokenValue = searchParams.get("Value");
    const [selectedOption, setSelectedOption] = useState(null);
    const [surveyTitle, setSurveyTitle] = useState('');
    const [firstName , setFirstName] = useState('');
    const [lastName , setLastName ] = useState('');
  const [questions, setQuestions] = useState([]);
      useEffect(() => {
        const fetchStudentData = async () => {
            try {
              const response = await StudentService.findUserIdByEmailToken(tokenValue)
              console.log(response);
              setFirstName(response.data.firstName);
              setLastName(response.data.lastName);
              } catch (error) {
              console.error(error);
            }
          };
        const fetchData = async () => {
          try {
            const response = await SurveyService.findSurveyByEmailToken(tokenValue)
            console.log(response);
            setQuestions(response.data.questions);
            setSurveyTitle(response.data.surveyTitle)
            } catch (error) {
            console.error(error);
          }
        };
        fetchStudentData();
        fetchData();
      }, []);
      const [upData, setUpData] = useState([]); 
      const renderComponent = (type,options,questionId) => {
        console.log(type);
        if (type === "Çoktan Seçmeli") {
          return (
            <MultipleChoiceSurvey
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
        } else {
          return null; 
        }
      };
      console.log(upData);

  return (
<div className="flex flex-col grid-flow-col justify-center items-center bg-[#8dc2ec] min-h-screen  rounded relative" >
    <div className="bg-white mt-9 rounded flex flex-col bg-[#e8f2fb] w-1/2 px-8  " >  

    <h2 className="text-3xl font-bold text-center mb-4 pt-4 ">{surveyTitle}</h2>
    <p className="text-justify pt-2 px-4 mb-16 text-l">
      Merhaba Arkadaşlar, <br />
      Sizlere daha iyi destek olabilmek adına hazırlamış olduğumuz Boost Eğitim Süreci Anketini doldurmanızı rica ederiz.
      Teşekkürler
      <br /><br /> <br />
      Merhaba, {firstName} {lastName}.. Bu formu gönderdiğinizde, sahibi adınızı ve e-posta adresinizi görür.
      <br /> <br /> <br />
      <strong className="text-red-700">Gerekli*</strong>
    </p>

    {questions.map((question, index) => (
      <div key={index} className="m-2 p-2">
        <p className="">
          {index + 1}. {question.questionString}{question.required && <span className="text-red-700 text-xl"> *</span>}
        </p>
        <div className="flex flex-row items-center      ">
                    {renderComponent(question.questionType,question.options,question.oid)}
                  </div>
      </div>
    ))}


  </div>
  </div>
  );
}

export default SurveyFilling;