import React, { useState, useEffect } from "react";
import "./list.css";
import { useNavigate } from "react-router-dom";
import DataTable from 'react-data-table-component';

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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function List() {
  const [selectedCombo, setSelectedCombo] = useState(10);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [userList, setUserList] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [paginationLength, setPaginationLength] = useState();
  const [sortField, setSortField] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const navigate = useNavigate();
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

  const successNotify = (string) => toast.success(string);
  const errorNotify = (string) => toast.error(string);
  const warnNotify = (string) => toast.warn(string);

  useEffect(() => {
    UserService.get()
      .then((response) => {
        setUserList(response.data);
        console.log(response.data);
        setPaginationLength(Math.ceil(response.data.length / itemsPerPage));
      })
      .catch((error) => {
        setUserList([]);
        console.error(error);
      });
  }, [itemsPerPage]);

  const columns = [
    {
      name: 'Adı',
      selector: 'firstName',
      sortable: true,
    },
    {
      name: 'Soyadı',
      selector: 'lastName',
      sortable: true,
    },
    {
      name: 'Eposta',
      selector: 'email',
      sortable: true,
    },
    {
      name: 'Kullanıcı Rolü',
      selector: 'authorizedRole',
      sortable: true,
    },
    {
      name: 'Kayıt Tarihi',
      selector: 'createdDate',
      sortable: true,
    },
    {
      name: 'İşlem',
      cell: (row) => (
        <div>
          <button className="editButton" onClick={() => handleEditClick(row.oid)}>
            <EditIcon />
          </button>
          <button onClick={() => handleDeleteClick(row.oid)}>
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];


  const handleCombo = (event) => {
    setSelectedCombo(event.target.value);
    setItemsPerPage(event.target.value);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleEditClick = async (oid) => {
    LocalStorageServiceUser.setUserOid(oid);
    navigate("/kullanici-bilgileri-guncelle");
  };


  const handleDeleteClick = async (oid) => {
    try {
      UserService.delete(oid);
      successNotify("Kullanıcı başarıyla silindi.");
      setUserList(userList.filter((user) => user.oid !== oid));
    } catch (error) {
      // console.error(error);
      // setAlert({
      //   type: "error",
      //   message: "Kullanıcı silme işlemi başarısız.",
      // });
      errorNotify(error.message);
    }
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleChangeRowsPerPage = (newPerPage, page) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(page);
  };

  const handleSort = (column, sortDirection) => {
    setSortField(column.selector);
    setSortAsc(sortDirection === 'asc');
  };

  const filteredList = userList.filter((item) =>
    item.firstName.toLowerCase().trim().includes(search.toLowerCase().trim())
  );

  const sortedList = sortField
    ? [...filteredList].sort((a, b) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];
      return sortAsc ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
    })
    : filteredList;

  const paginatedList = sortedList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const header = {
    header: "Tüm Kullanıcılar", href: "/kullanici", describe:
      "Kullanıcı görünteleme sayfasına hoşgeldiniz buradan bütün kullanıcıları görüntüleyebilirsiniz."
  }
  const subtitle = [
    {
      title: "Anasayfa",
      href: "/yonetici-sayfasi"
    },
    {
      title: "Kullanıcı İşlemleri",
      href: "/kullanici"
    }
  ];

  return (
    <>
      <Layout>
        <div className="background ">
          <div>
            <div className="allUsersHeaderDiv ">
              <div style={{ marginLeft: "70px" }}>
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
                <DataTable
                  columns={columns}
                  data={paginatedList}
                  pagination
                  paginationServer
                  paginationTotalRows={filteredList.length}
                  paginationPerPage={perPage}
                  paginationComponentOptions={{
                    noRowsPerPage: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  onSort={handleSort}
                  sortServer
                  sortIcon={<SortIcon />}
                  highlightOnHover
                  pointerOnHover
                  paginationRowsPerPageOptions={[2, 5, 10]}
                />
              </div>
              <div className="footer mobile:m-0">
                <div>
                  <p style={{ marginBottom: "2rem" }}>
                    {filteredList.length} kullanıcıdan {paginatedList.length} tanesi
                    gösteriliyor.
                  </p>
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
