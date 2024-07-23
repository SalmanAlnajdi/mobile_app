import instance from ".";

const getUserById = async (userId) => {
  try {
    const response = await instance.get(`/user/myprofile/${userId}`);
    console.log(response.data);

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error(`User with ID ${userId} not found.`);
    }
    throw new Error(`Fetching user failed: ${error.message}`);
  }
};

export default getUserById;
