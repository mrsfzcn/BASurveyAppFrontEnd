import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL
const LOGIN = `${BASE_URL}/api/v1/auth/authenticate`
const VERIFYCODE = `${BASE_URL}/api/v1/auth/verify-code`
const REGISTER = `${BASE_URL}/api/v1/auth/register`
const REGENERATE_QR_CODE = `${BASE_URL}/api/v1/auth/regenerate-qr-code`
  
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
