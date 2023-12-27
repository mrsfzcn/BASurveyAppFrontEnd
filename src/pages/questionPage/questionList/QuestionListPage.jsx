import  { useEffect, useState } from 'react';
import "./questionListPage.css";
import { useNavigate } from "react-router-dom";
import Layout from '../../../components/Layout'
import QuestionService from '../../../services/QuestionService';
import BreadCrumbs from '../../../components/BreadCrumbs'
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import EditIcon from '../../user/AllUsers/svg/edit-svg';
import DeleteIcon from '../../user/AllUsers/svg/delete-svg';

function QuestionListPage() {

  const successNotify = (string) => toast.success(string);
  const errorNotify = (string)=> toast.error(string);
  const warnNotify = (string)=> toast.warn(string);

  const [surveys, setSurveys] = useState([ //bunun adı neden surveys ? question ile çalışmıyor muyuz?
    {
      no: "",
      soru: "",
      tipi: "",
      etiketler: "",
      secenekler: "",
    }
  ]);

  const header = [
    {
      name: 'No',
      selector: row => row.questionOid,
      sortable: true,
    }, 
    {
      name: 'Soru',
      selector: row => {
        if(row.questionType == "Matriks")
        return row.questionString.split(" $$ ").join(", ")
        return row.questionString
      },
      sortable: true,
    }, 
    {
      name: "Soru Tipi",
      selector: row =>  row.questionType,
      sortable: true,
    }, 
    {
      name: "Etiketler",
      selector: row => {
        console.log(row.questionTags);
        return row.questionTags},
      sortable: true,
    },
    {
      name: "Seçenekler",
      selector: row => {
        if(Array.isArray(row.questionOptions)){
          return row.questionOptions.join(", ")
        }
        return row.questionOptions
      },
      sortable: true,
    },
    {
      name: "İşlemler",
      selector: row => {
        return <>
        <div className='flex gap-2'>
        <button onClick={()=> deleteQuestion(row.questionOid)}>
          <DeleteIcon className='delete-btn'/>
        </button>
        <button onClick={()=> handleEditClick(row)}>
          {console.log(row)}
          <EditIcon className='edit-btn'/>
        </button>
        </div>
        </>
        
      },
      sortable: false,
    }
  ];

  const deleteQuestion = async(questionOid) => {
    let response;
    try{
      response = await QuestionService.delete(questionOid);
      successNotify(questionOid + " No'lu soru başarıyla silindi");
    } catch(error){
      errorNotify(error.response.data.exceptionMessage);
    }
    if(response.data){
      setSurveys(
        surveys.filter(survey => survey.questionOid != questionOid)
        )
    }
  }

  console.log(surveys);

  // To delete selected question
  const deleteTableRows = async (index, rowData) => {
    let response;
    try {
      response = await QuestionService.delete(rowData.questionOid);
    } catch (error) {
      errorNotify(error.response.data.exceptionMessage);
    }

    if (response.data) {
      successNotify(rowData.questionOid + " No'lu soru başarıyla silindi");
    console.log(response);
    const rows = [...surveys];
    rows.splice(index, 1);
    setSurveys(rows);
    } else {
      errorNotify("bir hata meydana geldi");
    }
  };

  const navigate = useNavigate();

  const handleEditClick = (rowData) => {
    console.log(rowData);
    navigate(`/soru-listesi/guncelle/${rowData.questionOid}`, { state: rowData });
  };

  // To get all list 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await QuestionService.list()
        console.log(response.data);
        setSurveys(response.data);
        } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  console.log(QuestionService.list());

  const header2 = {
    header: "Soru Listesi", to: "/soru-listesi", describe:
      "Soru listesi sayfasına hoşgeldiniz buradan soruları görüntüleyebilirsiniz." };
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
    return (
    <Layout>

        <div className='flex flex-col  gap-10 bg-slate-100 h-full'>
          <BreadCrumbs header={header2} subtitle={subtitle} />
          <DataTable  
            data={surveys} 
            columns={header} 
          />
        </div>
        
        </Layout>
  )
}

export default QuestionListPage