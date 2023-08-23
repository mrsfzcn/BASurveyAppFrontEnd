import Layout from "../../../components/Layout";
import BreadCrumbs from "../../../components/BreadCrumbs";
import Table from "../../../components/Table/Table";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Alert from "../../../components/Alert";
import QuestionTypeService from "../../../services/QuestionTypeService";

function QuestionType() {
  const navigate = useNavigate();
  //Breadcrumb
  const header = { header: "Soru Tipi", href: "/questiontypelist" };
  const subtitle = [
    {
      title: "Anasayfa",
      href: "/adminhome",
    },
    {
      title: "Soru Tipi İşlemleri",
      href: "/questiontypelist",
    },
  ];

  const [type, setType] = useState({
    questionType: ""
  });

  const [types, setTypes] = useState([]);
  const [updateType, setUpdateType] = useState(false);

  const [alert, setAlert] = useState({ type: "", message: "" });
  const header2 = ["Soru Tipi ID", "Soru tipi Adı"];


  const handleSubmit = (e) => {
    e.preventDefault();

    if (type.questionType.length < 1) {
      setAlert({ type: "error", message: "Soru tipi adı boş bırakılamaz." });
      return;
    }

    QuestionTypeService.createType(type)
    .then((response) => {
      if (response.data === false) {
        setAlert({ type: "error", message: "Bu soru tipi daha önce eklenmiş. Lütfen farklı bir soru tipi giriniz." });
      } else {
        setAlert({ type: "success", message: "Soru Tipi başarıyla güncellendi." });
        setUpdateType(true);
        e.target.reset();
      }
    })
    .catch((error) => {
      setAlert({ type: "error", message: "Bir hata meydana geldi." });
    });
  };

  useEffect(() => {
    setUpdateType(false);
    const fetchTags = async () => {
      try {
        const response = await QuestionTypeService.getAllType();
        if (response.status === 200) {
            setTypes(response.data)
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTags();
    return () => {
      console.log("useEffect clean up");
    };
  }, [updateType]);

  const handleEditClick = (rowData) => {
    console.log(rowData);
    navigate(`/questiontypelist/guncelle/` + rowData.questionType, { state: rowData });
  };

  const deleteTableRows = async (index, rowData) => {
    console.log(rowData);
    
    // Kullanıcıya silmeyi onaylamak için bir pencere gösteriyoruz
    const userConfirmed = window.confirm(
      rowData.questionTypeId + ". id'ye sahip soru tipini silmek istediğinize emin misiniz?"
    );
  
    // Kullanıcı onaylamışsa, veriyi silme işlemini gerçekleştiriyoruz
    if (userConfirmed) {
      try {
        const response = await QuestionTypeService.delete(rowData.questionTypeId);
        console.log(response);
        if (response.status === 200) {
          setAlert({ type: "success", message: rowData.questionTypeId + ". id'ye sahip soru tipi başarıyla silindi" });
          const updatedTypes = [...types];
          updatedTypes.splice(index, 1);
          setTypes(updatedTypes);
          setUpdateType(true);
        } else {
          setAlert({ type: "error", message: "Bir hata meydana geldi." });
        }
      } catch (error) {
        console.log(error);
        setAlert({ type: "error", message: "Bir hata meydana geldi." });
      }
    }
  };
  
  

  return (
    <Layout>
      <div className="flex flex-col  bg-slate-100 h-full ">
        <BreadCrumbs header={header} subtitle={subtitle} />
        <div className="flex flex-col items-center justify-center gap-2 mt-4">
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center gap-8 w-3/4"
          >
            <div className="flex flex-col gap-4 w-1/2 ">
              <Input
                placeholder="Soru Tipi Adı"
                full
                required
                onChange={(e) => setType({ ...type, questionType: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Button type="submit" primary rounded bold>
                Soru Tipi Ekle
              </Button>
            </div>
          </form>
          <div className="w-1/2 flex justify-center">
            {alert.type && <Alert type={alert.type} message={alert.message} />}
          </div>
          <Table
            data={types}
            header={header2}
            useIcon={true}
            editTableRows={handleEditClick}
            deleteTableRows={deleteTableRows}
          />
        </div>
      </div>
    </Layout>
  );
}

export default QuestionType;
