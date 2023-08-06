import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import { auth } from './firebase';

const _axios = axios.create({
  baseURL: 'http://localhost:8081/api/v1', 
});


_axios.interceptors.request.use(
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

export default _axios;
