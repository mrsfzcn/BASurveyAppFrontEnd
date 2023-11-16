import axios from "axios";

const CREATE = import.meta.env.VITE_CREATE_SURVEY
const UPDATE = import.meta.env.VITE_UPDATE_SURVEY
const QUESTIONS = import.meta.env.VITE_FIND_ALL_SURVEY_QUESTIONS
const ADD_QUESTIONS_TO_SURVEY = import.meta.env.VITE_ADD_QUESTIONS_TO_SURVEY
const LIST = import.meta.env.VITE_SURVEY_LIST
const FIND_SURVEY_BY_EMAIL_TOKEN = import.meta.env.VITE_FIND_SURVEY_BY_EMAIL_TOKEN
const DELETE = import.meta.env.VITE_DELETE_SURVEY
const GET_SURVEY_BY_ID = import.meta.env.VITE_GET_SURVEY_BY_ID
const GET_ALL_TAG = import.meta.env.VITE_GET_ALL_SURVEY_TAG
const ASSIGN = import.meta.env.VITE_ASSIGN_SURVEY
const DEFAULT_SURVEY = import.meta.env.VITE_DEFAULT_SURVEY_ENDPOINT

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
  async findSurveyByEmailToken(value) {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios.get(FIND_SURVEY_BY_EMAIL_TOKEN+value, config);
  }
  async delete(id) {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios.delete(`${DELETE}/${id}`, config);
  }

  async surveyGetById(id) {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios.get(`${GET_SURVEY_BY_ID}/${id}`, config);
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
      console.error("Anket verileri alınırken bir hata oluştu:", error);
      return []; 
    }
  }
  async getSurveyQuestions(id){
    try{
        const response = await axios.get(`${DEFAULT_SURVEY}/${id}/questions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data; 
    } catch(error){
      console.error("Anket soruları alınırken bir hata oluştu:", error);
      return [];
    }
  }
   removeSurveyQuestions(id, data) {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: { questionIds: data},
    };
    try{
      const response = axios.delete(`${DEFAULT_SURVEY}/${id}/questions`, config);
      return response;
    }catch(error){
      console.log(error);
      return [];
    }
    
  }
}

export default new SurveyService();


