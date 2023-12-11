import { axiosInstanceGlobal } from "../axiosControl/axiosInstance/axiosInstance";

class ResponseService{
    async findAllResponses(){
        const responses = await axiosInstanceGlobal.get(`/responses`);
        return responses;
    }

    async exportToExcel(studentTagOid){        
        
        const exportExcel = (await axiosInstanceGlobal.get(`/responses/excel/${studentTagOid}`));
        return exportExcel;
    }        
}
export default new ResponseService();