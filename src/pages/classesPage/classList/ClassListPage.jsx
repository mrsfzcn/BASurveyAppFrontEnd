import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from "react-router-dom";
import BreadCrumbs from '../../../components/BreadCrumbs';
import Layout from '../../../components/Layout';
import ClassCourseService from '../../../services/ClassCourseService';
import "../studentList/studentListPage.css";
import Input from '../../../components/Input';

function ClassListPage() {
  const navigate = useNavigate();
  const [classObj, setClassObj] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const columns = [
    {
      name: "No",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Sınıf Adı",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Açılma Tarihi",
      selector: (row) => formatDate(row.startDate),
      sortable: true,
    },
    {
      name: "Kapanma Tarihi",
      selector: (row) => formatDate(row.endDate),
      sortable: true,
    },
    {
      name: "Master Trainer",
      selector: (row) => row.masterTrainer,
      sortable: true,
    },
    {
      name: "Assistant Trainer",
      selector: (row) => row.assistantTrainer,
      sortable: true,
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
        setClassObj(response.data);
        setFilteredList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (searchTerm) => {
    const filteredList = classObj.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredList(filteredList);
  };

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
  const paginationComponentOptions = {
    rowsPerPageText: 'Satır Sayısı',
    rangeSeparatorText: 'of',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Tümü',
};
    

  return (
    <Layout>
      <div className="backgroundContainer">        
        <div className='allUsersHeaderDiv'>
          <div style={{ marginLeft: "70px" }}>
            <BreadCrumbs header={header2} subtitle={subtitle} />
          </div>
        </div>
        <div>
        <div className="list px-8">
        <div className="flexColumnContainer flex items-center justify-end">
              <div className="listAra pb-4 ">
            <span>Ara: </span>
                <Input className="araButton" onChange={(e) => handleSearch(e.target.value)} />
          </div>
        </div>
            <div className="flex flex-col  gap-10 bg-slate-100 h-full" >
              <DataTable columns={columns} 
                data={filteredList} 
                pagination
                paginationRowsPerPageOptions={[2, 5, 10]}
                paginationComponentOptions={paginationComponentOptions}
        />
        </div>
        <div className="footer mobile:m-0">
                <div>
                  <p style={{ marginBottom: "2rem" }}>
                  {classObj.length} Sınıftan {filteredList.length} tanesi
                    gösteriliyor.
                  </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ClassListPage