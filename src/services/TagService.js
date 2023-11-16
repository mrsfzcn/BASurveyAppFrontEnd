import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL
const UPDATE_TAG = `${BASE_URL}/api/v1/main-tags/update-tag-by-tag-name`
const UPDATE_TAG_AND_CLASSES = `${BASE_URL}/api/v1/main-tags/update-tag-by-tag-name-and-tag-classes-all`
const CREATE_TAG = `${BASE_URL}/api/v1/main-tags/`
const GET_ALL_TAG = `${BASE_URL}/api/v1/main-tags/`
const DELETE_TAG = `${BASE_URL}/api/v1/main-tags/delete-by-tag-string`
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
