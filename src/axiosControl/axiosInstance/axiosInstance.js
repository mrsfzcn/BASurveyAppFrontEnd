// axiosInstance.js

import axios from "axios";
import { useNavigate } from "react-router-dom";

const axiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token && token.trim() !== "") {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.error("Yetki hatası");
        return Promise.reject(new Error("Yetki hatası"));
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401 || error.response.status === 403) {
        console.error("Yetki hatası");
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("Token not found");
          return;
        }
        localStorage.removeItem("token");
        const navigate = useNavigate();
        navigate("/login"); // Yetkisiz erişim durumunda login sayfasına yönlendir
        return Promise.reject(new Error("Yetki hatası"));
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

const baseURL = "http://localhost:8090/api/v1";

const axiosInstanceGlobal = axiosInstance(`${baseURL}`);

export {
  axiosInstanceGlobal,
};
