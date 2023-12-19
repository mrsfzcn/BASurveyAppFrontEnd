import React, { useState, useEffect } from "react";
import "./list.css";
import { useNavigate } from "react-router-dom";

import Layout from "../../../../components/Layout";

import EditIcon from "../svg/edit-svg.jsx";
import SortIcon from "../svg/sort-solid.jsx";
import DeleteIcon from "../svg/delete-svg";
import Alert from "../../.../../../../components/Alert";
import Input from "../../../../components/Input";
import BreadCrumbs from "../../../../components/BreadCrumbs";
import LocalStorageServiceUser from "../../../../store/user-store.js";
import { axiosInstanceGlobal } from "../../../../axiosControl/axiosInstance/axiosInstance.js";
import UserService from "../../../../services/UserService.js";


export default function List() {
  const [selectedCombo, setSelectedCombo] = useState(10);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const [userList, setUserList] = useState([]);
  const [search, setSeach] = useState("");
  const [searchedList, setSearchedList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(10);
  const [paginationLength, setPaginationLength] = useState();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const navigate = useNavigate();
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [sortName, setSortName] = useState();
  const [sortSurname, setSortSurname] = useState();
  const [sortEposta, setSortEposta] = useState();
  const [sortKullaniciRolu, setSortKullaniciRolu] = useState();
  const [sortKayitTarihi, setSortKayitTarihi] = useState();

  useEffect(() => {
    UserService.get()
    .then((response)=>{
      setUserList(response.data);
      setSearchedList(response.data);
      console.log(response.data);
      setPaginationLength(Math.ceil(searchedList.length / itemsPerPage));
    })
    .catch((error)=>{
      setUserList([]);
      console.error(error);
    })
  }, []);

  const filterUsers = (userList, search, currentPage, itemsPerPage) => {
    const filteredList = userList.filter((item) =>
      item.firstName.toLowerCase().trim().includes(search.toLowerCase().trim())
    );
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);
    setSearchedList(currentItems);
    setPaginationLength(Math.ceil(filteredList.length / itemsPerPage));
  };

  useEffect(() => {
    filterUsers(userList, search, currentPage, itemsPerPage);
  }, [search, currentPage, itemsPerPage, userList]);

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
     const userListCopy = [...userList];    
     if (status) {     
      userListCopy.sort((a, b) => a.firstName.localeCompare(b.firstName));       
    } else {     
         userListCopy.sort((a, b) => b.firstName.localeCompare(a.firstName));     
    }   
    setUserList(userListCopy); };

  const handleSortSurname = () => {
    const status = !sortSurname;
    setSortSurname(status);

    const userListCopy = [...userList];    
    if (status) {     
     userListCopy.sort((a, b) => a.lastName.localeCompare(b.lastName));       
   } else {     
        userListCopy.sort((a, b) => b.lastName.localeCompare(a.lastName));     
   }   
   setUserList(userListCopy); 
  };

  const handleSortEposta = () => {
    const status = !sortEposta;
    setSortEposta(status);

    const userListCopy = [...userList];    
    if (status) {     
     userListCopy.sort((a, b) => a.email.localeCompare(b.email));       
   } else {     
        userListCopy.sort((a, b) => b.email.localeCompare(a.email));     
   }   
   setUserList(userListCopy); 
  };

  const handleSortKullaniciRolu = () => {
    const status = !sortKullaniciRolu;
    setSortKullaniciRolu(status);

    const userListCopy = [...userList];    
    if (status) {     
     userListCopy.sort((a, b) => a.authorizedRole.localeCompare(b.authorizedRole));       
   } else {     
        userListCopy.sort((a, b) => b.authorizedRole.localeCompare(a.authorizedRole));     
   }   
   setUserList(userListCopy); 
  };

  const handleSortKayitTarihi = () => {
    const status = !sortKayitTarihi;
    setSortKayitTarihi(status);

    const userListCopy = [...userList];    
    if (status) {     
     userListCopy.sort((a, b) => a.createdDate.localeCompare(b.createdDate));       
   } else {     
        userListCopy.sort((a, b) => b.createdDate.localeCompare(a.createdDate));     
   }   
   setUserList(userListCopy); 
  };


  const handleEditClick = async (oid) => {    
    LocalStorageServiceUser.setUserOid(oid);
    navigate("/kullanici-bilgileri-guncelle"); //editleme url'i gelecek
  };

  const handleDeleteClick = async (oid) => {
    setAlert({ type: "", message: "" });
    try {
      UserService.delete(oid);
      setAlert({ type: "success", message: "Kullanıcı başarıyla silindi." });
      setUserList(userList.filter(user=>user.oid!=oid));
    } catch (error) {
      console.error(error);
      setAlert({
        type: "error",
        message: "Kullanıcı silme işlemi başarısız.",
      });
    }
  };

  const filteredUserList = userList.filter((item) =>
    item.firstName.toLowerCase().trim().includes(search.toLowerCase().trim())
  );

  const currentItems = filteredUserList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const header = {
    header: "Tüm Kullanıcılar", to: "/kullanici", describe:
      "Kullanıcı görünteleme sayfasına hoşgeldiniz buradan bütün kullanıcıları görüntüleyebilirsiniz." }
  const subtitle = [
    {
      title: "Anasayfa",
      to: "/yonetici-sayfasi"
    },
    {
      title: "Kullanıcı İşlemleri",
      to: "/kullanici"
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
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: "13rem", paddingBottom: "2rem"  }}>
                        <span>Adı</span>
                        <button className="bottomSort" onClick={handleSortName}>
                          <SortIcon />
                        </button>
                      </th>
                      <th style={{ width: "13rem", paddingBottom: "2rem" }}>
                        <span>Soyadı</span>
                        <button className="bottomSort" onClick={handleSortSurname}>
                          <SortIcon />
                        </button>
                      </th>
                      <th style={{ width: "15rem", paddingBottom: "2rem" }}>
                        <span>Eposta</span>
                        <button className="bottomSort" onClick={handleSortEposta}>
                          <SortIcon />
                        </button>
                      </th>
                      <th style={{ width: "13rem", paddingBottom: "2rem" }}>
                        <span>Kullanıcı Rolü</span>
                        <button className="bottomSort" onClick={handleSortKullaniciRolu}>
                          <SortIcon />
                        </button>
                      </th>
                      <th style={{ width: "13rem", paddingBottom: "2rem" }}>
                        <span>Kayıt Tarihi</span>
                        <button className="bottomSort" onClick={handleSortKayitTarihi}>
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
                        <td style={{ width: "13rem" }}>{user.email}</td>
                        <td style={{ width: "13rem" }}>
                          {user.authorizedRole}
                        </td>
                        <td style={{ width: "13rem" }}>{user.createdDate}</td>
                        <td style={{ width: "15rem" }}>
                          <button
                            className="editButton"
                            onClick={() => handleEditClick(user.oid)}
                          >
                            <EditIcon />
                          </button>
                          <button onClick={() => handleDeleteClick(user.oid)}>
                            <DeleteIcon />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="footer mobile:m-0">
                <div>
                  <p style={{ marginBottom: "2rem" }}>
                    {userList.length} kullanıcıdan {currentItems.length} tanesi
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
