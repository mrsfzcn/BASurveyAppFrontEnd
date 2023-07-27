import axios from "axios";

const UPDATE_TAG = "http://localhost:8090/api/v1/maintags/updatetagbytagname";
const CREATE_TAG = "http://localhost:8090/api/v1/maintags/";
const GET_ALL_TAG = "http://localhost:8090/api/v1/maintags/";
class TagService {
  async updateTag(updateTag) {
    return await axios.put(UPDATE_TAG, updateTag, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  async createTag(createTag) {
    return await axios.post(CREATE_TAG, createTag, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  async getAllTag() {
    return await axios.get(GET_ALL_TAG, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }
}

export default new TagService();
