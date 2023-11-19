import { useState, useEffect } from "react";
import "./list.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/Layout.jsx";
import SortIcon from "../user/AllUsers/svg/sort-solid.jsx";
import Alert from "../../components/Alert.jsx";
import Input from "../../components/Input.jsx";
import BreadCrumbs from "../../components/BreadCrumbs.jsx";

export default function CourseList() {
  const [selectedCombo, setSelectedCombo] = useState(10);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const [courseList, setcourseList] = useState([]);
  const [search, setSeach] = useState("");
  const [searchedList, setSearchedList] = useState([]);
  const token = localStorage.getItem("token");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(10);
  const [paginationLength, setPaginationLength] = useState();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const navigate = useNavigate();
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [sortName, setSortName] = useState();
  const [sortSurname, setSortSurname] = useState();
  const BASE_URL = import.meta.env.VITE_BASE_URL


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/course/active-course`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setcourseList(response.data);
      setSearchedList(response.data);
      console.log(response.data);
      setPaginationLength(Math.ceil(searchedList.length / itemsPerPage));
    } catch (error) {
      setcourseList([]);
      console.error(error);
    }
  };
  const filterCourses = (courseList, search, currentPage, itemsPerPage) => {
    const filteredList = courseList.filter((item) =>
      item.name.toLowerCase().trim().includes(search.toLowerCase().trim())
    );
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);
    setSearchedList(currentItems);
    setPaginationLength(Math.ceil(filteredList.length / itemsPerPage));
  };

  useEffect(() => {
    filterCourses(courseList, search, currentPage, itemsPerPage);
  }, [search, currentPage, itemsPerPage, courseList]);

  const handleCombo = (event) => {
    setSelectedCombo(event.target.value);
    setItemPerPage(event.target.value);
  };

  const handleSearch = (e) => {
    setSeach(e.target.value);
  };

  const handleSortName = () => {
    const status = !sortName;
    setSortName(status);
    const courseListCopy = [...courseList];
    if (status) {
      courseListCopy.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      courseListCopy.sort((a, b) => b.name.localeCompare(a.name));
    }
    setcourseList(courseListCopy);
  };

  const filteredCourseList = courseList.filter((item) =>
    item.name.toLowerCase().trim().includes(search.toLowerCase().trim())
  );

  const currentItems = filteredCourseList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );


  const header = {
    header: "Tüm Kurslar", href: "/kurslar", describe:
        "Kurs görünteleme sayfasına hoşgeldiniz buradan bütün kursları görüntüleyebilirsiniz."
}
const subtitle = [
    {
        title: "Anasayfa",
        href: "/yonetici-sayfasi"
    },
    {
        title: "Kurslar",
        href: "/kurslar"
    }
]


return (
  <>
    <Layout>
      <div className="background ">
        <div>
          <div className="allUsersHeaderDiv ">
            <div style={{marginLeft: "70px"}}>
              <BreadCrumbs header={header} subtitle={subtitle} />
            </div>                         
          </div>
        </div>
        <div className="list ">
          <div>
            <div className="flexColumnContainer ">
              <div className="listPageShow ">
                <span>Göster: </span>
                <div>
                  <select
                    className="combo-box"
                    value={selectedCombo}
                    onChange={handleCombo}
                  >
                    <option value={2}>2</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                  </select>
                </div>
                <span> Satır</span>
              </div>
              <div className="listAra">
                <span>Ara: </span>
                <Input className="araButton" onChange={handleSearch} />
              </div>
            </div>
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: "3rem",
                height: "58vh",
                marginLeft: "5%",
                
              }}
            >
              <div className="flex justify-center content-center">
              <table >
                <thead>
                  <tr>
                    <th style={{ width: "13rem", paddingBottom: "2rem"  }}>
                      <span>Kurs Adı</span>
                      <button className="bottomSort" onClick={handleSortName}>
                        <SortIcon />
                      </button>
                    </th>
                  </tr>
                  
                </thead>
                <tbody className="lineTableBody ">
                  {currentItems.map((course, index) => (
                     <TableRow course={course} key={course.oid} index={index} />
                    ))}
                  </tbody>
              </table>
              </div>
            </div>
            <div className="footer mobile:m-0">
              <div>
                <p style={{ marginBottom: "2rem" }}>
                  {courseList.length} Kurstan {currentItems.length} tanesi
                  gösteriliyor.
                </p>
              </div>
              <div>
                {currentPage > 1 && (
                  <button className="beforeAndNextButton" onClick={() => paginate(currentPage - 1)}>
                    ÖNCEKİ
                  </button>
                )}
                {Array.from({
                  length: paginationLength,
                }).map((_, index) =>
                  currentPage - 1 === index || currentPage === index ? (
                    <button
                      key={index}
                      className={currentPage === index + 1 ? "paginationButton active" : "paginationButton"}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ) : null
                )}

                {currentPage < paginationLength && (
                  <button className="beforeAndNextButton" onClick={() => paginate(currentPage + 1)}>
                    SONRAKİ
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        {alert.type && <Alert type={alert.type} message={alert.message} />}
      </div>
    </Layout>
  </>
);
}

function TableRow({course}){
  
  const [spinner, setSpinner] = useState("default");
  return <tr className={`tableRow rowBackground ${spinner=="success"&&"rowBackgroundSuccessFade"} ${spinner=="error"&&"rowBackgroundErrorFade"}`} key={course.oid}>
  {console.log(course)}
  <td style={{ width: "13rem" }}>{course.oid}</td>
  <td style={{ width: "13rem" }}>{course.name}</td>
  <td style={{ width: "15rem" }}>
  </td>
</tr>
}