import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import QuestionService from "../../services/QuestionService";
import QuestionTypeService from "../../services/QuestionTypeService";
import Layout from "../../components/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import LabelIcon from './LabelIcon';
import CrossIcon from './CrossIcon';
import BreadCrumbs from "../../components/BreadCrumbs";
import CustomComboBox from "./CustomComboBox";
import QuestionUpdateComboBoxPlus from './QuestionUpdateComboBoxPlus';
import Alert from "../../components/Alert";

export default function QuestionUpdatePage() {
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [error, setError] = useState(false);
  const location = useLocation();
  const rowData = location.state;
  let params = useParams();

  // YENI EKLEDIKLERİN BURADA *************
  const [questionTypeOptions, setQuestionTypeOptions] = useState([]);
  const [questionTagsOptions, setQuestionTagsOptions] = useState([]);

  const [selectedOption, setSelectedOption] = useState(null);
  const [customComboBoxData, setCustomComboBoxData] = useState([]);

  const [updateQuestion, setUpdateQuestion] = useState({
    questionOid: params.id,
    questionString: "",
    questionTypeOid: null,
    tagOids: [],
  });

  const [questionOid, setQuestionOid] = useState();
  const [questionString, setQuestionString] = useState();
  const [questionType, setQuestionType] = useState();
  const [questionTagIds, setQuestionTagIds] = useState();
  const navigate = useNavigate();

  if (!rowData === null) {
    setQuestionOid(rowData.questionOid);
    setQuestionString(rowData.questionString);
    setQuestionType(rowData.questionType);
  }

  useEffect(() => {
    if (params.id) {
      QuestionService.questionGetById(params.id)
        .then((response) => {
          console.log(response.data);
          setQuestionOid(params.id);
          setQuestionString(response.data.questionString);
          setQuestionType(response.data.questionType);
          setUpdateQuestion({ ...updateQuestion, questionOid: params.id, questionString: response.data.questionString });
        })
        .catch((error) => {
          alert(params.id + "nolu soru bulunamamıştır");
        });
    }
  }, [params.id]);

  useEffect(() => {
    const fetchData = async () => {// Databasedeki tüm QuestionTypes geliyor.
      try {
        const response = await QuestionTypeService.getAllType();
        const types = response.data;

        setQuestionTypeOptions(types.map((type) => ({ label: type.questionType, value: type.questionTypeId })));

      } catch (error) {
        console.error("Tag verileri alınırken bir hata oluştu:", error);
      }
    };
    const fetchDataTags = async () => { // Databasedeki tüm QuestionTags geliyor.
      try {
        const response = await QuestionService.getAllQuestionTags();
        const types = response.data;

        setQuestionTagsOptions(types.map((type) => ({ label: type.tagString, value: type.tagStringId })));
        console.log(types);
      } catch (error) {
        console.error("Tag verileri alınırken bir hata oluştu:", error);
      }

    };
    fetchDataTags();
    fetchData();
  }, [])

  const handleChange = (e) => {
    setQuestionString(e.target.value)
    const text = e.target.value;
    if (text.length <= 450) {
      setAlert({ type: "", message: "" });
      if (e.target.value.length >= 1) {
        const updatedQuestion = { ...updateQuestion, questionString: text };
        setUpdateQuestion(updatedQuestion);
        setError(false);

      } else {
        setError(true);
        setAlert({
          type: "error",
          message:
            "Soru alanı boş olamaz",
        });
        setTimeout(() => {
          setError(false);
          setAlert({ type: "", message: "" });
        }, 5000);
      }
    }
    else {
      setError(true);
      setAlert({
        type: "error",
        message: "Soru en fazla 450 karakter olmalıdır.",
      });
    }
  }

  // DEPRECATED
  //   const handleCustomComboBoxData = (option) => {
  //     if (option === null) {
  //       setSelectedOption(null);
  //       setUpdateQuestion({ ...updateQuestion, questionTypeOid: null });
  //   } else {
  //       setSelectedOption(option);
  //       setUpdateQuestion({ ...updateQuestion, questionTypeOid: option.value })
  //   }
  // };

  const handleUpdateQuestion = (event) => {
    event.preventDefault();
    console.log(updateQuestion);
    const questionTypeIdFixer = questionTypeOptions.find(type => type.label == questionType)    
    const confirmedUpdatedQuestion = { ...updateQuestion, questionTypeOid: questionTypeIdFixer.value, questionString:questionString,tagOids: questionTagIds }
    QuestionService.updateQuestion(confirmedUpdatedQuestion)
      .then((response) => {
        setAlert({ type: "success", message: "Soru başarıyla guncellendi." });
        setTimeout(() => {
          setAlert({ type: "", message: "" });
        }, 5000);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Hata:", error);
        if (error.response.data.exceptionCode === 9007) {
          setAlert({
            type: "error",
            message:
              error.response.data.customMessage,
          });
          setTimeout(() => {
            setAlert({ type: "", message: "" });
          }, 5000);
        } else {
          setAlert({
            type: "error",
            message:
              "Beklenmeyen bir hata meydana geldi. Lütfen daha sonra tekrar deneyiniz.",
          });
          setTimeout(() => {
            setAlert({ type: "", message: "" });
          }, 5000);
        }
      });
  }

  const handleCustomComboBoxPlusData = (data) => {
    console.log(data);
    const a = data.map((i) =>
      i.value
    );
    setQuestionTagIds(a);
    setUpdateQuestion({ ...updateQuestion, tagOids: a })
  };


  const navigateMain = (e) => {
    navigate("/questionlist");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // BACKEND TARAFINDA DÜZELENME YAPILMASI ŞART !!
  };

  const header2 = { header: "Soru Listesi", href: "/questionlist" };
  const subtitle = [
    {
      title: "Anasayfa",
      href: "/adminhome",
    },
    {
      title: "Soru İşlemleri",
      href: "/questionlist",
    },
    {
      title: "Soru Listesi",
      href: "/questionlist/guncelle/",
    },
  ];


  return (
    <Layout>
      <div className="flex flex-col bg-white h-full">
        <BreadCrumbs header={header2} subtitle={subtitle} />
        <form
          onSubmit={handleSubmit}
          className="class1 flex justify-center align-center"
        >
          <div className="class2 bg-[#F1F1F1] flex justify-center align-center m-auto ">
            <div className="class3 bg-[#FEFEFE] m-auto  flex flex-col gap-14 ">
              <div className="flex flex-col gap-14 justify-center items-center mt-7">
                <div className="flex items-center justify-between w-[600px] ">
                  <label className="font-semibold w-[150px] sm:w-[120px] md:w-[150px] lg:w-[180px] xl:w-[200px]">Soru Id</label>
                  <Input disabled value={questionOid} full />
                </div>
                <div className="flex items-center   w-[600px] ">
                  <label className="font-semibold w-[150px]">Soru Metni</label>
                  <Input
                    onChange={handleChange}
                    value={questionString}
                    full
                    className="w-full md:w-[80%] lg:w-[70%] xl:w-[60%] p-2 border rounded"
                  />
                </div>
                <div className="flex items-center w-[600px]">
                  <label className="font-semibold  w-[150px]">
                    Soru Tipi
                  </label>

                  <div className="flex items-center" style={{ paddingLeft: '5vw', position: 'relative', height: '100%', left: '12vw' }}>
                    <div style={{
                      top: '0.1vh',
                      width: '20vw',
                      right: '17.0vw',
                      position: 'relative',
                    }}>
                      <Input
                        value={questionType}
                        disabled={true}
                        full
                        className="w-full md:w-[80%] lg:w-[70%] xl:w-[60%] p-2 border rounded"
                      />
                      {/* <CustomComboBox options={questionTypeOptions} placeholder= "Seçiniz" onGetCustomData={handleCustomComboBoxData} className="w-full md:w-[80%] lg:w-[70%] xl:w-[60%]"/>  input ile değişti -Doruk Tokinan*/}
                    </div>
                  </div>
                </div>
                <div className="flex items-center w-[600px]">
                  <label className="font-semibold  w-[150px]">
                    Soru Etiketi
                  </label>

                  <div className="flex items-center" style={{ paddingLeft: '5vw', position: 'relative', height: '100%', left: '12.1vw' }}>

                    <div style={{
                      top: '0.1vh',
                      width: '20vw',
                      right: '17.0vw',
                      position: 'relative',
                    }}>
                      < QuestionUpdateComboBoxPlus options={questionTagsOptions} placeholder="Giriniz" onGetCustomPlusData={handleCustomComboBoxPlusData} className="w-full md:w-[80%] lg:w-[70%] xl:w-[60%]" />
                    </div>

                  </div>
                </div>

              </div>
              <div className="flex justify-center gap-7 flex-wrap mt-24 sm:mt-6 md:mt-8">
                <Button primary rounded bold
                  onClick={handleUpdateQuestion}
                  className="">
                  Gönder
                </Button>
                <Button
                  onClick={navigateMain}
                  className=""
                  secondary
                  rounded
                  bold
                >
                  VAZGEÇ
                </Button>
              </div>
            </div>
          </div>
        </form>
        <div style={{
          position: 'absolute',
          top: '92vh',
          right: '1vw',
          zindex: 9999,
        }}>
          {alert.type && (
            <Alert type={alert.type} message={alert.message} closable={true} />
          )}
        </div>
      </div>
    </Layout>
  )
}
