import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from "react-router-dom";
import BreadCrumbs from '../../../components/BreadCrumbs';
import Layout from '../../../components/Layout';
import ClassCourseService from '../../../services/ClassCourseService';
import "../studentList/studentListPage.css";

function ClassListPage() {
  const navigate = useNavigate();


  const [classObj, setClassObj] = useState([]);

  const columns = [
    {
      name: "No",
      selector: (row) => row.id,
      sortActive: true,
    },
    {
      name: "Sınıf Adı",
      selector: (row) => row.name,
      sortActive: true,
    },
    {
      name: "Açılma Tarihi",
      selector: (row) => formatDate(row.startDate),
      sortActive: true,
    },
    {
      name: "Kapanma Tarihi",
      selector: (row) => formatDate(row.endDate),
      sortActive: true,
    },
    {
      name: "Master Trainer",
      selector: (row) => row.masterTrainer,
      sortActive: true,
    },
    {
      name: "Assistant Trainer",
      selector: (row) => row.assistantTrainer,
      sortActive: true,
    },
    {
      name: "Info",
      cell: (row) => (
        <button
          style={{
            backgroundColor: "#64E9B1",
            borderRadius: 20,
            width: 75,
            height: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => handleInfoClick(row.id)}
        >
          Detay
        </button>
      ),
    },
  ];

  const formatDate = (dateArray) => {
    const dateObject = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
    const formattedDate = `${dateObject.getDate()}.${
      dateObject.getMonth() + 1
    }.${dateObject.getFullYear()}`;
    return formattedDate;
  };


const handleInfoClick = (classId) => {
  navigate(`/sayfa/${classId}`);
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ClassCourseService.list();
        console.log(response.data);
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
      <div className="flex flex-col  gap-10 bg-slate-100 h-full">
        <BreadCrumbs header={header2} subtitle={subtitle} />
        <DataTable columns={columns} data={classObj} style={{ width: "50%" }} />
      </div>
    </Layout>
  );
}

export default ClassListPage