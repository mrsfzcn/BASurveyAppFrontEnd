import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL
const LIST_ALL_STUDENTS = `${BASE_URL}/api/v1/student/students`
const ASSIGN = `${BASE_URL}/api/v1/student/assign-student-tag`
class ClassService{
   async list(){
    try {
        const response = await axios.get(LIST_ALL_STUDENTS, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        return response.data; 
      } catch (error) {
        console.error("Öğrenci verileri alınırken bir hata oluştu:", error);
        return []; 
      }

    }

    assign(student) {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return axios.put(ASSIGN,student,config);
    }
}
export default new ClassService();