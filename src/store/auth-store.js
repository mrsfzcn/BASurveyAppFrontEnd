import { encrypt } from "../utils/encrypt";

class LocalStorageServiceAuth {

    getToken() {
        return localStorage.getItem("token")
    }

    setToken(token) {
        localStorage.setItem("token", token);
    }

    getIsAuthenticated() {
        return localStorage.getItem("auth")
    }

    setIsAuthenticated() {
        localStorage.setItem("auth", encrypt("true"));
    }

    removeToken() {
        localStorage.removeItem("token")
    }

    removeIsAuthenticated() {
        localStorage.removeItem("auth")
    }

    clearLocalStorage() {
        localStorage.clear()
    }
}
export default new LocalStorageServiceAuth();