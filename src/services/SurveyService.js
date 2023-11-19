import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL
const CREATE = `${BASE_URL}/api/v1/survey`
const UPDATE = `${BASE_URL}/api/v1/survey/update`
const QUESTIONS = `${BASE_URL}/api/v1/questions/find-all-question`
const ADD_QUESTIONS_TO_SURVEY = `${BASE_URL}/api/v1/survey/add-questions-to-survey`
const LIST = `${BASE_URL}/api/v1/survey/list`
const FIND_SURVEY_BY_EMAIL_TOKEN = `${BASE_URL}/api/v1/survey/find-survey-by-email-token/`
const DELETE = `${BASE_URL}/api/v1/survey/full-delete`
const GET_SURVEY_BY_ID = `${BASE_URL}/api/v1/survey/find-survey-by-id`
const GET_ALL_TAG = `${BASE_URL}/api/v1/student-tag/student-tags`
const ASSIGN = `${BASE_URL}/api/v1/survey/assign`
const DEFAULT_SURVEY = `${BASE_URL}/api/v1/survey`
const SETREQUIREDQUESTIONINDEXES=`${BASE_URL}/api/v1/survey/add-required-question-indexes`

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

  setRequiredQuestions(SetRequiredQuestionIndexesDto) {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(SetRequiredQuestionIndexesDto);
    return axios.put(SETREQUIREDQUESTIONINDEXES, SetRequiredQuestionIndexesDto, config);
  }
}


export default new SurveyService();


