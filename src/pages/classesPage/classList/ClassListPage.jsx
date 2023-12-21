import React, { useEffect, useState } from 'react';
import "../studentList/studentListPage.css";
import { Link, useNavigate } from "react-router-dom";
import Table from '../../../components/Table/Table';
import Layout from '../../../components/Layout'
import StudentService from '../../../services/StudentService';
import BreadCrumbs from '../../../components/BreadCrumbs'
import ClassCourseService from '../../../services/ClassCourseService';

function ClassListPage() {
    //Gelen kurs/sınıf bilgisin tutulacağı değişken
    const [classObj, setClassObj] = useState([]);
  
    const header = ["No", "Sınıf Adı", "Açılma Tarihi", "Kapanma Tarihi","Master Trainer","Asistant Tranier"];
  
  
  
    const navigate = useNavigate();
  
   
  
    // To get all list 
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await ClassCourseService.list()
          console.log(response);
          setClassObj(response.data);
          } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, []);
  
  const header2 = { header: "Sınıf Listesi", to: "/sinif-listesi", describe: "Sınıf listeleme sayfasına hoş geldiniz mevcut sınıfları kontrol edebilirsiniz" };
    const subtitle = [
      {
        title: "Anasayfa",
        to: "/yonetici-sayfasi",
      },
      {
        title: "Sınıf İşlemleri",
        to: "/sinif-listesi",
      },
      {
        title: "Sınıf Listesi",
        to: "/sinif-listesi",
      },
    ];
    
    return (
      <Layout>  
          <div className='flex flex-col  gap-10 bg-slate-100 h-full'>
          <BreadCrumbs header={header2} subtitle={subtitle} />
          <Table  data={classObj} header={header}   />
            </div>
          </Layout>
    )
  }
  
  export default ClassListPage