import { axiosInstanceGlobal } from "../axiosControl/axiosInstance/axiosInstance";

class UserService{

    async get(){
            const response = await axiosInstanceGlobal.get(`/user/find-all-user-details`);
            return response;
    }
    
    async delete(oid){
        return axiosInstanceGlobal.delete(`/user/delete/${oid}`)
    }

}

export default new UserService();