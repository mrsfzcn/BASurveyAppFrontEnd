import { axiosInstanceGlobal } from "../axiosControl/axiosInstance/axiosInstance";

class StudentService {

    async updateStudent(updatedStudent) {
      return await axiosInstanceGlobal.put("/student/assign-student-tag", updatedStudent);
    }
  
      async list() {
          return await axiosInstanceGlobal.get("/student/students");
      }
      
      async delete(id) {
      return await axiosInstanceGlobal.delete(`/student/delete-student-by-id/${id}`);
      }

      async findUserIdByEmailToken(value) {
        return await axiosInstanceGlobal.get(`/user/find-user-by-email-token/${value}`);
      }
  }
  export default new StudentService();