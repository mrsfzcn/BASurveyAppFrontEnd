
import { axiosInstanceGlobal } from "../axiosControl/axiosInstance/axiosInstance";

class TagService {

  async updateTag(updateTag) {
    return await axiosInstanceGlobal.put("/main-tags/update-tag-by-tag-name", updateTag);
  }
  async updateTagAndClasses(updateTagAndClasses) {
    return await axiosInstanceGlobal.post("/main-tags/update-tag-by-tag-name-and-tag-classes-all", updateTagAndClasses);
  }

  async createTag(createTag) {
    return await axiosInstanceGlobal.post("/main-tags/", createTag);
  }

  async getAllTag() {
    return await axiosInstanceGlobal.get("/main-tags/");
  }

  async deleteTag(tagString) {
    return await axiosInstanceGlobal.delete(`/main-tags/delete-by-tag-string/${tagString}`);
  }
}

export default new TagService();
