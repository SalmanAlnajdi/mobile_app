import instance from ".";
import AsyncStorage from "@react-native-async-storage/async-storage";

const checkToken = () => {
  const token = AsyncStorage.getItem("token");
  if (token) {
    return true;
  }
  return false;
};
const storeToken = async (token) => {
  await AsyncStorage.setItem("token", token);
};

const login = async (userInfo) => {
  console.log(userInfo);
  const formData = new FormData();
  for (const key in userInfo) {
    formData.append(key, userInfo[key]);
  }

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
  storeToken(data.token);
  return data;
};

const logout = async () => {
  await AsyncStorage.removeItem("token");
};

const myProfile = async () => {
  const { data } = await instance.get("/user/myprofile");
  console.log("auth myprofile", data);
  return data;
};

const updateProfile = async (userInfo) => {
  const token = AsyncStorage.getItem("token");
  const { data } = await instance.put("/user/myprofile", userInfo, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export {
  checkToken,
  storeToken,
  login,
  register,
  logout,
  myProfile,
  updateProfile,
};
