import axios from "axios";

const GET_ALL_TRAINER = import.meta.env.VITE_GET_ALL_TRAINER
const GET_ALL_TRAINER_TAGS = import.meta.env.VITE_GET_ALL_TRAINER_TAGS
const DELETE = import.meta.env.VITE_DELETE_TRAINER_BY_ID
const ASSIGN_TRAINER = import.meta.env.VITE_ASSIGN_TRAINER_TAG


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