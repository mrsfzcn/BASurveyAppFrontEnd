import {
  BrowserRouter as Router,
  Routes,
  Route,
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
import SurveyFilling from "./pages/surveyFillingPage/SurveyFilling";
import QuestionUpdatePage from "./pages/questionPage/QuestionUpdatePage";
import QuestionAddPage from "./pages/questionPage/QuestionAddPage";
import UserEditPage from "./pages/userEdit/UserEditPage";
import PrivateRoutes from "./utils/PrivateRoutes";
import RegenerateQrCode from "./pages/regenerateqrcode/RegenerateQrCode";
import AssignStudentToClass from "./pages/AssignStudentClass/assignstudentclass"
import StudentListPage from "./pages/classesPage/studentList/StudentListPage";
import TrainerListPage from "./pages/classesPage/trainerList/TrainerListPage";
import BranchList from "./pages/branch/List";
import CourseList from "./pages/course/assigncourse";
import ClassListPage from "./pages/classesPage/classList/ClassListPage";
import TrainerPage from "./pages/trainerPage/TrainerPage";
import SurveyReport from "./pages/reportPage/SurveyReport";
import Pano from "./pages/pano/Pano";
import { ScheduleTable } from "./pages/pano/ScheduleTable";
import ClassDetails from "./pages/classesPage/classDetails/ClassDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/giris" element={<Login />} />
        <Route path="/kare-kod" element={<Qrcode />} />
        <Route path="/kod" element={<Code />} />
        <Route path="/yeni-kare-kod-olustur" element={<RegenerateQrCode />} />
        <Route path="/anket-doldurma-sayfası" element={<SurveyFilling />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/subeler" element={<BranchList />} />
          <Route path="/kurslar" element={<CourseList />} />
          <Route path="/yonetici-sayfasi" element={<AdminHomePage />} exact />
          <Route path="/anket-gonder" element={<SendSurvey />} />
          <Route path="/sinifa-egitmen-atama" element={<TrainerToClass />} />
          <Route path="/kullanici-bilgileri-guncelle" element={<UserEditPage />} />
          <Route path="/anket-olustur" element={<CreateSurveyPage />} />
          <Route path="/sinifa-ogrenci-atama" element={<AssignStudentToClass />} />
          <Route path="/soru-ekle" element={<AddQuestion />} />
          <Route path="/on-izleme" element={<PreviewSurvey />} />
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
          <Route path="/egitmenler">
            <Route index element={<TrainerPage />} />
            {/* <Route path="guncelle/:id">
              <Route index element={<UpdateType />} />
            </Route> */}
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
          <Route path="/soru-listesi">
            <Route index element={<QuestionListPage />} />
            <Route path="ekle">
              <Route index element={<QuestionAddPage />} />
            </Route>
            <Route path="guncelle/:id">
              <Route index element={<QuestionUpdatePage />} />
            </Route>
          </Route>
          {/* <Route path="/soru-tipi-listesi">
            <Route index element={<QuestionType />} />
            <Route path="guncelle/:id">
              <Route index element={<UpdateType />} />
            </Route>
          </Route> */}
          <Route path="/ogrenci-listesi">
            <Route index element={<StudentListPage />} />
            {/* <Route path="guncelle/:id">
              <Route index element={<UpdateType />} />
            </Route> */}
          </Route>
          <Route path="/egitmen-listesi">
            <Route index element={<TrainerListPage />} />
            {/* <Route path="guncelle/:id">
              <Route index element={<UpdateType />} />
            </Route> */}
          </Route>
          <Route>
            <Route path="/sinif-listesi">
              <Route index element={<ClassListPage />} />
            </Route>
          </Route>
        </Route>
        <Route>
          <Route path="/anket-raporlama">
            <Route index element={<SurveyReport />} />
          </Route>
        </Route>
        <Route path="/zamanlama" element={<ScheduleTable />} />
        <Route path="/pano" element={<Pano />} />
        <Route path="/sayfa/:id" element={<ClassDetails />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
