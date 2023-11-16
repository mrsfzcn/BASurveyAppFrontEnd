import axios from "axios";

const FIND_TRAINERS_BY_TRAINER_TAG = import.meta.env.VITE_FIND_TRAINERS_BY_TRAINER_TAG

class TrainerTagService {

    async findTrainersEmailToken(value) {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        return await axios.get(`${FIND_TRAINERS_BY_TRAINER_TAG}+${value}`, config);
      }
   
}
export default new TrainerTagService();