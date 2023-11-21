import { axiosInstanceGlobal } from "../axiosControl/axiosInstance/axiosInstance";

class TrainerService {

  async list() {
    return await axiosInstanceGlobal.get("/trainer/find-all-trainers");
  }

  async getAllTrainerTags() {
    return await axiosInstanceGlobal.get("/trainer-tag/find-all");
  }
  
  assign(trainer) {
    return axiosInstanceGlobal.post("/trainer/assign-trainer-tag", trainer);
  }

  async delete(id) {
    return await axiosInstanceGlobal.delete(
      `/trainer/delete-trainer-by-id/${id}`
    );
  }
}
export default new TrainerService();
