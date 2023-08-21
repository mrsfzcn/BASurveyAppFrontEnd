import axios from "axios";

const LIST_ALL_STUDENTS = "http://localhost:8090/api/v1/student/students"

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
}
export default new ClassService();