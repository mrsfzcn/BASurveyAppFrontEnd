import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Layout from "../../components/Layout";
import BreadCrumbs from "../../components/BreadCrumbs";
import "./SendSurvey.css";
import Dropdown from "../../components/Dropdown";
import SurveyService from "../../services/SurveyService";
import { AxiosError } from "axios";

const SendSurvey = () => {
  const [surveyDays, setSurveyDays] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [selection, setSelection] = useState(null);
  const [studentOptions, setStudentOptions] = useState([]);
  const [surveyOptions, setSurveyOptions] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCancelConfirmationOpen, setIsCancelConfirmationOpen] =
    useState(false);

  const [data, setData] = useState({
    surveyname: "Anket Adı",
    surveytitle: "Konu Başlığı",
    colon: ":",
    classtosend: "Atanacağı Sınıf",
    days: "Anketin kullanılabileceği gün sayısı",
    selectedDate: null,
  });

  useEffect(() => {
    const setDefaultDate = () => {
      const today = new Date();
      const todayISOString = today.toISOString().split("T")[0];
      
      setData((prevData) => ({
        ...prevData,
        selectedDate: todayISOString,
      }));
    };

    
    setDefaultDate();
  }, []);

  const numberOptions = [];
  for (let i = 1; i <= 10; i++) {
    numberOptions.push({ label: i.toString(), value: i });
  }

  useEffect(() => {
    SurveyService.getAllTag()
      .then((tags) => {
        setStudentOptions(
          tags.map((tag) => ({ label: tag.tagString, value: tag.oid }))
        );
      })
      .catch((error) => {
        console.error("Tag verileri alınırken bir hata oluştu:", error);
      });
  }, []);

  useEffect(() => {
    SurveyService.getAllSurveys()
      .then((surveys) => {
        setSurveyOptions(
          surveys.map((survey) => ({
            label: survey.surveyTitle,
            value: survey.surveyOid,
            courseTopic: survey.courseTopic,
          }))
        );
      })
      .catch((error) => {
        console.error("Survey verileri alınırken bir hata oluştu:", error);
      });
  }, []);

  const onChange = (option) => {
    setSelection(option);
    setData({
      ...data,
      surveynameis: option.label,
      titleanswer: option.courseTopic,
    });
  };

  const handleDaysChange = (event) => {
    const inputValue = event.target.value;

    if (inputValue === "" || parseInt(inputValue) > 0) {
      setSurveyDays(inputValue);
      setError("");
    } else {
      setError("Gün sayısı en az 1 olabilir.");
    }
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

    if (!selection.courseTopic) {
      setError("Lütfen bir anket seçiniz.");
      return;
    }

    if (!selectedClass) {
      setError("Lütfen bir sınıf seçiniz.");
      return;
    }

    if (!surveyDays || parseInt(surveyDays) <= 0) {
      setError("Lütfen geçerli bir gün sayısı giriniz.");
      return;
    }

    if (!data.selectedDate) {
      setError("Lütfen geçerli bir tarih seçiniz.");
      return;
    }
    const selectedDateFormatted = new Date(
      data.selectedDate
    ).toLocaleDateString("en-GB");
    const assignSurveyData = {
      surveyId: selection.value,
      studentTagId: selectedClass.value,
      days: surveyDays,
      startDate: selectedDateFormatted,
    };
    SurveyService.assign(assignSurveyData)
      .then((response) => {
        setIsPopupOpen(true);
      })
      .catch((AxiosError) => {
        if (AxiosError.response.data.exceptionCode === 9019) {
          setError("Seçilen sınıfta öğrenci bulunmamaktadır.");
        } else if (AxiosError.response.data.exceptionCode === 9032) {
          setError("İlgili anket bu sınıfa daha önceden gönderilmiştir.");
        }
      });
  };
  const closePopup = () => {
    setIsPopupOpen(false);
    navigate("/anketler");
  };
  const header = {
    header: "Anket Gönderme", to: "/anket-gonder", describe:
      "Anket oluşturma sayfasına hoşgeldiniz buradan anketlerinizi oluşturabilirsiniz." };

  const handleCancel = () => {
    setIsCancelConfirmationOpen(true);
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
      to: "/anket-olustur",
    },
    {
      title: "Anket Gönderme",
      to: "anket-gonder"
    }
  ];
  return (
    <Layout>
      <div className="flex flex-col bg-[#E5E5E5] h-full">
        <BreadCrumbs header={header} subtitle={subtitle} />
        <div className="outerclass flex justify-center align-center">
          <div className="innerclass bg-[#F1F1F1] flex  justify-center align-center m-auto ">
            <div className="insideclass bg-[#FEFEFE] m-auto h-auto flex flex-col justify-center gap-14 ">
              <div
                // onSubmit={handleCreate}
                className=" flex flex-col justify-center items-center gap-14"
              >
                <div className="flex flex-col justify-center gap-10">
                  <div className="flex flex-row gap-5 justify-between items-center p-7 mt-0">
                    <select
                      id="underline_select"
                      className="flex text-lg m-auto h-auto py-2.5 px-0 w-full text-sm text-black-500 bg-transparent border-0 border-b-2 border-black-200 appearance-none dark:text-black-400 dark:border-black-700 focus:outline-none focus:ring-0 focus:border-black-200 peer"
                      value={selection ? selection.label : ""}
                      onChange={(e) => {
                        const selectedSurvey = surveyOptions.find(
                          (survey) => survey.label === e.target.value
                        );
                        onChange(
                          selectedSurvey
                            ? selectedSurvey
                            : { label: e.target.value, courseTopic: "" }
                        );
                      }}
                    >
                      <option value="">Anket Seçiniz</option>
                      {surveyOptions.map((survey) => (
                        <option key={survey.value} value={survey.label}>
                          {survey.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-5">
                    <div className="flex ">
                      <p className=" w-32 text-left font-semibold">
                        {data.surveyname}
                      </p>
                      <p className=" w-8 align-middle">{data.colon}</p>

                      <p className=" w-128">{data.surveynameis}</p>
                    </div>
                    <div className="flex">
                      <p className=" w-32 text-left font-semibold">
                        {data.surveytitle}
                      </p>
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
                    </div>
                    {error && <p className="text-red-600 font-bold">{error}</p>}
                  </div>

                  <div className="flex gap-7 justify-center flex-wrap mt-20 mb-10">
                    <Button
                      className=""
                      primary
                      rounded
                      bold
                      onClick={handleCreate}
                      disabled={!selection}
                    >
                      ATAMA YAP
                    </Button>
                    <Button
                      className=""
                      secondary
                      rounded
                      bold
                      onClick={handleCancel}
                    >
                      VAZGEÇ
                    </Button>
                    {isCancelConfirmationOpen && (
                      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-75 bg-gray-800">
                        <div className="bg-white p-8 rounded shadow">
                          <p className="text-xl font-bold mb-4">
                            Emin misiniz?
                          </p>
                          <p>
                            Anket gönderme işleminden vazgeçmek istediğinize
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
              </div>
            </div>
          </div>
        </div>
        {isPopupOpen && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-75 bg-gray-800">
            <div className="bg-white p-8 rounded shadow">
              <p className="text-xl font-bold mb-4">Başarı!</p>
              <p>{selection.label} anketi {selectedClass.label} sınıfına başarı ile gönderildi!</p>

              <Button primary rounded className="mt-4" onClick={closePopup}>
                Tamam
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SendSurvey;
