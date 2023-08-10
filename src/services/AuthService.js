import axios from "axios";

const LOGIN = "http://localhost:8090/api/v1/auth/authenticate";
const VERIFYCODE = "http://localhost:8090/api/v1/auth/verify-code";
const REGISTER = "http://localhost:8090/api/v1/auth/register";
const REGENERATE_QR_CODE =
  "http://localhost:8090/api/v1/auth/regenerate-qr-code";
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
