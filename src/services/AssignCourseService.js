import { axiosInstanceGlobal } from "../axiosControl/axiosInstance/axiosInstance";

class AssignCourseService{

    async getData(){
            const response = await axiosInstanceGlobal.get(`/course/active-course`);
            return response;
    }

}

export default new AssignCourseService();