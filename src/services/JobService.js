import { axiosInstanceGlobal } from "../axiosControl/axiosInstance/axiosInstance";
class JobService {

    async forceUpdateDatabase() {
        return await axiosInstanceGlobal.get(`/job/update-survey-app-data`);
      } 
      async reschedule(value) {
        return await axiosInstanceGlobal.get(`/job/reschedule?expression=${value}`);
      } 
      async currentUpdateTime() {
        return await axiosInstanceGlobal.get(`/job/get-current-update-time`);
      }   
}
export default new JobService(); 
