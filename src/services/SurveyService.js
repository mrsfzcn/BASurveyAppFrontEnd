import axios from "axios";

const CREATE = "http://localhost:8090/api/v1/survey";
const UPDATE= "http://localhost:8090/api/v1/survey/update";
const QUESTIONS = "http://localhost:8090/api/v1/questions/find-all-question";
const ADD_QUESTIONS_TO_SURVEY ="http://localhost:8090/api/v1/survey/add-questions-to-survey";
const LIST = "http://localhost:8090/api/v1/survey/list";
const DELETE = "http://localhost:8090/api/v1/survey/delete/";
const GET_SURVEY_BY_ID = "http://localhost:8090/api/v1/survey/find-survey-by-id/";
const GET_ALL_TAG = "http://localhost:8090/api/v1/student-tag/student-tags";
const ASSIGN=  "http://localhost:8090/api/v1/survey/assign";

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
  update(survey) {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios.put(UPDATE, survey, config);
  }
  assign(survey) {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios.put(ASSIGN,survey,config);
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
  async getAllTag() {
    try {
      const response = await axios.get(GET_ALL_TAG, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data; 
    } catch (error) {
      console.error("Tag verileri alınırken bir hata oluştu:", error);
      return []; 
    }
  }

  async getAllSurveys() {
    try {
      const response = await axios.get(LIST, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data; 
    } catch (error) {
      console.error("Tag verileri alınırken bir hata oluştu:", error);
      return []; 
    }
  }
}

export default new SurveyService();
