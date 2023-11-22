import { axiosInstanceGlobal } from "../axiosControl/axiosInstance/axiosInstance";

class BranchListService{

    async getData(){
            const response = await axiosInstanceGlobal.get(`/branch/active-branches`);
            return response;
    }
    
    async updateData(apiId){
        return axiosInstanceGlobal.put(`branch/refresh/${apiId}`)
    }
}

export default new BranchListService();