import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumbs from "../../../components/BreadCrumbs";
import Layout from "../../../components/Layout";
import ClassDetailsService from "../../../services/ClassDetailsService";
import "../classDetails/ClassDetails.css"

const ClassDetails = () => {
    const { id } = useParams();
    const [students, setStudents] = useState([]);

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
        <Layout >
            <div className="backGround">
                <div className="breadCrumbs">
                    <BreadCrumbs header={header} subtitle={subtitle} />
                </div>
                <div className="detailsPage">
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>İsim</th>
                                <th>Soyisim</th>
                                <th>Email</th>
                                <th>Durum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={student.id} className={student.state === "DELETED" ? "deleted" : "active"}>
                                    <td>{index + 1}</td>
                                    <td>{student.firstName}</td>
                                    <td>{student.lastName}</td>
                                    <td>{student.email}</td>
                                    <td>{student.state}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );



};

export default ClassDetails;
