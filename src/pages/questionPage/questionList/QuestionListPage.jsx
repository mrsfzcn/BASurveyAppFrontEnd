import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./questionListPage.css";
import { Link, useNavigate } from "react-router-dom";
import Table from '../../../components/Table/Table';
import Layout from '../../../components/Layout'
import QuestionService from '../../../services/QuestionService';
import BreadCrumbs from '../../../components/BreadCrumbs'

function QuestionListPage() {

  const [surveys, setSurveys] = useState([]);

  const header = ["No", "Soru", "Soru Tipi", "Soru Etiketleri"];

  // To delete selected question
  const deleteTableRows = async (index, rowData) => {
    let response;
    try {
      response = await QuestionService.delete(rowData.questionOid);
    } catch (error) {
      alert(error.response.data.exceptionMessage);
    }

    if (response.data) {
      alert(rowData.questionOid + " No'lu soru başarıyla silindi");
    console.log(response);
    const rows = [...surveys];
    rows.splice(index, 1);
    setSurveys(rows);
    } else {
    alert("bir hata meydana geldi");
    }
  };

  const navigate = useNavigate();

  const handleEditClick = (rowData) => {
    console.log(rowData);
    navigate(`/questionlist/guncelle/${rowData.questionOid}`, { state: rowData });
  };

  // To get all list 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await QuestionService.list()
        console.log(response);
        setSurveys(response.data);
        } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const header2 = {
    header: "Soru Listesi", href: "/questionlist", describe:
      "Soru listesi sayfasına hoşgeldiniz buradan soruları görüntüleyebilirsiniz." };
  const subtitle = [
    {
      title: "Anasayfa",
      href: "/adminhome",
    },
    {
      title: "Soru İşlemleri",
      href: "/questionlist",
    },
    {
      title: "Soru Listesi",
      href: "/questionlist",
    },
  ];
    return (
    <Layout>

        <div className='flex flex-col  gap-10 bg-slate-100 h-full'>
        <BreadCrumbs header={header2} subtitle={subtitle} />
        <Table  data={surveys} header={header} useIcon={true} useLabel={false} deleteTableRows={deleteTableRows} editTableRows={handleEditClick}/>
          </div>
        
        </Layout>
  )
}

export default QuestionListPage