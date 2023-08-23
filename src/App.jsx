import { useState } from "react";
import reactLogo from "./assets/react.svg";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Login from "./pages/LoginPage/login";
import Qrcode from "./pages/qrcode/qrcode";
import Code from "./pages/code/Code";
import CreateSurveyPage from "./pages/CreateSurveyPage/createsurvey";
import AdminHomePage from "./pages/adminHome/AdminHomePage";
import QuestionListPage from "./pages/questionPage/questionList/QuestionListPage";
import AddTag from "./pages/tag/AddTag";

import UserRegistration from "./pages/user/UserRegistration";
import TumKullanicilar from "./pages/user/TumKullanicilar";
import AddQuestion from "./pages/CreateSurveyPage/AddQuestion";
import SendSurvey from "./pages/sendSurvey/SendSurvey";
import TrainerToClass from "./pages/AssigningTrainerToClass/TrainerToClass";
import TumAnketler from "./pages/surveys/TumAnketler";
import AnketEkle from "./pages/surveys/AnketEkle";
import AnketDuzenle from "./pages/surveys/AnketDuzenle";
import UpdateTag from "./pages/tag/UpdateTag";
import PreviewSurvey from "./pages/CreateSurveyPage/PreviewSurvey";
import QuestionUpdatePage from "./pages/questionPage/QuestionUpdatePage";
import QuestionAddPage from "./pages/questionPage/QuestionAddPage";
import UserEditPage from "./pages/userEdit/UserEditPage";
// import UpdateType from "./pages/questionPage/questionTypeOperations/UpdateType";
import QuestionType from "./pages/questionPage/questionTypeOperations/QuestionType";
import UpdateType from "./pages/questionPage/questionTypeOperations/UpdateType";
import PrivateRoutes from "./utils/PrivateRoutes";
import RegenerateQrCode from "./pages/regenerateqrcode/RegenerateQrCode";
import AssignStudentToClass from "./pages/AssignStudentClass/assignstudentclass"
import StudentListPage from "./pages/classesPage/studentList/StudentListPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/qrcode" element={<Qrcode />} />
        <Route path="/code" element={<Code />} />
        <Route path="/regenerate-qr-code" element={<RegenerateQrCode />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/adminhome" element={<AdminHomePage />} exact />
          <Route path="/sendsurvey" element={<SendSurvey />} />
          <Route path="/assigning-trainer-to-class" element={<TrainerToClass/>} />
          <Route path="/edituser" element={<UserEditPage />} />
          <Route path="/createsurvey" element={<CreateSurveyPage />} />
          <Route path="/assignstudentclass" element={<AssignStudentToClass />} />
          <Route path="/addquestion" element={<AddQuestion />} />
          <Route path="/preview" element={<PreviewSurvey />} />
          <Route path="/*" element={<Navigate to="/" />} />
          <Route path="/etiket">
            <Route index element={<AddTag />} />
            <Route path="guncelle/:id">
              <Route index element={<UpdateTag />} />
            </Route>
          </Route>
          <Route path="/kullanici">
            <Route index element={<TumKullanicilar />} />
            <Route path="ekle">
              <Route index element={<UserRegistration />} />
            </Route>
          </Route>
          <Route path="/anketler">
            <Route index element={<TumAnketler />} />
            <Route path="guncelle/:id">
              <Route index element={<AnketDuzenle />} />
            </Route>
            <Route path="ekle">
              <Route index element={<AnketEkle />} />
            </Route>
          </Route>
          <Route path="/questionlist">
            <Route index element={<QuestionListPage />} />
            <Route path="add">
              <Route index element={<QuestionAddPage />} />
            </Route>
            <Route path="guncelle/:id">
              <Route index element={<QuestionUpdatePage />} />
            </Route>
          </Route>
          <Route path="/questiontypelist">
            <Route index element={<QuestionType />} />
            <Route path="guncelle/:id">
              <Route index element={<UpdateType />} />
            </Route>
          </Route>
          <Route path="/ogrencilistesi">
            <Route index element={<StudentListPage />} />
            {/* <Route path="guncelle/:id">
              <Route index element={<UpdateType />} />
            </Route> */}
          </Route>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
