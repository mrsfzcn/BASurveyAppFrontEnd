import axios from "axios";

const FIND_TRAINERS_BY_TRAINER_TAG = `http://localhost:8090/api/v1/trainer-tag/find-trainers-by-trainer-tag/`;

class TrainerTagService {

    async findTrainersEmailToken(value) {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        return await axios.get(FIND_TRAINERS_BY_TRAINER_TAG+value, config);
      }
   
}
export default new TrainerTagService();