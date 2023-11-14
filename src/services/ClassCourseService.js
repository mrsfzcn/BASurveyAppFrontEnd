import axios from "axios";

const GETALL = `http://localhost:8090/api/v1/course-group/get-all-data-for-fronted-table`;


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