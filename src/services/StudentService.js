import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL
const GETALL = `${BASE_URL}/api/v1/student/students`
const DELETE = `${BASE_URL}/api/v1/student/delete-student-by-id`
const UPDATE_STUDENT = `${BASE_URL}/api/v1/student/assign-student-tag`
const FIND_USER_ID_BY_EMAIL_TOKEN = `${BASE_URL}/api/v1/user/find-user-by-email-token`

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
      return await axios.delete(`${DELETE}/${id}`, config);
      }

      async findUserIdByEmailToken(value) {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        return await axios.get(`${FIND_USER_ID_BY_EMAIL_TOKEN}`+ `${value}`, config);
      }
  }
  export default new StudentService();