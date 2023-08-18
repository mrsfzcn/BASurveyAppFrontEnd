import axios from "axios";

const UPDATE_TAG = "http://localhost:8090/api/v1/main-tags/update-tag-by-tag-name";
const UPDATE_TAG_AND_CLASSES = "http://localhost:8090/api/v1/main-tags/update-tag-by-tag-name-and-tag-classes-all";
const CREATE_TAG = "http://localhost:8090/api/v1/main-tags/";
const GET_ALL_TAG = "http://localhost:8090/api/v1/main-tags/";
const DELETE_TAG = "http://localhost:8090/api/v1/main-tags/delete-by-tag-string/";
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
    return await axios.delete(DELETE_TAG + tagString , config);
  }
}

export default new TagService();
