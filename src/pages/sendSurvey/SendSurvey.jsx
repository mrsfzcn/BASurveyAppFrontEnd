import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Layout from "../../components/Layout";
import "./SendSurvey.css";
import Dropdown from "../../components/Dropdown";
import SurveyService from "../../services/SurveyService";

const SendSurvey = () => {
  const [surveyDays, setSurveyDays] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState({
    surveyname: "Anket Adı",
    surveytitle: "Konu Başlığı",
    colon: ":",
    classtosend: "Atanacağı Sınıf",
    days: "Anketin kullanılabileceği gün sayısı",
    selectedDate: null, 
  });

  const [selection, setSelection] = useState(null);
  const [studentOptions, setStudentOptions] = useState([]);
  const [surveyOptions, setSurveyOptions] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  const numberOptions = []; 
  for (let i = 1; i <= 10; i++) {
    numberOptions.push({ label: i.toString(), value: i });
  }

  useEffect(() => {
    SurveyService.getAllTag()
    .then((tags) => {
      const studentTags = tags.filter((tag) => tag.tagClass === "STUDENT");
      setStudentOptions(studentTags.map((tag) => ({ label: tag.tagName, value: tag.tagName })));
      console.log(studentTags);
    })
    .catch((error) => {
      console.error("Tag verileri alınırken bir hata oluştu:", error);
    });
  }, []);
  
  useEffect(() => {
    SurveyService.getAllSurveys()
    .then((surveys) => {
      setSurveyOptions(surveys.map((survey) => ({ label: survey.surveyTitle, value: survey.surveyOid, courseTopic: survey.courseTopic })));
      console.log(surveys);
    })
    .catch((error) => {
      console.error("Survey verileri alınırken bir hata oluştu:", error);
    });
  }, []);

  const onChange = (option) => {
    setSelection(option);
    setData({ ...data, surveynameis: option.label, titleanswer: option.courseTopic });
  };

  const handleClassChange = (event) => {
    setData({ ...data, classtosend: event.target.value });
  };

  const handleDaysChange = (event) => {
    setSurveyDays(event.target.value);
  };
  const today = new Date();
  const todayISOString = today.toISOString().split("T")[0];
  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate >= today) {
      setData({ ...data, selectedDate: event.target.value });
      setError("");
    } else {
      setData({ ...data, selectedDate: "" });
      setError("Geçmiş tarihleri seçemezsiniz!");
    }
  };
  const handleCreate = (event) => {
    event.preventDefault();
    console.log(data);
  };

  return (
    <Layout>
      <div className="flex flex-col bg-[#E5E5E5] h-full">
        <div className="p-5 text-start">Bitmesi bekleniyor</div>
        <div className="outerclass flex justify-center align-center">
          <div className="innerclass bg-[#F1F1F1] flex  justify-center align-center m-auto ">
            <div className="insideclass bg-[#FEFEFE] m-auto h-auto flex flex-col justify-center gap-14 ">
              <form
                onSubmit={handleCreate}
                className=" flex flex-col justify-center items-center gap-14"
              >
                <div className="flex flex-col justify-center gap-10">
                  <div className="flex flex-row gap-5 justify-between items-center p-7 mt-0">
                
                   <select
                            className="border rounded-md p-2 outline-none"
                            value={selection ? selection.label : ""}
                            onChange={(e) => {
                              const selectedSurvey = surveyOptions.find(survey => survey.label === e.target.value);
                              onChange(selectedSurvey ? selectedSurvey : { label: e.target.value, courseTopic: "" });
                            }}
                          >
                            <option value="">Seçiniz</option>
                            {surveyOptions.map((survey) => (
                              <option key={survey.value} value={survey.label}>
                                {survey.label}
                              </option>
                            ))}
                          </select>

                           
                    <Button className="bg-[#e0e0e0] " rounded bold>
                      Bul
                    </Button>
                  </div>
                  <div className="flex flex-col gap-5">
                    <div className="flex ">
                      <p className=" w-32 text-left font-semibold">{data.surveyname}</p>
                      <p className=" w-8 align-middle">{data.colon}</p>
                      
                      <p className=" w-128">{data.surveynameis}</p>
                    </div>
                    <div className="flex">
                      <p className=" w-32 text-left font-semibold" >{data.surveytitle}</p>
                      <p className=" w-8 align-middle">{data.colon}</p>
                      <p className=" w-128">{data.titleanswer}</p>
                    </div>
            
                    <div className="flex items-center font-semibold">
                      <p className=" w-32 text-left">{data.classtosend}</p>
                      <p className=" w-8 align-middle">{data.colon}</p>
                    
                      <Dropdown
                        className="w-128"
                        options={studentOptions}
                        onChange={setSelectedClass}
                        value={selectedClass}
                      />
                    </div>     
                    <div className="flex items-center font-semibold">
                      <p className=" w-32 text-left">{data.days}</p>
                      <p className=" w-8 align-middle">{data.colon}</p>
                    
                      <Input
                        type="number"
                        className="w-1/2"
                        value={surveyDays}
                        onChange={handleDaysChange}
                      />
                
                    </div>               
                    {/* Tarih Seçici */}
                        <div className="flex items-center font-semibold">
                          <p className="w-32 text-left">Tarih Seç:</p>
                          <p className="w-8 align-middle">{data.colon}</p>
                          <input
                              type="date"
                              min={todayISOString}
                              className="w-128"
                              value={data.selectedDate || ""}
                              onChange={handleDateChange}
                            />
                          {error && <p>{error}</p>}
                        </div> 
       
                  </div>
  
 
                  <div className="flex gap-7 justify-center flex-wrap mt-20 mb-10">
                  <Button className="" primary rounded bold>
                    ATAMA YAP
                  </Button>
                  <Button className="" secondary rounded bold>
                    VAZGEÇ
                  </Button>
                </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SendSurvey;
