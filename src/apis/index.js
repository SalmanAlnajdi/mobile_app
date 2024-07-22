import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.0.124:8000",
});

export default instance;
