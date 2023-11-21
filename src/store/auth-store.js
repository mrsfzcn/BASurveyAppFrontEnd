import { encrypt } from "../utils/encrypt";

class LocalStorageServiceAuth{    

    getToken(){
        return localStorage.getItem("token")
    }

    setToken(token){
        localStorage.setItem("token", token);
    }
    getAuthToken(){
        return localStorage.getItem("auth")
    }


    setAuthToken(){
        localStorage.setItem("auth", encrypt("true"));
    }
    

    removeToken(){
        localStorage.removeItem("token")
    }
    removeAuthToken(){
        localStorage.removeItem("auth")
    }

    clearLocalStorage(){
        localStorage.clear()
    }
    
}

export default new LocalStorageServiceAuth();