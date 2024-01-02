import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumbs from "../../../components/BreadCrumbs";
import Layout from "../../../components/Layout";
import ClassDetailsService from "../../../services/ClassDetailsService";
import "../classDetails/ClassDetails.css"
import DataTable from "react-data-table-component";

const ClassDetails = () => {
    const { id } = useParams();
    const [students, setStudents] = useState([]);

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
        await ClassDetailsService.getStudents(id).then((res) => { setStudents(res.data) })
        console.log((students));
    }

    useEffect(() => {
        getStudents();

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

    return (
      <Layout>
        <div className="backGround">
          <div className="breadCrumbs">
            <BreadCrumbs header={header} subtitle={subtitle} />
          </div>
          <div className="table">
            <DataTable columns={columns} data={students} />
          </div>
        </div>
      </Layout>
    );



};

export default ClassDetails;
