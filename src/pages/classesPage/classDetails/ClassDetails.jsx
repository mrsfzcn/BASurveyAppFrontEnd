import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumbs from "../../../components/BreadCrumbs";
import Layout from "../../../components/Layout";
import ClassDetailsService from "../../../services/ClassDetailsService";
import "../classDetails/ClassDetails.css"
import DataTable from "react-data-table-component";
import Input from "../../../components/Input";

const ClassDetails = () => {
    const { id } = useParams();
    const [students, setStudents] = useState([]);
    const [filteredList, setFilteredList] = useState([]);

    const columns = [
      {
        name: "No",
        selector: (row, index) => index + 1,
        sortable: true,
      },
      {
        name: "İsim",
        selector: (row) => row.firstName,       
        sortable: true,
      },
      {
        name: "Soyisim",
        selector: (row) => row.lastName,
        sortable: true,
      },
      {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
      },
      {
        name: "Durum",
        selector: (row) => row.state,
        sortable: true,
      },
    ];

    async function getStudents() {
        await ClassDetailsService.getStudents(id)
        .then((res) => { setStudents(res.data)
          setFilteredList(res.data);
        }).catch((err) => {
          setFilteredList([]);
          console.log(err);
        })
    }

    useEffect(() => {
      getStudents();
      console.log(columns);
    }, [])

    const header = {
        header: "Sınıf detay",
        to: `/sayfa/${id}`,
        describe:
            "Sınıf bilgilerinin göründüğü sayfa",
    };

    const subtitle = [
        {
            title: "Anasayfa",
            to: "/yonetici-sayfasi",
        },
        {
            title: "Sınıf İşlemleri",
            to: `/sinif-listesi`,
        },
        {
            title: "Sınıf listesi",
            to: `/sinif-listesi`,
        },
      {
            title: "Sınıf detay",
            to: `/sayfa/${id}`,
        },
    ];

    const handleSearch = (searchTerm) => {  
      console.log(searchTerm)   
      
      const filteredList = students.filter((student) =>      
      student.firstName.toLowerCase().includes(searchTerm.target.value.toLowerCase().trim()));
      setFilteredList(filteredList);   
    };

    const paginationComponentOptions = {
      rowsPerPageText: 'Satır Sayısı',
      rangeSeparatorText: 'of',
      selectAllRowsItem: true,
      selectAllRowsItemText: 'Tümü',
    };




    return (
      <Layout>
        <div className="background">
          <div className="allUsersHeaderDiv ">
            <div style={{ marginLeft: "70px" }}>
            <BreadCrumbs header={header} subtitle={subtitle} />
            </div>
          </div>
          <div className="list px-8">
            <div className="flexColumnContainer flex items-center justify-end">
          <div className="listAra pb-4 ">
          <span>Ara: </span>
            <Input className="araButton" onChange={handleSearch} />
          </div>
            </div>
          <div className="flex flex-col  gap-10 bg-slate-100 h-full">
            <DataTable 
              columns={columns} 
              data={filteredList} 
              pagination 
              paginationTotalRows={filteredList.length} 
              paginationRowsPerPageOptions={[2, 5, 10]}
              paginationComponentOptions={paginationComponentOptions}
              />
          </div>
          <div className="footer mobile:m-0">
                <div>
                  <p style={{ marginBottom: "2rem" }}>
                  {students.length} Öğrenciden {filteredList.length} tanesi
                    gösteriliyor.
                  </p>
                </div>
            </div>
          </div>
        </div>
      </Layout>
    );



};

export default ClassDetails;
