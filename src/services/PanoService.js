import { axiosInstanceGlobal } from "../axiosControl/axiosInstance/axiosInstance";

class PanoService {

    async getStudents() {
        const response = await axiosInstanceGlobal.get(`/student/students`);
        return response;
    }
    async getClasses() {
        const response = await axiosInstanceGlobal.get(`/course/active-course`);
        return response;
    }

}

export default new PanoService();