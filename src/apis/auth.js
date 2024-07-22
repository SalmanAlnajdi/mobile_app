import instance from ".";
import AsyncStorage from "@react-native-async-storage/async-storage";

const checkToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  }
  return false;
};
const storeToken = async (token) => {
  await AsyncStorage.setItem("token", token);
};

const login = async (userInfo) => {
  const { data } = await instance.post("/user/signin", userInfo);

  storeToken(data.token);
  return data;
};

const register = async (userInfo) => {
  const formData = new FormData();
  for (const key in userInfo) {
    formData.append(key, userInfo[key]);
  }

  const { data } = await instance.post("/user/signup", userInfo);
  storeToken(data);
  return data;
};

export { checkToken, storeToken, login, register };
