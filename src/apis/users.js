import instance from ".";

const getUserById = async (userId) => {
  const response = await instance.get("/user");
  console.log(response);
  return response.json();
};

export default getUserById;
