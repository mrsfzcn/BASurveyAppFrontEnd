import React, { useEffect, useState } from 'react';
import "./trainerPage.css";
import { Link, useNavigate } from "react-router-dom";
import Table from '../../components/Table/Table';
import Layout from '../../components/Layout';
import TrainerService from '../../services/TrainerService';
import BreadCrumbs from '../../components/BreadCrumbs';
import LocalStorageServiceUser from '../../store/user-store';


function TrainerPage() {

    const [trainers, setTrainers] = useState([]);
  
    const header = ["No", "Adı", "Soyadı", "Eposta", "Kayıt Tarihi", "Tags"];
  
    // To delete selected question
    const deleteTableRows = async (index, rowData) => {
      const response = await TrainerService.delete(rowData.oid);
      if (response.status === 200) {
        alert(rowData.oid + " No'lu eğitmen başarıyla silindi");
      } else {
        alert("bir hata meydana geldi");
      }
      console.log(response);
      const rows = [...trainers];
      rows.splice(index, 1);
      setTrainers(rows);
    };
  
    const navigate = useNavigate();
  
    const handleEditClick = (rowData) => {
      console.log(rowData.oid);
      console.log(rowData)
      LocalStorageServiceUser.setUserOid(rowData.oid);
      LocalStorageServiceUser.setSelectedRole("Trainer");
      navigate("/kullanici-bilgileri-guncelle"); //editleme url'i gelecek
    };
  
    // To get all list 
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await TrainerService.list()
          console.log(response);
          setTrainers(response.data);
          } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, []);
  
  const header2 = { header: "Eğitmen Listesi", to: "/egitmenler", describe: "Eğitmen listeme sayfasına hoşgeldiniz." };
    const subtitle = [
      {
        title: "Anasayfa",
        to: "/yonetici-sayfasi",
      },
      {
        title: "Kullanıcı İşlemleri",
        to: "/egitmenler",
      },
      {
        title: "Eğitmen Listesi",
        to: "/egitmenler",
      },
    ];
    
    return (
      <Layout>
  
          <div className='flex flex-col  gap-10 bg-slate-100 h-full'>
          <BreadCrumbs header={header2} subtitle={subtitle} />
          <Table  data={trainers} header={header} useIcon={true} useLabel={true} deleteTableRows={deleteTableRows} editTableRows={handleEditClick}/>
            </div>
          
          </Layout>
    )
  }
  
  export default TrainerPage;