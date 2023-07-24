import React, { useState, useEffect } from "react";
import Table from "../../components/Table/Table";
import Layout from "../../components/Layout";
import SurveyService from "../../services/SurveyService";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";
const TumAnketler = () => {
  const [surveys, setSurveys] = useState([]);

  const header = ["No", "Anket Adı", "Konu Başlığı"];

  const deleteTableRows = async (index,rowData) => {
    const response = await SurveyService.delete(rowData.surveyOid);
    if (response.status === 200) {
      alert(rowData.surveyOid + ". id'ye sahip anket başarıyla silindi")
    }else{
      alert("bir hata meydana geldi")
    }
    console.log(response);
    const rows = [...surveys];
    rows.splice(index, 1);
    setSurveys(rows);
  };

  const navigate = useNavigate();

  const handleEditClick = (rowData) => {
    navigate(`/anketler/guncelle/${rowData.surveyOid}`, { state: rowData });
  };

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await SurveyService.list();
        console.log(response);
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
  }, []);

  return (
    <Layout>
      <div className="flex flex-col gap-10 bg-slate-100 h-full">
        <div className="h-10">dasda</div>
        <Table
          data={surveys}
          header={header}
          useIcon={true}
          useLabel={true}
          deleteTableRows={deleteTableRows}
          editTableRows={handleEditClick}
        />
      </div>
    </Layout>
  );
};

export default TumAnketler;
