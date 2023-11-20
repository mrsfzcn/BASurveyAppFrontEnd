// axiosInstance.js

import axios from "axios";

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
        window.location.href="/giris";
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
        localStorage.removeItem("token"); // token'ı sil
        localStorage.removeItem("auth"); // protected route'ta tutulan auth başlığını sil
        window.location.href="/giris"; // Yetkisiz erişim durumunda login sayfasına yönlendir
        return Promise.reject(new Error("Yetki hatası"));
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// URL -> .env dosyasına göre revize edildi.
const BASE_URL = import.meta.env.VITE_BASE_URL;
const baseURL = `${BASE_URL}/api/v1`;

const axiosInstanceGlobal = axiosInstance(`${baseURL}`);

export {
  axiosInstanceGlobal,
};
