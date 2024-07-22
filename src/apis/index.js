import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.0.149:8000",
});

export default instance;
