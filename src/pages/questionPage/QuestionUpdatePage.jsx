import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import QuestionService from "../../services/QuestionService";
import Layout from "../../components/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function QuestionUpdatePage() {
    const location = useLocation();
    const rowData = location.state;
    let params = useParams();


    const [questionOid, setQuestionOid] = useState();
    const [questionString, setQuestionString] = useState();
    const [questionType, setQuestionType] = useState();

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
            //   setCourseTopic(response.data.courseTopic);
            })
            .catch((error) => {
              alert(params.id + "nolu soru bulunamamıştır");
            });
        }
      }, [params.id]);

    const navigateMain = (e) => {
        navigate("/questionlist");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(questionOid, questionString, questionType);
        // BACKEND TARAFINDA DÜZELENME YAPILMASI ŞART !!
      };


  return (
    <Layout>
      <div className="flex flex-col bg-white h-full">
        {/* <BreadCrumbs header={header} subtitle={subtitle} /> */}
        <form
          onSubmit={handleSubmit}
          className="class1 flex justify-center align-center"
        >
          <div className="class2 bg-[#F1F1F1] flex justify-center align-center m-auto ">
            <div className="class3 bg-[#FEFEFE] m-auto  flex flex-col justify-center gap-14 ">
              <div className="flex flex-col gap-14 justify-center items-center">
                <div className="flex items-center justify-between w-[600px] ">
                  <label className="font-semibold w-[150px] ">Question Id</label>
                  <Input disabled value={questionOid} full />
                </div>
                <div className="flex items-center   w-[600px] ">
                  <label className="font-semibold w-[150px]">Anket Adı</label>
                  <Input
                    onChange={(e) => setQuestionString(e.target.value)}
                    value={questionString}
                    full
                  />
                </div>
                <div className="flex items-center w-[600px]">
                  <label className="font-semibold  w-[150px]">
                  Question Type
                  </label>
                  <Input
                    onChange={(e) => setQuestionType(e.target.value)}
                    value={questionType}
                    full
                  />
                </div>
              </div>
              <div className="flex justify-center gap-7 flex-wrap">
                <Button primary rounded bold>
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
      </div>
    </Layout>
  )
}
