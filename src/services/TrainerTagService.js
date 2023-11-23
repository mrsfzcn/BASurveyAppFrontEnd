import { axiosInstanceGlobal } from "../axiosControl/axiosInstance/axiosInstance";
class TrainerTagService {

    async findTrainersEmailToken(value) {
        return await axiosInstanceGlobal.get(`/trainer-tag/find-trainers-by-trainer-tag/${value}`);
      }   
}
export default new TrainerTagService(); 
