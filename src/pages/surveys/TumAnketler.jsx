import React, { useState, useEffect } from "react";
import Table from "../../components/Table/Table";
import Layout from "../../components/Layout";
import SurveyService from "../../services/SurveyService";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumbs from "../../components/BreadCrumbs";

const TumAnketler = () => {
  const [surveys, setSurveys] = useState([]);

  const header = ["No", "Anket Adı", "Konu Başlığı"];
  const [deleteSurvey, setDeleteSurvey] = useState(false);
  const deleteTableRows = async (index, rowData) => {
    const shouldDelete = window.confirm("Bu anketi silmek istediğinize emin misiniz?");
    if (shouldDelete) {
      try {
        const response = await SurveyService.delete(rowData.surveyOid);
        console.log(response);
        if (response.status === 200) {
          alert(rowData.surveyOid + ". id'ye sahip anket başarıyla silindi");
          const rows = [...surveys];
          rows.splice(index, 1);
          setSurveys(rows);
          setDeleteSurvey(true);
        } else {
          alert("Bir hata meydana geldi");
        }
      } catch (error) {
        console.log(error);
        alert("Bir hata meydana geldi");
      }
    }
  };
  const navigate = useNavigate();

  const handleEditClick = (rowData) => {
    console.log(rowData);
    navigate(`/anketler/guncelle/${rowData.surveyOid}`, { state: rowData });
  };

  useEffect(() => {
    setDeleteSurvey(false);
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
  }, [deleteSurvey]);

  const header2 = { header: "Tüm Anketler", href: "/anketler" };

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
      title: "Tüm Anketler",
      href: "/anketler",
    },
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-10 bg-slate-100 h-full">
        <BreadCrumbs header={header2} subtitle={subtitle} />
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
