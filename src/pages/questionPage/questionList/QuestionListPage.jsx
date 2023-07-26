import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./questionListPage.css";
import Table from '../../../components/questionTable/Table';
import Layout from '../../../components/Layout'
import QuestionService from '../../../services/QuestionService';
import BreadCrumbs from '../../../components/BreadCrumbs'

function QuestionListPage() {

  const [surveys, setSurveys] = useState([]);

  const header = ["No", "Soru", "Soru Etiketleri", "Soru Tipi", "İşlemler"];

  // To delete selected question
  const deleteTableRows = async (index, rowData) => {
    const response = await QuestionService.delete(rowData.questionOid);
    if (response.status === 200) {
      alert(rowData.questionOid + ". id'ye sahip soru başarıyla silindi");
    } else {
      alert("bir hata meydana geldi");
    }
    console.log(response);
    const rows = [...surveys];
    rows.splice(index, 1);
    setSurveys(rows);
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

  const header2 = { header: "Soru Listesi", href: "/questionlist" };
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
        <Table  data={surveys} header={header} useIcon={true} useLabel={true} deleteTableRows={deleteTableRows}/>
          </div>
        
        </Layout>
  )
}

export default QuestionListPage