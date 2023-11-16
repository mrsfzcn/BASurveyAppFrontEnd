import axios from "axios";

const UPDATE_TAG = import.meta.env.VITE_UPDATE_TAG
const UPDATE_TAG_AND_CLASSES = import.meta.env.VITE_UPDATE_TAG_AND_CLASSES
const CREATE_TAG = import.meta.env.VITE_CREATE_TAG
const GET_ALL_TAG = import.meta.env.VITE_GET_ALL_TAG
const DELETE_TAG = import.meta.env.VITE_DELETE_TAG
class TagService {
  async updateTag(updateTag) {
    return await axios.put(UPDATE_TAG, updateTag, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }
  async updateTagAndClasses(updateTagAndClasses) {
    return await axios.post(UPDATE_TAG_AND_CLASSES, updateTagAndClasses, {
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

  async deleteTag(tagString) {
    console.log(tagString);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios.delete(`${DELETE_TAG}/${tagString}` , config);
  }
}

export default new TagService();
