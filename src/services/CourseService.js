import { axiosInstanceGlobal } from "../axiosControl/axiosInstance/axiosInstance";

class CourseService {
  async list() {
    return await axiosInstanceGlobal.get("/course/find-all");
  }
}
export default new CourseService();
