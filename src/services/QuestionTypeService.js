import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL
const UPDATE_TYPE = `${BASE_URL}/api/v1/question-types/update-question-type-by-type-string`
const CREATE_TYPE = `${BASE_URL}/api/v1/question-types/create-question-type`
const GET_ALL_TYPE = `${BASE_URL}/api/v1/question-types/get-all-question-type`
const DELETE = `${BASE_URL}/api/v1/question-types/delete`

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
  async delete(id) {
    const config = {
        headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    return await axios.delete(`${DELETE}/${id}`, config);
    }
}

export default new QuestionTypeService();
