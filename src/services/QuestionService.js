import axios from "axios";

const GETALL = import.meta.env.VITE_GETALL_QUESTION
const DELETE = import.meta.env.VITE_DELETE_QUESTION
const GET_QUESTION_BY_ID = import.meta.env.VITE_GET_QUESTION_BY_ID
const GET_ALL_QUESTION_TAGS = import.meta.env.VITE_GET_ALL_QUESTION_TAGS
const CREATE_QUESTION = import.meta.env.VITE_CREATE_QUESTION
const UPDATE_QUESTION = import.meta.env.VITE_UPDATE_QUESTION

class QuestionService {

  async updateQuestion(updatedQuestion) {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios.put(UPDATE_QUESTION, updatedQuestion, config);
  }

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
    return await axios.delete(`${DELETE}/${id}`, config);
    }

    async questionGetById(id) {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return await axios.get(`${GET_QUESTION_BY_ID}/${id}`, config);
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