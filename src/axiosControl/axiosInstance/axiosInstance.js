// axiosInstance.js

import axios from "axios";
import { useHistory } from "react-router-dom";

const axiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token && token.trim() !== "") {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.error("Yetki hatası");
        return Promise.reject(new Error("Yetki hatası"));
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401 || error.response.status === 403) {
        console.error("Yetki hatası");
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("Token not found");
          return;
        }
        localStorage.removeItem("token");
        const history = useHistory();
        history.push("/login"); // Yetkisiz erişim durumunda login sayfasına yönlendir
        return Promise.reject(new Error("Yetki hatası"));
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

const baseURL = "http://localhost:8090/api/v1";

const axiosInstanceAuth = axiosInstance(`${baseURL}/auth`);
const axiosInstanceBranch = axiosInstance(`${baseURL}/branch`);
const axiosInstanceCourse = axiosInstance(`${baseURL}/course`);
const axiosInstanceCourseGroup = axiosInstance(`${baseURL}/course-group`);
const axiosInstanceMainTags = axiosInstance(`${baseURL}/main-tags`);
const axiosInstanceQuestions = axiosInstance(`${baseURL}/questions`);
const axiosInstanceQuestionTags = axiosInstance(`${baseURL}/question-tags`);
const axiosInstanceQuestionTypes = axiosInstance(`${baseURL}/question-types`);
const axiosInstanceResponses = axiosInstance(`${baseURL}/responses`);
const axiosInstanceRole = axiosInstance(`${baseURL}/role`);
const axiosInstanceStudent = axiosInstance(`${baseURL}/student`);
const axiosInstanceStudentTag = axiosInstance(`${baseURL}/student-tag`);
const axiosInstanceSurvey = axiosInstance(`${baseURL}/survey`);
const axiosInstanceSurveytag = axiosInstance(`${baseURL}/surveytag`);
const axiosInstanceTrainer = axiosInstance(`${baseURL}/trainer`);
const axiosInstanceTrainerTag = axiosInstance(`${baseURL}/trainer-tag`);
const axiosInstanceUser = axiosInstance(`${baseURL}/user`);
const axiosInstanceUserTag = axiosInstance(`${baseURL}/user-tag`);

export {
  axiosInstanceAuth,
  axiosInstanceBranch,
  axiosInstanceCourse,
  axiosInstanceCourseGroup,
  axiosInstanceMainTags,
  axiosInstanceQuestions,
  axiosInstanceQuestionTags,
  axiosInstanceQuestionTypes,
  axiosInstanceResponses,
  axiosInstanceRole,
  axiosInstanceStudent,
  axiosInstanceStudentTag,
  axiosInstanceSurvey,
  axiosInstanceSurveytag,
  axiosInstanceTrainer,
  axiosInstanceTrainerTag,
  axiosInstanceUser,
  axiosInstanceUserTag,
};
