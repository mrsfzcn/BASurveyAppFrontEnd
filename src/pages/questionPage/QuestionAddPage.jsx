import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Layout from "../../components/Layout";

import AuthService from "../../services/AuthService";
import Alert from "../../components/Alert";
import BreadCrumbs from "../../components/BreadCrumbs";
import MultiDropdown from "../../components/MultiDropdown";
import { BsTextarea } from "react-icons/bs";
import CustomComboBox from "./CustomComboBox";
import CustomComboBoxPlus from "./CustomComboBoxPlus";
import QuestionPlusIcon from "./QuestionPlusIcon";
import QuestionTypeService from "../../services/QuestionTypeService";
import QuestionService from "../../services/QuestionService";
import MultipleChoice from "../../components/options/MultipleChoice";
import Likert from "../../components/options/Likert";
import Matrix from "../../components/options/Matrix";
import MultiOptionalMultiSelectable from "../../components/options/MultiOptionalMultiSelectable";
import MultiOptionalMultiSelectableAndOther from "../../components/options/MultiOptionalMultiSelectableAndOther";
import OpenEnded from "../../components/options/OpenEnded";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const QuestionAddPage = ({ props }) => {
  const [questionTypeOptions, setQuestionTypeOptions] = useState([]);
  const [questionTagsOptions, setQuestionTagsOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [customComboBoxData, setCustomComboBoxData] = useState([]);
  const [error, setError] = useState(false);
  const [isEmptyTagOids, setIsEmptyTagOids] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [createQuestion, setCreateQuestion] = useState({
    questionString: "",
    order: null,
    questionTypeOid: null,
    tagOids: [],
    options: [],
  });

  
  const successNotify = (string) => toast.success(string);
  const errorNotify = (string)=> toast.error(string);
  const warnNotify = (string)=> toast.warn(string);

  const [matrixQuestions, setMatrixQuestions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await QuestionTypeService.getAllType();
        const types = response.data;

        setQuestionTypeOptions(
          types.map((type) => ({
            label: type.questionType,
            value: type.questionTypeId,
          }))
        );
      } catch (error) {
        console.error("Tag verileri alınırken bir hata oluştu:", error);
      }
    };
    const fetchDataTags = async () => {
      try {
        const response = await QuestionService.getAllQuestionTags();
        const types = response.data;

        setQuestionTagsOptions(
          types.map((type) => ({
            label: type.tagString,
            value: type.tagStringId,
          }))
        );
      } catch (error) {
        console.error("Tag verileri alınırken bir hata oluştu:", error);
      }
    };
    fetchDataTags();
    fetchData();
  }, []);
  const handleCustomComboBoxData = (option) => {
    if (option === null) {
      setSelectedOption(null);
      setCreateQuestion({ ...createQuestion, questionTypeOid: null });
    } else {
      setSelectedOption(option.label); //burada sadece option yazıyordu ama içinde ki label bilgisine ulaşabilmek için bu şekilde düzenledim.
      setCreateQuestion({ ...createQuestion, questionTypeOid: option.value });
    }
  };
  const handleCustomComboBoxPlusData = (data) => {
    setCustomComboBoxData(data);
    const a = data.map((i) => i.value);
    setCreateQuestion({ ...createQuestion, tagOids: a });
  };

  function matrixSpecialKeywordError(){
    // setAlert({
    //   type: "error",
    //   message: "Soru '$$' içeremez! ",
    // });
    warnNotify("Soru '$$' içeremez! ")
    setTimeout(() => {
      setError(false);
      setAlert({ type: "", message: "" });
    }, 5000);
  }

  const handleCreate = (event) => {
    const newDataArray = [
      {
        questionString: selectedOption!="Matriks" ? createQuestion.questionString: matrixQuestions.join(" $$ "),
        order: createQuestion.order,
        questionTypeOid: createQuestion.questionTypeOid,
        tagOids: createQuestion.tagOids,
        options: upData,
      },
    ];
    
    if(selectedOption != "Açık Uçlu"){
      if (upData.length === 0) {  //Matriks upData içini doldurmadığı için zaten çalışmıyordu ama burda da hataya giriyor...
        // setAlert({
        //   type: "error",
        //   message: "Sorularda en az bir şık seçeneği olmalıdır",
        // });
        warnNotify("Sorularda en az bir şık seçeneği olmalıdır")
        event.preventDefault(); // Form gönderimin engellemek için 
        setTimeout(() => {
          setError(false);
          setAlert({ type: "", message: "" });
        }, 5000);
        return;
      }
    }
    
    if (selectedOption==="Likert" && upData[2] === "") { //Likert.jsx dosyasında buraya gelen veride array sıralamasında buttonLeftValue 3.sırada
      // setAlert({
      //   type: "error",
      //   message: "Sol Etiket boş olamaz",
      // });
      warnNotify("Sol Etiket boş olamaz")
      event.preventDefault(); // Form gönderimin engellemek için 
      setTimeout(() => {
        setError(false);
        setAlert({ type: "", message: "" });
      }, 5000);
      return;

    }
    
    if (selectedOption==="Likert" && upData[3] === "") {
      // setAlert({
      //   type: "error",
      //   message: "Sağ Etiket boş olamaz",
      // });
      warnNotify("Sağ Etiket boş olamaz")
      event.preventDefault();
      setTimeout(() => {
        setError(false);
        setAlert({ type: "", message: "" });
      }, 5000); 
      return;
    }
      if (
      newDataArray[0].questionString.length > 1 &&
      createQuestion.questionTypeOid !== null
    ) {
            if (createQuestion.tagOids.length === 0 && !isEmptyTagOids) {
        setShowConfirmPopup(true);
      } else {
        event.preventDefault();
        QuestionService.createQuestions(newDataArray)
          .then((response) => {
            //setAlert({ type: "success", message: "Soru başarıyla eklendi." });
            successNotify("Soru başarıyla eklendi.")
            setCreateQuestion({ ...createQuestion, questionString: "" });
            if(selectedOption!="Matriks")
            document.getElementById("myTextarea").value = "";
            setTimeout(() => {
              window.location.reload(); //ekle butona tıklayınca etiket ve tip temizlensin diye eklendi.
            }, 1000);
            setIsEmptyTagOids(false);
            setTimeout(() => {
              setAlert({ type: "", message: "" });
            }, 5000);
            console.log(response.data);
          })
          .catch((error) => {
            console.error("Hata:", error);
            console.log(newDataArray);
            if (error.response.data.exceptionCode === 9007) {
              // setAlert({
              //   type: "error",
              //   message: error.response.data.customMessage,
              // });
              errorNotify(error.response.data.customMessage)
              setTimeout(() => {
                setAlert({ type: "", message: "" });
              }, 5000);
            } else {
              // setAlert({
              //   type: "error",
              //   message:
              //     "Beklenmeyen bir hata meydana geldi. Lütfen daha sonra tekrar deneyiniz.",
              // });
              errorNotify("Beklenmeyen bir hata meydana geldi. Lütfen daha sonra tekrar deneyiniz.")
              setTimeout(() => {
                setAlert({ type: "", message: "" });
              }, 5000);
            }
          });
      }
    } else {
      setIsEmptyTagOids(false);
      if (selectedOption!="Matriks" && createQuestion.questionString.length <= 1) {
        setError(true);
        // setAlert({
        //   type: "error",
        //   message: "Soru alanı boş olamaz",
        // });
        warnNotify("Soru alanı boş olamaz")
        setTimeout(() => {
          setError(false);
          setAlert({ type: "", message: "" });
        }, 5000);
      }
      if (
        createQuestion.questionTypeOid === null &&
        createQuestion.questionString.length > 1
      ) {
        // setAlert({
        //   type: "error",
        //   message:
        //     "Soru tipi seçimi yapınız. Aradığınız soru tipinin üzerine tıklayarak seçmelisiniz",
        // });
        warnNotify("Soru tipi seçimi yapınız. Aradığınız soru tipinin üzerine tıklayarak seçmelisiniz")
        setTimeout(() => {
          setError(false);
          setAlert({ type: "", message: "" });
        }, 5000);
      }
    }
  };
  const handleChange = (e) => {
    const text = e.target.value;
    if (text.length <= 450) {
      setAlert({ type: "", message: "" });
      if (e.target.value.length >= 1) {
        const updatedQuestion = { ...createQuestion, questionString: text };
        setCreateQuestion(updatedQuestion);
        setError(false);
      } else {
        setError(true);
        // setAlert({
        //   type: "error",
        //   message: "Soru alanı boş olamaz",
        // });
        warnNotify("Soru alanı boş olamaz")
        setTimeout(() => {
          setError(false);
          setAlert({ type: "", message: "" });
        }, 5000);
      }
    } else {
      setError(true);
      // setAlert({
      //   type: "error",
      //   message: "Soru en fazla 450 karakter olmalıdır.",
      // });
      warnNotify("Soru en fazla 450 karakter olmalıdır.")
    }
  };

  const [upData, setUpData] = useState([]); //seçeneklere kaydedilen veriyi tutmak için 
  const renderComponent = () => {     //Sistemde kullanılacak tüm soru tipleri aşağıdakilerdir.
    //console.log(selectedOption);
    if (selectedOption === "Çoktan Seçmeli") {
      return (
        <MultipleChoice questionString={createQuestion.questionString}
          veriTasi={(veri) => {
            setUpData(veri);
          }}
        />
      );
    } else if (selectedOption === "Likert") {
      return (
        <Likert questionString={createQuestion.questionString}
          veriTasi={(veri) => {
            setUpData(veri);
          }}
        />
      );
    }else if(selectedOption === "Çok Seçenekli Çok Seçilebilir"){
      return (
        <MultiOptionalMultiSelectable questionString={createQuestion.questionString}
          veriTasi={(veri) => {
            setUpData(veri);
          }}
        />
      );
    }else if(selectedOption === "Çok Seçenekli Çok Seçilebilir ve Seçenek Girilebilir"){
      return (
        <MultiOptionalMultiSelectableAndOther questionString={createQuestion.questionString}
          veriTasi={(veri) => {
            setUpData(veri);
          }}
        />
      );
    }else if(selectedOption === "Matriks"){
      return (
        <Matrix questionString={createQuestion.questionString}
          veriTasi={(veri) => {
            setUpData(veri); 
          }} 
          setMatrixQuestions={setMatrixQuestions}
          matrixSpecialKeywordError ={matrixSpecialKeywordError}
        />
      );
    }else if(selectedOption === "Açık Uçlu"){
      return (
        <OpenEnded questionString={createQuestion.questionString}
        />
      );
    }
     else {
      return null; 
    }
  };

  const handleRedirect = () => {
    window.location.href = "/soru-listesi";
  };

  const header = {
    header: "Soru Ekle", href: "/soru-listesi/ekle", describe:
      "Soru ekleme sayfasına hoşgeldiniz buradan soru ekleme işlemi yapabilirsiniz."
};

  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const subtitle = [
    {
      title: "Anasayfa",
      href: "/yonetici-sayfasi",
    },
    {
      title: "Soru İşlemleri",
      href: "/soru-listesi",
    },
    {
      title: "Soru Ekle",
      href: "/soru-listesi/ekle",
    },
  ];
  const borderColor = error ? "#ff3333" : isFocused ? "#00a4e4" : "#ccc";
  return (
    <Layout>
      {showConfirmPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-50">
          <div className="bg-[#F1F1F1] p-6 rounded-lg text-center shadow-md">
            <p className="font-normal">
              !!! Soru etiketi eklemediniz. Etiketsiz kaydetmek istediğinize
              emin misiniz?
              <br />
              Eğer "Evet" diyip "Ekle" butonuna basarsanız etiket eklememiş
              olacaksınız. <br />
              Etiket eklemek için "Hayır" diyip seçim yapın sonra artı ikonuna
              tıklayın. <br />
              "Ekle" butonu ile kaydedin
            </p>
            <div className="mt-4">
              <Button
                type="submit"
                primary
                className="mr-2"
                rounded
                bold
                onClick={() => {
                  setIsEmptyTagOids(true);
                  setShowConfirmPopup(false);
                }}
              >
                Evet
              </Button>
              <Button
                type="submit"
                secondary
                rounded
                bold
                onClick={() => setShowConfirmPopup(false)}
              >
                Hayır
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col bg-[#E5E5E5] h-full">
        <BreadCrumbs header={header} subtitle={subtitle} />
        <div className="flex flex-col items-center h-90">
          <div className="flex justify-center items-center bg-[#F1F1F1]  w-[66%] h-[79.8vh] rounded-lg absolute flex-col  p-8 mobile:w-[95%]">
          {selectedOption!="Matriks" ? <>  <div className="flex justify-center left-[4vh] top-8  font-Poppins text-base leading-6 text-left absolute">
              <p>Soru metninizi giriniz:</p>
            </div>
            <div className="flex justify-center  m-auto absolute h-[20%] w-11/12 top-16">
              <textarea
                name="text"
                rows="12"
                cols="50"
                id="myTextarea"
                className="w-[99%] p-4 text-base leading-[1.5rem] font-poppins text-left break-words"
                style={{
                  border: `1px solid ${borderColor}`,
                  boxSizing: "border-box",
                  resize: "none",
                  overflow: "auto",
                  outline: "none",
                  transition: "border-color 0.2s ease-in-out",
                }}
                placeholder={selectedOption=="Matriks" ? "Lütfen Matriks soru satırını alt kısımdan ekleyin.": "Metni Giriniz..."}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
                onChange={handleChange}
                disabled={selectedOption=="Matriks" && true}
              />
            </div></>: <h2 className="flex justify-center top-8 text-2xl font-Poppins font-medium absolute">Lütfen Matriks soru satırını alt kısımdan ekleyin.</h2>}
            <div className="flex flex-row justify-start mb-[12vh] items-center space-x-[12.8rem] ">
              <div className="flex ml-10">
                <div className="flex items-center space-x-1">
                  <p className="text-base font-medium mobile:w-24">Soru</p>
                  <p className="text-base font-medium mobile:w-24">Tipi</p>
                </div>

                <div className="flex items-center">
                  <span className="mr-3">:</span>
                  <div className="w-[20vw] left-5.8vw mobile:w-50">
                  <div><CustomComboBox
                      options={questionTypeOptions}
                      placeholder="Seçiniz"
                      onGetCustomData={handleCustomComboBoxData}
                    />
                  </div>
                  </div>
                  <div className="flex flex-row items-center  absolute top-[35vh] ">
                    {renderComponent()}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center space-x-1">
                <p className="text-base font-medium mobile:w-24 ">Soru</p>
                <p className="text-base font-medium mobile:w-24 ">Etiketi</p>
                </div>
                <div className="flex items-center">
                  <span className="mr-3">:</span>
                  <div className="w-[20vw] mobile:w-[40vw]">
                    <div className="mobile:w-[51vw]">
                      <CustomComboBoxPlus
                        options={questionTagsOptions}
                        placeholder="Giriniz"
                        onGetCustomPlusData={handleCustomComboBoxPlusData}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="w-[6.25vw] h-[6.25vh] bottom-[2vh] rounded-[0.2604166] bg-[#E5E5E5] text-black border-none font-Poppins text-base font-bold cursor-pointer absolute mobile:left-[70vw] mobile:top-[68vh] mobile:w-[19.25vw]"
              onClick={handleCreate}
            >
              Ekle
            </button>
          </div>
          <div className="  left-9vw z-50">
            {alert.type && (
              <Alert
                type={alert.type}
                message={alert.message}
                closable={true}
              />
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default QuestionAddPage;
