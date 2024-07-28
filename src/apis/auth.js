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
  try {
    const formData = new FormData();
    for (let key in userInfo) {
      if (userInfo[key] !== null) {
        if (key === "image") {
          console.log(userInfo[key]);

          formData.append(key, {
            uri: userInfo[key],
            type: "image/png",
            name: "image.png",
          });
        } else {
          formData.append(key, userInfo[key]);
        }
      }
    }
    const { data } = await instance.put("/user/myprofile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
  }
  // const { data } = await instance.put("/user/myprofile", userInfo);
  // return data;
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
