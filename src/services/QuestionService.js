import {axiosInstanceGlobal} from "../axiosControl/axiosInstance/axiosInstance";

class QuestionService {

    async updateQuestion(updatedQuestion) {
      return await axiosInstanceGlobal.put('/questions/update-question', updatedQuestion);
    }

    async list() {
        return await axiosInstanceGlobal.get('/questions/find-all-question');
    }
    
    async delete(id) {
      return await axiosInstanceGlobal.delete(`/questions/delete-question-by-id/${id}`);
    }

    async questionGetById(id) {
      return await axiosInstanceGlobal.get("/questions/find-by-id/"+id);
    }

    async getAllQuestionTags() {
      return await axiosInstanceGlobal.get("/question-tags");
    }

    async createQuestions(createQuestion) {
      return await axiosInstanceGlobal.post("/questions" ,createQuestion);
    }
}
export default new QuestionService();