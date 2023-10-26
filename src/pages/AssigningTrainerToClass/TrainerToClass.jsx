import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Layout from "../../components/Layout";
import Alert from "../../components/Alert";
import BreadCrumbs from "../../components/BreadCrumbs";
import "./TrainerToClass.css";
import Dropdown from "../../components/Dropdown";
import SurveyService from "../../services/SurveyService";
import TrainerService from "../../services/TrainerService";
import { AxiosError } from "axios";

const TrainerToClass = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [selection, setSelection] = useState(null);
  const [tagOptions, setTagOptions] = useState([]);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [trainerOptions, setTrainerOptions] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  const [data, setData] = useState({
    surveyname: "Eğitmen Adı",
    surveytitle: "Eğitmen Soyadı",
    colon: ":",
    classtosend: "Atanacağı Sınıf",
  });


  const numberOptions = [];
  for (let i = 1; i <= 10; i++) {
    numberOptions.push({ label: i.toString(), value: i });
  }

  useEffect(() => {
      const fetchDataTags = async () => {
        try {
            const response = await TrainerService.getAllTrainerTags()
            const tags = response.data;
            setTagOptions(tags.map((tag) => ({ label: tag.tagString, value: tag.tagStringId })));

        } catch (error) {
            console.error("Tag verileri alınırken bir hata oluştu:", error);
        }

    };
    const fetchData = async () => {
      try {
          const response = await TrainerService.list();
          const trainers = response.data;

          setTrainerOptions(trainers.map((trainer) => ({ label: trainer.email, value: trainer.oid ,trainerName: trainer.firstName ,trainerLastName: trainer.lastName})));

      } catch (error) {
          console.error("Eğitmen verileri alınırken bir hata oluştu:", error);
      }
  };
    fetchData();
    fetchDataTags();
  }, []);


  const onChange = (option) => {
    setSelection(option);
    setData({
      ...data,
      trainerNameIs: option.trainerName,
      trainerLastNameIs: option.trainerLastName,
    });
    setError("")
  };

  const handleCreate = (event) => {
    event.preventDefault();

    if (selection === null) {
      setError("Lütfen bir eğitmen seçiniz.");
      return;
    }

    if (!selectedClass) {
      setError("Lütfen bir sınıf seçiniz.");
      return;
    }



    const assignSurveyData = {
      trainerOid: selection.value,
      trainerTagOid: selectedClass.value,
    };
    TrainerService.assign(assignSurveyData)
      .then((response) => {
        setAlert({ type: "success", message: "Eğitmen sınıfa başarıyla eklendi." });
        setTimeout(() => {
          setAlert({ type: "", message: "" });
      }, 5000);
      })
      .catch((error) => {
        console.error("Trainer Assign hatası:", error);
      });
  };

  const header = {
    header: "Eğitmen Atama", href: "/assigning-trainer-to-class", describe:
      "Eğitmen atama sayfasına hoşgeldiniz buradan eğitmenleri ilgili olduğu sınıflara atayabilirsiniz." };

  const subtitle = [
    {
      title: "Anasayfa",
      href: "/adminhome",
    },
    {
      title: "Sınıf İşlemleri",
      href: "/assigning-trainer-to-class",
    },
    {
      title: "Sınıfa Eğitmen Atama ",
      href: "/assigning-trainer-to-class",
    },
  ];
  return (
    <Layout>
      <div className="flex flex-col bg-[#E5E5E5] h-full">
        <BreadCrumbs header={header} subtitle={subtitle} />
        <div className="flex h-full">
          <div className=" bg-[#F1F1F1] flex  justify-center align-center m-auto w-11/12 h-5/6 rounded">
            <div className="insideclass bg-[#FEFEFE] m-auto  flex flex-col justify-center gap-14  w-9/12 h-5/6 rounded">
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
                        const selectedSurvey = trainerOptions.find(
                          (survey) => survey.label === e.target.value
                        );
                        onChange(
                          selectedSurvey
                            ? selectedSurvey
                            : { label: e.target.value, trainerLastName: "" }
                        );
                      }}
                    >
                      <option value="">Eğitmen Seçiniz</option>
                      {trainerOptions.map((survey) => (
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

                      <p className=" w-128">{data.trainerNameIs}</p>
                    </div>
                    <div className="flex">
                      <p className=" w-32 text-left font-semibold">
                        {data.surveytitle}
                      </p>
                      <p className=" w-8 align-middle">{data.colon}</p>
                      <p className=" w-128">{data.trainerLastNameIs}</p>
                    </div>

                    <div className="flex items-center font-semibold">
                      <p className=" w-32 text-left">{data.classtosend}</p>
                      <p className=" w-8 align-middle">{data.colon}</p>

                      <Dropdown
                        className="w-128"
                        options={tagOptions}
                        onChange={setSelectedClass}
                        value={selectedClass}
                      />
                    </div>
                    <div className="  left-9vw z-50">
            {alert.type && (
              <Alert type={alert.type} message={alert.message} closable={true} />
            )}
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
                      
                    >
                      ATAMA YAP
                    </Button>
                    <Button
                      className=""
                      secondary
                      rounded
                      bold
                      onClick={() => {
                        navigate("/ogrencilistesi");
                      }}
                    >
                      VAZGEÇ
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TrainerToClass;
