import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL
const GETALL = `${BASE_URL}/api/v1/course/find-all`


class CourseService {

    
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
export default new CourseService();