import axios from "axios";

const CREATE = "http://localhost:8090/api/v1/survey";
const QUESTIONS = "http://localhost:8090/api/v1/questions/findallquestion";
const ADD_QUESTIONS_TO_SURVEY =
  "http://localhost:8090/api/v1/survey/add-questions-to-survey";
const LIST = "http://localhost:8090/api/v1/survey/list";
const DELETE = "http://localhost:8090/api/v1/survey/delete/";
const GET_SURVEY_BY_ID = "http://localhost:8090/api/v1/survey/findSurveyByid/";
class SurveyService {
  create(survey) {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios.post(CREATE, survey, config);
  }

  getQuestions() {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios.get(QUESTIONS, config);
  }

  async list() {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios.get(LIST, config);
  }
  async delete(id) {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios.delete(DELETE + id, config);
  }

  async surveyGetById(id) {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios.get(GET_SURVEY_BY_ID + id, config);
  }

  addQuestionsToSurvey(addQuestion) {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return axios.post(ADD_QUESTIONS_TO_SURVEY, addQuestion, config);
  }
}

export default new SurveyService();
