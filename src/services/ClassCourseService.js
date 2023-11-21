import axios from "axios";
import LocalStorageServiceAuth from "../store/auth-store"

const BASE_URL = import.meta.env.VITE_BASE_URL
const GETALL = `${BASE_URL}/api/v1/course-group/get-all-data-for-fronted-table`


class StudentService {

    
      async list() {
          const token = LocalStorageServiceAuth.getToken();
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          return await axios.get(GETALL, config);
      }
      
     
     
  }
  export default new StudentService();