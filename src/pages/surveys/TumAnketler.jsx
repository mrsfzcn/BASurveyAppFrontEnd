import React, { useState, useEffect } from "react";
import Table from "../../components/Table/Table";
import Layout from "../../components/Layout";
import SurveyService from "../../services/SurveyService";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumbs from "../../components/BreadCrumbs";
import Button from "../../components/Button";

const TumAnketler = () => {
  const [surveys, setSurveys] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const header = ["No", "Anket Adı", "Konu Başlığı","Anket etiketleri"];
  const [deleteSurvey, setDeleteSurvey] = useState(false);
  const [deleteMessage,setDeleteMessage] = useState("");
  const deleteTableRows = async (index, rowData) => {
    const shouldDelete = window.confirm("Bu anketi silmek istediğinize emin misiniz?");
    if (shouldDelete) {
      try {
        const response = await SurveyService.delete(rowData.surveyOid);
        console.log(response);
        if (response.status === 200) {
          console.log(rowData);
          setDeleteMessage(rowData.surveyTitle + " başarıyla silindi.")
          setIsPopupOpen(true); 
          const rows = [...surveys];
          rows.splice(index, 1);
          setSurveys(rows);
          setDeleteSurvey(true);
        } else {
          alert("Bir hata meydana geldi");
        }
      } catch (error) {
        console.log(error);
        setDeleteMessage("Cevaplanmış anketler silinemez")
        setIsPopupOpen(true); 
      }
    }
  };
  const closePopup = () => {
    setIsPopupOpen(false); 
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
          deleteTableRows={deleteTableRows}
          editTableRows={handleEditClick}
        />
         {isPopupOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-75 bg-gray-800">
          <div className="bg-white p-8 rounded shadow flex flex-col justify-center align-center gap-5">
            
            <p>{deleteMessage}</p>
            <Button gray rounded onClick={closePopup}>
              Tamam
            </Button>
          </div>
          
        </div>
        
      )}
      </div>
    </Layout>
  );
};

export default TumAnketler;
