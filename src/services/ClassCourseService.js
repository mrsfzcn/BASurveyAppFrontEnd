import axios from "axios";

const GETALL = import.meta.env.VITE_GETALLCOURSEGROUP


class StudentService {

    
      async list() {
          const token = localStorage.getItem("token");
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          return await axios.get(GETALL, config);
      }
      
     
     
  }
  export default new StudentService();