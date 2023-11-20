import {axiosInstanceGlobal} from "../axiosControl/axiosInstance/axiosInstance";

class SurveyService {
  create(survey) {
    return axiosInstanceGlobal.post("/survey", survey);
  }

  update(survey) {
    return axiosInstanceGlobal.put("/survey/update", survey);
  }

  assign(survey) {
    return axiosInstanceGlobal.put("/survey/assign", survey);
  }

  getQuestions() {
    return axiosInstanceGlobal.get("/questions/find-all-question");
  }

  async list() {
    return await axiosInstanceGlobal.get("/survey/list");
  }

  async findSurveyByEmailToken(value) {
    return await axiosInstanceGlobal.get(`/survey/find-survey-by-email-token/${value}`);
  }

  async delete(id) {
    return await axiosInstanceGlobal.delete(`/survey/full-delete/${id}`);
  }

  async surveyGetById(id) {
    return await axiosInstanceGlobal.get(`/survey/find-survey-by-id/${id}`);
  }

  addQuestionsToSurvey(addQuestion) {
    return axiosInstanceGlobal.post("/survey/add-questions-to-survey", addQuestion);
  }

  async getAllTag() {
    try {
      const response = await axiosInstanceGlobal.get("/student-tag/student-tags");
      return response.data; 
    } catch (error) {
      console.error("Tag verileri alınırken bir hata oluştu:", error);
      return []; 
    }
  }

  async getAllSurveys() {
    try {
      const response = await axiosInstanceGlobal.get("/survey/list");
      return response.data; 
    } catch (error) {
      console.error("Anket verileri alınırken bir hata oluştu:", error);
      return []; 
    }
  }

  async getSurveyQuestions(id){
    try{
        const response = await axiosInstanceGlobal.get(`/survey/${id}/questions`);
      return response.data; 
    } catch(error){
      console.error("Anket soruları alınırken bir hata oluştu:", error);
      return [];
    }
  }
  
   removeSurveyQuestions(id, data) {
    const config = {data: {questionIds: data}};
    try{
      const response = axiosInstanceGlobal.delete(`/survey/${id}/questions`, config);
      return response;
    }catch(error){
      console.log(error);
      return [];
    }
  }

  setRequiredQuestions(SetRequiredQuestionIndexesDto) {
    return axiosInstanceGlobal.put("/api/v1/survey/add-required-question-indexes", SetRequiredQuestionIndexesDto);
  }
}


export default new SurveyService();


