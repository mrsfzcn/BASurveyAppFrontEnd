import { axiosInstanceGlobal } from "../axiosControl/axiosInstance/axiosInstance";

class UserEditService {
  async get(userId) {
    const response = await axiosInstanceGlobal.get(`/user/${userId}`);
    return response;
  }

  async getStudent(userId) {
    const response = await axiosInstanceGlobal.get(
      `/student/find-user-by-student-oid/${userId}`
    );
    return response;
  }
  async getTrainer(userId) {
    const response = await axiosInstanceGlobal.get(
      `/trainer/find-user-by-trainer-oid/${userId}`
    );
    return response;
  }
  
  async update(userEmail, obj) {
    return axiosInstanceGlobal.put(`/user/update/${userEmail}`, obj);
  }

}

export default new UserEditService();
