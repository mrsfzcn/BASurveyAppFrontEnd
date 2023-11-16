import axios from "axios";

const UPDATE_TYPE = import.meta.env.VITE_UPDATE_QUESTION_TYPE
const CREATE_TYPE = import.meta.env.VITE_CREATE_QUESTION_TYPE
const GET_ALL_TYPE = import.meta.env.VITE_GET_ALL_QUESTION_TYPE
const DELETE = import.meta.env.VITE_DELETE_QUESTION_TYPE

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
