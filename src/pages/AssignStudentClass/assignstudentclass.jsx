import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";
import Layout from "../../components/Layout";
import BreadCrumbs from "../../components/BreadCrumbs";
import SurveyService from "../../services/SurveyService";
import ClassService  from "../../services/ClassService";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { AxiosError } from "axios";


function AssignStudentClass(){
    const [studentName, setStudentName]= useState([]);
    const [studentSurname, setStudentSurname]= useState([]);
    const [error, setError] = useState("");
    const [studentOptions, setStudentOptions] = useState([]);
    const [classOptions, setClassOptions] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
      const [selection, setSelection] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [isCancelConfirmationOpen, setIsCancelConfirmationOpen] =
    useState(false);

    const navigate = useNavigate();   
    const [data, setData] = useState({
        studentName: "Öğrenci Adı",
        lastName: "Öğrenci Soyadı",
        colon: ":",
        classtosend: "Atanacağı Sınıf",
      });



    useEffect(() => {
        SurveyService.getAllTag()
          .then((tags) => {
            setClassOptions(
              tags.map((tag) => ({ label: tag.tagString, value: tag.oid }))
            );
            console.log(tags);
          })
          .catch((error) => {
            console.error("Sınıf verileri alınırken bir hata oluştu:", error);
          });
      }, []);
      

      useEffect(() => {
        ClassService.list()
        .then((students) =>{
            setStudentOptions(
                students.map((student) => ({label:student.firstName, value:student.oid, surname:student.lastName  }))
            );
            console.log(students);
        })
        .catch((error) =>{
            console.error("Öğrenci verileri alınırken bir hata oluştu:", error);
        });
      }, []);

      const onChange = (option) => {
        setSelection(option);
        setData({
          ...data,
          studentNameis: option.label,
          surnameis: option.surname,
        });
      };

      const handleCancel = () => {
        setIsCancelConfirmationOpen(true);
      };
    const handleAssign = (e) => {
      e.preventDefault();
      if(!selection.label){
              setError("Lütfen bir öğrenci seçiniz!")
              return;
      }
      if(!selectedClass){
        setError("Lütfen bir sınıf seçiniz.");
        return;
      }

    const assignData ={
      studentTagOid: selectedClass.value,
      studentOid: selection.value,
    };
    ClassService.assign(assignData)
    .then((response) =>{
      setIsPopupOpen(true);
    })
    .catch((AxiosError) => {
      if (AxiosError.response.data.exceptionCode === 9036) {
        setError("Seçilen öğrencinin atanmış olduğu bir sınıf bulunmaktadır.");
      } 
    });
    }


    const closePopup = () => {
      setIsPopupOpen(false);
      navigate("/ogrencilistesi");
    };


  const header = {
    header: "Öğrenci Atama", href: "/assignstudentclass", describe:
      "Öğrenci atama sayfasına hoşgeldiniz buradan öğrencileri ilgili olduğu sınıflara atayabilirsiniz." };

  
    const subtitle = [
      {
        title: "Anasayfa",
        href: "/adminhome",
      },
      {
        title: "Sınıf İşlemleri",
        href: "/assignstudentclass",
      },
      {
        title: "Sınıfa Öğrenci Atama",
        href: "/assignstudentclass",
      },
    ];
    return(
        <Layout>
        <div className="flex flex-col bg-[#E5E5E5] h-full">
          <BreadCrumbs header={header} subtitle={subtitle} />
          <div className="flex h-full">
            <div className="flex-[8_8_0%] flex justify-center items-center">
              <div className="flex justify-center items-center bg-gray-300 w-11/12 h-5/6 rounded">
                <div className="flex bg-white flex-col gap-5 justify-center items-center w-9/12 h-5/6 rounded">
                <div className="flex flex-row gap-5 justify-between items-center p-7 mt-0 w-3/4">
                  <select
                    id="underline_select"
                    className="flex text-lg m-auto h-auto py-2.5 px-0 w-full text-sm text-black-500 bg-transparent border-0 border-b-2 border-black-200 appearance-none dark:text-black-400 dark:border-black-700 focus:outline-none focus:ring-0 focus:border-black-200 peer"
                    value={selection ? selection.label : ""}
                    onChange={(e) => {
                      const selectedStudent = studentOptions.find(
                        (student) => student.label === e.target.value
                      );
                      onChange(
                        selectedStudent
                          ? selectedStudent
                          : { label: e.target.value, surname: "" }
                      );
                    }}
                  >
                    <option value="">Öğrenci Seçiniz</option>
                    {studentOptions.map((student) => (
                      <option key={student.value} value={student.label}>
                        {student.label + " " + student.surname}
                      </option>
                    ))}
                  </select>
                  </div>
                  <div className="flex flex-col gap-5">
                    <div className="flex">
                      <p className="w-32 text-left font-semibold">
                        {data.studentName}
                      </p>
                      <p className="w-8 align-middle">{data.colon}</p>
                      <p className="w-128">{data.studentNameis}</p>
                    </div>
    
                    <div className="flex">
                      <p className="w-32 text-left font-semibold">{data.lastName}</p>
                      <p className="w-8 align-middle">{data.colon}</p>
                      <p className="w-128">{data.surnameis}</p>
                    </div>
    
                    <div className="flex items-center font-semibold">
                      <p className="w-32 text-left">{data.classtosend}</p>
                      <p className="w-8 align-middle">{data.colon}</p>
    
                      <Dropdown
                            className="w-128"
                            options={classOptions} 
                            onChange={setSelectedClass}
                            value={selectedClass}
                        />
                    </div>
                    {error && <p className="text-red-600 font-bold">{error}</p>}
                  </div>
    
                  <div className="flex gap-7 justify-center flex-wrap mt-20 mb-10">
                    <Button
                      className=""
                      primary
                      rounded
                      bold
                      onClick={handleAssign}
                      disabled={!selection}
                    >
                      ÖĞRENCİ EKLE
                    </Button>
                    <Button
                      className=""
                      secondary
                      rounded
                      bold
                      onClick={handleCancel}
                    >
                      VAZGEÇ
                    </Button>
                    {isCancelConfirmationOpen && (
                      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-75 bg-gray-800">
                        <div className="bg-white p-8 rounded shadow">
                          <p className="text-xl font-bold mb-4">
                            Emin misiniz?
                          </p>
                          <p>
                            Sınıfa öğrenci ekleme işleminden vazgeçmek istediğinize
                            emin misiniz?
                          </p>
                          <p>Tüm Anketler Sayfasına Yönlendirileceksiniz.</p>
                          <Button
                            primary
                            rounded
                            className="mt-4"
                            onClick={() => {
                              setIsCancelConfirmationOpen(false);
                              navigate("/ogrencilistesi");
                            }}
                          >
                            Onayla
                          </Button>
                          <Button
                            secondary
                            rounded
                            className="mt-4 mr-2"
                            onClick={() => setIsCancelConfirmationOpen(false)}
                          >
                            İptal
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
    
                </div>
              </div>
            </div>
          </div>
          {isPopupOpen && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-75 bg-gray-800">
            <div className="bg-white p-8 rounded shadow">
              <p className="text-xl font-bold mb-4">Başarı!</p>
              <p>{selection.label} öğrencisi {selectedClass.label} sınıfına başarı ile eklendi!</p>

              <Button primary rounded className="mt-4" onClick={closePopup}>
                Tamam
              </Button>
            </div>
          </div>
        )}
        </div>
      </Layout>
    );
}
export default AssignStudentClass;