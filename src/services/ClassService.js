import { axiosInstanceGlobal } from "../axiosControl/axiosInstance/axiosInstance";

class ClassService {
  async list() {
    try {
      const response = await axiosInstanceGlobal.get("/student/students");
      return response.data;
    } catch (error) {
      console.error("Öğrenci verileri alınırken bir hata oluştu:", error);
      return [];
    }
  }
  assign(student) {
    return axiosInstanceGlobal.put("/student/assign-student-tag", student);
  }
}
export default new ClassService();
