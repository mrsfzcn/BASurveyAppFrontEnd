import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";
import Layout from "../../components/Layout";
import BreadCrumbs from "../../components/BreadCrumbs";
import SurveyService from "../../services/SurveyService";
import ClassService  from "../../services/ClassService";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import Input from "../../components/Input";

function AssignStudentClass(){
    const [studentName, setStudentName]= useState([]);
    const [studentSurname, setStudentSurname]= useState([]);
    const [error, setError] = useState("");
    const [studentOptions, setStudentOptions] = useState([]);
    const [classOptions, setClassOptions] = useState([]);
      const [selection, setSelection] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
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
    

    const header = { header: "Öğrenci Atama", href: "/createsurvey" };

  
    const subtitle = [
      {
        title: "Anasayfa",
        href: "/adminhome",
      },
      {
        title: "Sınıf İşlemleri",
        href: "/anketler",
      },
      {
        title: "Sınıfa Öğrenci Atama",
        href: "/createsurvey",
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
                <div className="flex flex-row gap-5 justify-between items-center p-7 mt-0">
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
                        {student.label}
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
                            options={classOptions}  // Bu satırı değiştirdik
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
                      disabled={!selection}
                    >
                      ATAMA YAP
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
                  </div>
    
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
}
export default AssignStudentClass;