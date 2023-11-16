import { useState, useEffect } from "react";
import "./list.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/Layout.jsx";
import SortIcon from "../user/AllUsers/svg/sort-solid.jsx";
import Alert from "../../components/Alert.jsx";
import Input from "../../components/Input.jsx";
import BreadCrumbs from "../../components/BreadCrumbs.jsx";
import RefreshIcon from "../user/AllUsers/svg/refresh-svg.jsx";

export default function BranchList() {
  const [selectedCombo, setSelectedCombo] = useState(10);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const [branchList, setBranchList] = useState([]);
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
    fetchData(); //Branch bilgisi eklenecek.
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/user/find-all-user-details`,//Buraya branch yolu gelecek.
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBranchList(response.data);
      setSearchedList(response.data);
      console.log(response.data);
      setPaginationLength(Math.ceil(searchedList.length / itemsPerPage));
    } catch (error) {
      setBranchList([]);
      console.error(error);
    }
  };

  const filterBranhces = (branchList, search, currentPage, itemsPerPage) => {
    const filteredList = branchList.filter((item) =>
      item.firstName.toLowerCase().trim().includes(search.toLowerCase().trim()) //firstName branchList geldiğinde name olarak değişmeli.
    );
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);
    setSearchedList(currentItems);
    setPaginationLength(Math.ceil(filteredList.length / itemsPerPage));
  };

  useEffect(() => {
    filterBranhces(branchList, search, currentPage, itemsPerPage);
  }, [search, currentPage, itemsPerPage, branchList]);

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
     const branchListCopy = [...branchList];    
     if (status) {     
      branchListCopy.sort((a, b) => a.firstName.localeCompare(b.firstName));       
    } else {     
      branchListCopy.sort((a, b) => b.firstName.localeCompare(a.firstName));     
    }   
    setBranchList(branchListCopy); };

  const handleSortSurname = () => {
    const status = !sortSurname;
    setSortSurname(status);

    const branchListCopy = [...branchList];    
    if (status) {     
      branchListCopy.sort((a, b) => a.lastName.localeCompare(b.lastName));       
   } else {     
    branchListCopy.sort((a, b) => b.lastName.localeCompare(a.lastName));     
   }   
   setBranchList(branchListCopy); 
  };

  


  const handleRefreshClick = async (oid) => {
  //Databasedeki değeri güncelleyecek ve buraya getirecek.
  };


  const filteredBranchList = branchList.filter((item) =>
    item.firstName.toLowerCase().trim().includes(search.toLowerCase().trim())
  );

  const currentItems = filteredBranchList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const header = {
    header: "Tüm Şubeler", href: "/subeler", describe:
      "Şube görünteleme sayfasına hoşgeldiniz buradan bütün şubeleri görüntüleyebilirsiniz." }
  const subtitle = [
    {
      title: "Anasayfa",
      href: "/yonetici-sayfasi"
    },
    {
      title: "Şubeler",
      href: "/subeler"
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
                        <span>Şube Adı</span>
                        <button className="bottomSort" onClick={handleSortName}>
                          <SortIcon />
                        </button>
                      </th>
                      <th style={{ width: "13rem", paddingBottom: "2rem" }}>
                        <span>Şehir</span>
                        <button className="bottomSort" onClick={handleSortSurname}>
                          <SortIcon />
                        </button>
                      </th>
                      <th style={{ width: "15rem", paddingBottom: "2rem" }}>
                        <span>İşlem</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="lineTableBody ">
                    {currentItems.map((user, index) => (
                      <tr className="tableRow" key={index}>
                        <td style={{ width: "13rem" }}>{user.firstName}</td>
                        <td style={{ width: "13rem" }}>{user.lastName}</td>
                        <td style={{ width: "15rem" }}>
                          <button
                            className="editButton"
                            onClick={() => handleRefreshClick(user.oid)}
                          >
                            <RefreshIcon />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
              <div className="footer mobile:m-0">
                <div>
                  <p style={{ marginBottom: "2rem" }}>
                    {branchList.length} Şubeden {currentItems.length} tanesi
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
