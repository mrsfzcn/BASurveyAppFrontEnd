import { axiosInstanceGlobal } from "../axiosControl/axiosInstance/axiosInstance";

class StudentService {

      async list() {
          return await axiosInstanceGlobal.get("/course-group/get-all-data-for-fronted-table");
      }
  }
  
  export default new StudentService();