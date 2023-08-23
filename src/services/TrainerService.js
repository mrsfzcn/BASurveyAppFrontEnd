import axios from "axios";

const GET_ALL_TRAINER = `http://localhost:8090/api/v1/trainer/find-all-trainers`;
const DELETE = `http://localhost:8090/api/v1/questions/delete-question-by-id/`;
const GET_QUESTION_BY_ID = "http://localhost:8090/api/v1/questions/find-by-id/";
const GET_ALL_TRAINER_TAGS = "http://localhost:8090/api/v1/trainer-tag/findall";
const CREATE_QUESTION = "http://localhost:8090/api/v1/questions";
const UPDATE_QUESTION = "http://localhost:8090/api/v1/questions/update-question";
const ASSIGN_TRAINER=  "http://localhost:8090/api/v1/trainer/assign-trainer-tag";


class TrainerService {

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
        return await axios.get(GET_ALL_TRAINER, config);
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
    async getAllTrainerTags() {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return await axios.get(GET_ALL_TRAINER_TAGS , config);
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
    assign(trainer) {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        return axios.post(ASSIGN_TRAINER,trainer,config);
      }
}
export default new TrainerService();