import { axiosInstanceGlobal } from "../axiosControl/axiosInstance/axiosInstance";

class PanoService {

    async getStudents(id) {
        const response = await axiosInstanceGlobal.post(`/student/find-by-courseId/${id}`);
        return response;
    }


}

export default new PanoService();