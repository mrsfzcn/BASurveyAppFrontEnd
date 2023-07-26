import axios from "axios";

const GETALL = `http://localhost:8090/api/v1/questions/findallquestion`;
const DELETE = `http://localhost:8090/api/v1/questions/delete/`;

class QuestionService {

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
export default new QuestionService();