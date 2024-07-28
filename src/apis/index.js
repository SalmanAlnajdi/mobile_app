import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const BASE_URL = "http://172.20.10.2:8000";

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export { BASE_URL };
export default instance;
