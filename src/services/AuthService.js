import axios from "axios";

const LOGIN = import.meta.env.VITE_LOGIN
const VERIFYCODE = import.meta.env.VITE_VERIFYCODE
const REGISTER = import.meta.env.VITE_REGISTER
const REGENERATE_QR_CODE = import.meta.env.VITE_REGENERATE_QR_CODE
  
class AuthService {
  login(user) {
    return axios.post(LOGIN, user);
  }
  verifyCode(code) {
    return axios.post(VERIFYCODE, code);
  }
  register(data) {
    return axios.post(REGISTER, data);
  }

  regenerateQrCode(data) {
    return axios.put(REGENERATE_QR_CODE, data);
  }
}

export default new AuthService();
