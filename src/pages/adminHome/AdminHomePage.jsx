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
import TokenService from "../../services/TokenService";
import LocalStorageServiceAuth from "../../store/auth-store.js";

const decodedToken = TokenService.decodeToken(LocalStorageServiceAuth.getToken());
console.log(decodedToken);
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
    navigate("/soru-listesi");
    
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
      
      {decodedToken && (decodedToken.role === "MANAGER" || decodedToken.role === "ADMIN") && (
      <div className="question-container" onClick={handleQuestionClick}>
        <QuestionSvg />
      </div>)}
      {decodedToken && (decodedToken && decodedToken.role === "MANAGER"||decodedToken.role === "ADMIN"||decodedToken.role === "MASTER_TRAINER"||decodedToken.role === "ASSISTANT_TRAINER") && (
      <div className="classroom-container" onClick={handleClassroomClick}>
        <ClassroomSvg />
      </div>)}
      {decodedToken && (decodedToken && decodedToken.role === "MANAGER"||decodedToken.role === "ADMIN"||decodedToken.role === "MASTER_TRAINER"||decodedToken.role === "ASSISTANT_TRAINER") && (
      <div className="survey-container" onClick={handleSurveyClick}>
        <SurveySvg />
      </div>)}
      {decodedToken && ( decodedToken.role === "ADMIN") && (
        <div className="user-container" onClick={handleUserClick}>
          <UserGroupSvg />
        </div>
      )}
      {decodedToken && (decodedToken && decodedToken.role === "MANAGER"||decodedToken.role === "ADMIN"||decodedToken.role === "MASTER_TRAINER"||decodedToken.role === "ASSISTANT_TRAINER") && (
      <div className="circle-reporting" onClick={handleReportingClick}>
        <div className="svg-reporting">
          <ReportingSvg />
        </div>
        <div>
          <p>Raporlama İşlemleri</p>
        </div>
      </div>)}
    </Layout>
  );
}

export default AdminHome;
