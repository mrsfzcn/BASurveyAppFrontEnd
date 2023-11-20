import { axiosInstanceGlobal } from "../axiosControl/axiosInstance/axiosInstance";

class QuestionTypeService {

  async getAllType() {
    return await axiosInstanceGlobal.get("/question-types/get-all-question-type");
  }
}

export default new QuestionTypeService();