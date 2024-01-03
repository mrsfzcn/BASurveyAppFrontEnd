import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import BreadCrumbs from '../../components/BreadCrumbs';
import TrainerService from '../../services/TrainerService';
import Table from '../../components/Table/Table';
import LocalStorageServiceUser from '../../store/user-store';

function SurveyReport() {
  const [trainers, setTrainers] = useState([]);
  const [enteredId, setEnteredId] = useState('');

  const header = ["Id", "Adı", "Soyadı", "E-posta", "Kayıt Tarihi"];



  const handleIdChange = (e) => {
    setEnteredId(e.target.value);
  };

  const handleConfirmClick = async () => {
    try {
      const response = await fetch(`http://localhost:8090/api/v1/responses/export-personalized-report-to-excel/${enteredId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (response.ok) {
        const excel = await response.blob();
        const excelBlob = URL.createObjectURL(excel);
        let a = document.createElement('a');
        a.href = excelBlob;
        a.download = `${enteredId}.xlsx`;
        a.click();
      } else {
        console.error("İstekte bir sorun oluştu:", response.statusText);
      }
    } catch (error) {
      console.error("İstek sırasında bir hata oluştu:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TrainerService.list();
        setTrainers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const header2 = { header: "Anket Raporlama", to: "/anket-raporlama", describe: "Sınıflara ait anket raporlarına buradan ulaşabilirsiniz" };
  const subtitle = [
    {
      title: "Anasayfa",
      to: "/yonetici-sayfasi",
    },
    {
      title: "Anket Raporları",
      to: "/anket-raporlama",
    },
  ];

  return (
      <Layout>
        <div className='flex flex-col gap-10 bg-slate-100 h-full'>
          <BreadCrumbs header={header2} subtitle={subtitle} />
          <div className='flex justify-center content-center mt-5'>
            <input
                type="text"
                placeholder="ID giriniz"
                value={enteredId}
                onChange={handleIdChange}
                className="border p-2 mr-2"
            />
            <button
                onClick={handleConfirmClick}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Kişisel Rapor Al
            </button>
          </div>
          <Table
              data={trainers}
              header={header}
              useIcon={false}
              useLabel={false}

          />
        </div>
      </Layout>
  );
}

export default SurveyReport;
