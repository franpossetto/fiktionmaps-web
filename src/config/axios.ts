import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";
import { auth } from "./firebase";

const axiosWithToken = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "/api/v1",
});

const axiosWithoutToken = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "/api/v1",
});

axiosWithToken.interceptors.request.use(
  async (config) => {
    const token = await auth.currentUser?.getIdToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosWithToken, axiosWithoutToken };
