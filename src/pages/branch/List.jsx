import { useState, useEffect } from "react";
import "./list.css";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/Layout.jsx";
import SortIcon from "../user/AllUsers/svg/sort-solid.jsx";
import Alert from "../../components/Alert.jsx";
import Input from "../../components/Input.jsx";
import BreadCrumbs from "../../components/BreadCrumbs.jsx";
import RefreshIcon from "../user/AllUsers/svg/refresh-svg.jsx";
import LocalStorageServiceAuth from "../../store/auth-store.js";
import BranchListService from "../../services/BranchListService.js";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BranchList() {
  const [selectedCombo, setSelectedCombo] = useState(10);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const [branchList, setBranchList] = useState([]);
  const [search, setSeach] = useState("");
  const [searchedList, setSearchedList] = useState([]);
  const token = LocalStorageServiceAuth.getToken();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(10);
  const [paginationLength, setPaginationLength] = useState();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const navigate = useNavigate();
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [sortName, setSortName] = useState();
  const [sortCity, setSortCity] = useState();

  const successNotify = (string) => toast.success(string);
  const errorNotify = (string)=> toast.error(string);

  useEffect(()=>{
    BranchListService.getData()
  .then((response)=>{
    setBranchList(response.data);
    setSearchedList(response.data);
    setPaginationLength(Math.ceil(searchedList.length / itemsPerPage));
  })
  .catch((error)=>{
    setBranchList([]);
    console.error(error);
  });
  }, []);

  const filterBranhces = (branchList, search, currentPage, itemsPerPage) => {
    const filteredList = branchList.filter((item) =>
      item.name.toLowerCase().trim().includes(search.toLowerCase().trim())
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
      branchListCopy.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      branchListCopy.sort((a, b) => b.name.localeCompare(a.name));
    }
    setBranchList(branchListCopy);
  };

  const handleSortCity = () => {
    const status = !sortCity;
    setSortCity(status);

    const branchListCopy = [...branchList];
    if (status) {
      branchListCopy.sort((a, b) => a.city.localeCompare(b.city));
    } else {
      branchListCopy.sort((a, b) => b.city.localeCompare(a.city));
    }
    setBranchList(branchListCopy);
  };

  const handleRefreshClick = async (apiId, setSpinner) => {
    BranchListService.updateData(apiId)
      .then((resp) => {
        setSpinner("success");
        setBranchList(
          branchList.map((branch) => {
            if (branch.oid == resp.data.oid) return resp.data;
            return branch;
          })
        );
        setSearchedList(
          searchedList.map((branch) => {
            if (branch.oid == resp.data.oid) return resp.data;
            return branch;
          })
        );
        // setAlert({ type: "success", message: "Güncelleme başarılı!" });
        successNotify("Güncelleme başarılı!")
        setTimeout(() => {
          setSpinner("default");
          setAlert({ type: "", message: "" });
        }, 3000);
      })
      .catch((err) => {
        setSpinner("error");
        if (
          err.response.data.exceptionMessage.includes("Bu şube kapatılmıştır.")
        ) {
          setBranchList(branchList.filter((branch) => branch.apiId != apiId));
          setSearchedList(
            searchedList.filter((branch) => branch.apiId != apiId)
          );
        }

        // setAlert({
        //   type: "error",
        //   message: err.response.data.exceptionMessage,
        // });
        errorNotify(err.response.data.exceptionMessage)
        setTimeout(() => {
          setSpinner("default");
          setAlert({ type: "", message: "" });
        }, 3000);
      });
  };

  const filteredBranchList = branchList.filter((item) =>
    item.name.toLowerCase().trim().includes(search.toLowerCase().trim())
  );

  const currentItems = filteredBranchList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const header = {
    header: "Tüm Şubeler",
    to: "/subeler",
    describe:
      "Şube görünteleme sayfasına hoşgeldiniz buradan bütün şubeleri görüntüleyebilirsiniz.",
  };
  const subtitle = [
    {
      title: "Anasayfa",
      to: "/yonetici-sayfasi",
    },
    {
      title: "Şubeler",
      to: "/subeler",
    },
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
                <div className="flex justify-center content-center">
                  <table>
                    <thead>
                      <tr>
                        <th style={{ width: "13rem", paddingBottom: "2rem" }}>
                          <span>Şube Adı</span>
                          <button
                            className="bottomSort"
                            onClick={handleSortName}
                          >
                            <SortIcon />
                          </button>
                        </th>
                        <th style={{ width: "13rem", paddingBottom: "2rem" }}>
                          <span>Şehir</span>
                          <button
                            className="bottomSort"
                            onClick={handleSortCity}
                          >
                            <SortIcon />
                          </button>
                        </th>
                        <th style={{ width: "15rem", paddingBottom: "2rem" }}>
                          <span>Güncelle</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="lineTableBody ">
                      {currentItems.map((branch, index) => (
                        <TableRow
                          branch={branch}
                          key={branch.oid}
                          index={index}
                          handleRefreshClick={handleRefreshClick}
                        />
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
                    <button
                      className="beforeAndNextButton"
                      onClick={() => paginate(currentPage - 1)}
                    >
                      ÖNCEKİ
                    </button>
                  )}
                  {Array.from({
                    length: paginationLength,
                  }).map((_, index) =>
                    currentPage - 1 === index || currentPage === index ? (
                      <button
                        key={index}
                        className={
                          currentPage === index + 1
                            ? "paginationButton active"
                            : "paginationButton"
                        }
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ) : null
                  )}

                  {currentPage < paginationLength && (
                    <button
                      className="beforeAndNextButton"
                      onClick={() => paginate(currentPage + 1)}
                    >
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

function TableRow({ branch, handleRefreshClick }) {
  const [spinner, setSpinner] = useState("default");
  return (
    <tr
      className={`tableRow rowBackground ${
        spinner == "success" && "rowBackgroundSuccessFade"
      } ${spinner == "error" && "rowBackgroundErrorFade"}`}
      key={branch.oid}
    >
      <td style={{ width: "13rem" }}>{branch.name}</td>
      <td style={{ width: "13rem" }}>{branch.city}</td>
      <td style={{ width: "15rem" }}>
        <button
          className={`refreshButton ${
            spinner == "default" && "refreshTrigger"
          }`}
          onClick={() => handleRefreshClick(branch.apiId, setSpinner)}
        >
          <RefreshIcon />
        </button>
      </td>
    </tr>
  );
}
