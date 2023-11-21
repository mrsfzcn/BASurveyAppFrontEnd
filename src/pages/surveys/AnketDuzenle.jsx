import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Layout from "../../components/Layout";
import BreadCrumbs from "../../components/BreadCrumbs";
import Button from "../../components/Button";
import { useParams } from "react-router-dom";
import SurveyService from "../../services/SurveyService";

const AnketDuzenle = () => {
  const location = useLocation();
  let params = useParams();
  const rowData = location.state;

  const [surveyOid, setsurveyOid] = useState();
  const [surveyTitle, setSurveyTitle] = useState();
  const [survayTag, setSurveyTag] = useState();
  const [courseTopic, setCourseTopic] = useState();
  const navigate = useNavigate();
  if (!rowData === null) {
    setsurveyOid(rowData.surveyOid);
    setSurveyTitle(rowData.surveyTitle);
    setSurveyTag(rowData.surveyTags);
    setCourseTopic(rowData.courseTopic);
  }



  useEffect(() => {
    if (params.id) {
      SurveyService.surveyGetById(params.id)
        .then((response) => {
          setsurveyOid(response.data.oid);
          setSurveyTitle(response.data.surveyTitle);
          const rendered = response.data.surveyTags.map((tag)=> tag.name).join(", ");
          setSurveyTag(rendered);
          
          setCourseTopic(response.data.courseTopic);
        })
        .catch((error) => {
          alert(params.id + "nolu anket bulunamamıştır");
        });
    }
  }, [params.id]);

  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(surveyOid, surveyTitle, survayTag, courseTopic);
    const updateSurveyData = {
      surveyOid,
      surveyTitle,
      courseTopic,
    };
    SurveyService.update(updateSurveyData)
    .then(
      window.location.href="/anketler"
    )
    .catch((error) => {
      console.log(error.response);
      if (error.response && error.response.data && error.response.data.customMessage) {
        console.log("Error:"+ error.response.data.customMessage)
      } else {
        console.log("Bir hata oluştu...")
      }
    });
  };

  const header = { header: "Anket Güncelle", href: "/anketler/guncelle" };

  const subtitle = [
    {
      title: "Anasayfa",
      href: "/",
    },
    {
      title: "Anket İşlemleri",
      href: "/anketler",
    },
    {
      title: "Anket Güncelle",
      href: "/anketler/guncelle",
    },
  ];

  const navigateMain = (e) => {
    navigate("/anketler");
  };

  return (
    <Layout>
      <div className="flex flex-col bg-white h-full">
        <BreadCrumbs header={header} subtitle={subtitle} />
        <form
          onSubmit={handleSubmit}
          className="class1 flex justify-center align-center"
        >
          <div className="class2 bg-[#F1F1F1] flex justify-center align-center m-auto ">
            <div className="class3 bg-[#FEFEFE] m-auto  flex flex-col justify-center gap-14 ">
              <div className="flex flex-col gap-14 justify-center items-center">
                <div className="flex items-center justify-between w-[600px] ">
                  <label className="font-semibold w-[150px] ">Anket No</label>
                  <Input disabled value={surveyOid} full />
                </div>
                <div className="flex items-center   w-[600px] ">
                  <label className="font-semibold w-[150px]">Anket Adı</label>
                  <Input
                    onChange={(e) => setSurveyTitle(e.target.value)}
                    value={surveyTitle}
                    full
                  />
                </div>
                <div className="flex items-center w-[600px]">
                  <label className="font-semibold  w-[150px]">
                    Anket Başlığı
                  </label>
                  <Input
                    onChange={(e) => setCourseTopic(e.target.value)}
                    value={courseTopic}
                    full
                  />
                </div>
                <div className="flex items-center w-[600px]">
                  <label className="font-semibold w-[150px]">
                    Anket Etiketi
                  </label>
                  <Input
                    onChange={(e) => setSurveyTag(e.target.value)}
                    value={survayTag}
                    full
                  />
                </div>
              </div>
              <div className="flex justify-center gap-7 flex-wrap">
                <Button primary rounded bold>
                  Gönder
                </Button>
                <Button
                  onClick={navigateMain}
                  className=""
                  secondary
                  rounded
                  bold
                >
                  VAZGEÇ
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AnketDuzenle;
