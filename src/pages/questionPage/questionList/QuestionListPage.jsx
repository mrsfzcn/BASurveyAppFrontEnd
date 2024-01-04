import { useEffect, useState } from "react";
import "./questionListPage.css";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout";
import QuestionService from "../../../services/QuestionService";
import BreadCrumbs from "../../../components/BreadCrumbs";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../../components/Input";

import EditIcon from "../../user/AllUsers/svg/edit-svg";
import DeleteIcon from "../../user/AllUsers/svg/delete-svg";

function QuestionListPage() {
  const successNotify = (string) => toast.success(string);
  const errorNotify = (string) => toast.error(string);
  const warnNotify = (string) => toast.warn(string);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [questionList, setQuestionList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [listedItems, setListedItems] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const [surveys, setSurveys] = useState([
    {
      no: "",
      soru: "",
      tipi: "",
      etiketler: "",
      secenekler: "",
    },
  ]);

  const header = [
    {
      name: "No",
      selector: (row) => row.questionOid,
      sortable: true,
    },
    {
      name: "Soru",
      selector: (row) => {
        if (row.questionType == "Matriks")
          return row.questionString.split(" $$ ").join(", ");
        return row.questionString;
      },
      sortable: true,
    },
    {
      name: "Soru Tipi",
      selector: (row) => row.questionType,
      sortable: true,
    },
    {
      name: "Etiketler",
      selector: (row) => {
        return row.questionTags;
      },
      sortable: true,
    },
    {
      name: "Seçenekler",
      selector: (row) => {
        if (Array.isArray(row.questionOptions)) {
          return row.questionOptions.join(", ");
        }
        return row.questionOptions;
      },
      sortable: true,
    },
    {
      name: "İşlemler",
      selector: (row) => {
        return (
          <>
            <div className="flex gap-2">
              <button onClick={() => deleteQuestion(row.questionOid)}>
                <DeleteIcon className="delete-btn" />
              </button>
              <button onClick={() => handleEditClick(row)}>
                <EditIcon className="edit-btn" />
              </button>
            </div>
          </>
        );
      },
      sortable: false,
    },
  ];

  const deleteQuestion = async (questionOid) => {
    let response;
    try {
      response = await QuestionService.delete(questionOid);
      successNotify(questionOid + " No'lu soru başarıyla silindi");
    } catch (error) {
      errorNotify(error.response.data.exceptionMessage);
    }
    if (response.data) {
      setSurveys(surveys.filter((survey) => survey.questionOid != questionOid));
    }
  };

  const navigate = useNavigate();

  const handleEditClick = (rowData) => {
    navigate(`/soru-listesi/guncelle/${rowData.questionOid}`, {
      state: rowData,
    });
  };

  // To get all list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await QuestionService.list();
        setSurveys(response.data);
      } catch (error) {
        console.error(error);
        errorNotify(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    QuestionService.list()
      .then((response) => {
        setQuestionList(response.data);
        setFilteredList(response.data);
        setListedItems(response.data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
      })
      .catch((error) => {
        setQuestionList([]);
        setFilteredList([]);
        errorNotify("Bağlantı isteği reddedildi. Lütfen sunucu sahibiyle iletişime geçiniz."+ error);
      });
  }, []);

  const handleChangePage = (page) => {
    setCurrentPage(page);
    setListedItems(filteredList.slice((page - 1) * itemsPerPage, page * itemsPerPage));
  };
  const handleChangeRowsPerPage = (newPerPage, page) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(page);
    setListedItems(filteredList.slice((page - 1) * newPerPage, page * newPerPage));
  };
  const handleSearch = (e) => {
    setFilteredList(questionList.filter((item)=>
    item.questionString.toLowerCase().trim().includes(e.target.value.toLowerCase().trim())
  ));
    setListedItems(questionList.filter((item)=>
    item.questionString.toLowerCase().trim().includes(e.target.value.toLowerCase().trim())
  ).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
  };

  const mainHeader = {
    header: "Soru Listesi",
    to: "/soru-listesi",
    describe:
      "Soru listesi sayfasına hoşgeldiniz buradan soruları görüntüleyebilirsiniz.",
  };
  const subtitle = [
    {
      title: "Anasayfa",
      to: "/yonetici-sayfasi",
    },
    {
      title: "Soru İşlemleri",
      to: "/soru-listesi",
    },
    {
      title: "Soru Listesi",
      to: "/soru-listesi",
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
      <div className="background">
        <div className="allUsersHeaderDiv ">
          <div style={{ marginLeft: "70px" }}>
            <BreadCrumbs header={mainHeader} subtitle={subtitle} />
          </div>
        </div>
        <div>
          <div className="list px-8">
            <div className="flexColumnContainer flex items-center justify-end">
              <div className="listAra pb-4 ">
                <span>Ara: </span>
                <Input className="araButton" onChange={handleSearch} />
              </div>
            </div>
            <div className="flex flex-col  gap-10 bg-slate-100 h-full">
              <DataTable
                data={listedItems}
                columns={header}
                pagination
                paginationServer
                paginationTotalRows={filteredList.length}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                paginationRowsPerPageOptions={[2, 5, 10]}
                paginationComponentOptions={paginationComponentOptions}
              />
            </div>
            <div className="footer mobile:m-0">
                <div>
                  <p style={{ marginBottom: "2rem" }}>
                    {filteredList.length} sorudan {listedItems.length} tanesi
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

export default QuestionListPage;
