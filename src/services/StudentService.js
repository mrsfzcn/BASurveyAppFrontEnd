import axios from "axios";

const GETALL = import.meta.env.VITE_GETALL_STUDENT
const DELETE = import.meta.env.VITE_DELETE_STUDENT
const UPDATE_STUDENT = import.meta.env.VITE_UPDATE_STUDENT
const FIND_USER_ID_BY_EMAIL_TOKEN = import.meta.env.VITE_FIND_USER_ID_BY_EMAIL_TOKEN

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