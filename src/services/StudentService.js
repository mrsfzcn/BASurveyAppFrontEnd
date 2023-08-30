import axios from "axios";

const GETALL = `http://localhost:8090/api/v1/student/students`;
const DELETE = `http://localhost:8090/api/v1/student/delete-student-by-id/`;
const UPDATE_STUDENT = "http://localhost:8090/api/v1/student/assign-student-tag";

class StudentService {

    async updateStudent(updatedStudent) {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return await axios.put(UPDATE_STUDENT, updatedStudent, config);
    }
  
      async list() {
          const token = localStorage.getItem("token");
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          return await axios.get(GETALL, config);
      }
      
      async delete(id) {
      const token = localStorage.getItem("token");
      const config = {
          headers: {
          Authorization: `Bearer ${token}`,
          },
      };
      return await axios.delete(DELETE + id, config);
      }
  }
  export default new StudentService();