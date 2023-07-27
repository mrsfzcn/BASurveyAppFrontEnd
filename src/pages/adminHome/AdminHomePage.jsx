// AdminHome.js
import React, { useState } from "react";
import Layout from "../../components/Layout";
import Dropdown from "../../components/Dropdown";
import "../adminHome/adminhomepage.css";
import ReportingSvg from "./reportingSvg";
import ClassroomSvg from "./classroomSvg";
import SurveySvg from "./surveySvg";
import UserGroupSvg from "./userGroupSvg";
import QuestionSvg from "./questionSvg";
import MultiDropdown from "../../components/MultiDropdown";
import { Navigate,useNavigate } from "react-router-dom";

function AdminHome() {
  const [name, setName] = useState("");
  const [selection, setSelection] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleUserClick = (event) => {
    const target = event.target;
    navigate("/kullanici");
    
  };

  const handleSurveyClick = (event) => {
    const target = event.target;
    navigate("/anketler");
  };
  const handleReportingClick = (event) => {
    const target = event.target;

    console.log("Reporting area clicked!");
  };
  const handleQuestionClick = (event) => {
    const target = event.target;
    navigate("/questionlist");
    
  };
  const handleClassroomClick = (event) => {
    const target = event.target;

    console.log("Classroom area clicked!");
  };

  const options = [
    { label: "Red", value: "red" },
    { label: "Green", value: "green" },
    { label: "Blue", value: "blue" },
  ];

  const onChange = (option) => {
    setSelection(option);
  };

  const handleSelectedOptionsChange = (updatedOptions) => {
    setSelectedOptions(updatedOptions);
  };

  return (
    <Layout>
      <div className="question-container" onClick={handleQuestionClick}>
        <QuestionSvg />
      </div>
      <div className="classroom-container" onClick={handleClassroomClick}>
        <ClassroomSvg />
      </div>
      <div className="survey-container" onClick={handleSurveyClick}>
        <SurveySvg />
      </div>
      <div className="user-container"  onClick={handleUserClick}>
        <UserGroupSvg />
      </div>
      <div className="circle-reporting" onClick={handleReportingClick}>
        <div className="svg-reporting">
          <ReportingSvg />
        </div>
        <div>
          <p>Raporlama İşlemleri</p>
        </div>
      </div>
    </Layout>
  );
}

export default AdminHome;
