import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.8.129:8000",
});

instance.interceptors.request.use((config) => {
  const token = AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `bearer ${token}`;
  }
  return config;
});

export default instance;
