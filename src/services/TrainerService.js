import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL
const GET_ALL_TRAINER = `${BASE_URL}/api/v1/trainer/find-all-trainers`
const GET_ALL_TRAINER_TAGS = `${BASE_URL}/api/v1/trainer-tag/find-all`
const DELETE = `${BASE_URL}/api/v1/trainer/delete-trainer-by-id`
const ASSIGN_TRAINER = `${BASE_URL}/api/v1/trainer/assign-trainer-tag`


class TrainerService {

    async list() {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        return await axios.get(GET_ALL_TRAINER, config);
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
    assign(trainer) {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        return axios.post(ASSIGN_TRAINER,trainer,config);
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
}
export default new TrainerService();