import axios from "axios";

const UPDATE_TYPE = "http://localhost:8090/api/v1/questiontypes/updatequestiontypebytypestring"; 
const CREATE_TYPE = "http://localhost:8090/api/v1/questiontypes/createquestiontype";
const GET_ALL_TYPE = "http://localhost:8090/api/v1/questiontypes/getallquestiontype";

class QuestionTypeService {
  async updateType(updateType) {
    return await axios.put(UPDATE_TYPE, updateType, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  async createType(createType) {
    return await axios.post(CREATE_TYPE, createType, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  async getAllType() {
    return await axios.get(GET_ALL_TYPE, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }
}

export default new QuestionTypeService();
