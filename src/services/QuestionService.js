import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL
const GETALL = `${BASE_URL}/api/v1/questions/find-all-question`
const DELETE = `${BASE_URL}/api/v1/questions/delete-question-by-id`
const GET_QUESTION_BY_ID = `${BASE_URL}/api/v1/questions/find-by-id`
const GET_ALL_QUESTION_TAGS = `${BASE_URL}/api/v1/question-tags`
const CREATE_QUESTION = `${BASE_URL}/api/v1/questions`
const UPDATE_QUESTION = `${BASE_URL}/api/v1/questions/update-question`

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