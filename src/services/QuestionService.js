import axios from "axios";

const GETALL = `http://localhost:8090/api/v1/questions/findallquestion`;
const DELETE = `http://localhost:8090/api/v1/questions/deletequestionbyid/`;
const GET_QUESTION_BY_ID = "http://localhost:8090/api/v1/questions/findById/";
const GET_ALL_QUESTION_TAGS = "http://localhost:8090/api/v1/questiontags";
const CREATE_QUESTION = "http://localhost:8090/api/v1/questions";

class QuestionService {

    async list() {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        return await axios.get(GETALL, config);
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

    async questionGetById(id) {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return await axios.get(GET_QUESTION_BY_ID + id, config);
    }
    async getAllQuestionTags(id) {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return await axios.get(GET_ALL_QUESTION_TAGS , config);
    }
    async createQuestions(createQuestion) {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return await axios.post(CREATE_QUESTION ,createQuestion, config);
    }
}
export default new QuestionService();