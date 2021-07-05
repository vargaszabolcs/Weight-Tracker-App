import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const instance = axios.create({
  baseURL: "http://192.168.0.197:3000"
});

instance.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;