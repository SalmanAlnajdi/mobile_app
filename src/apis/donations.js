import instance from ".";

const getAllDonation = async () => {
  const { data } = await instance.get("/donation");

  return data;
};

const createDonation = async (donation, image) => {
  const formData = new FormData();

  formData.append("image", image);
  try {
    const res = await instance.post("/donation", {
      name: donation.name,
      description: donation.description,
      condition: donation.condition,
      listId: donation.listId,
    });

    console.log("Response:", res);
    return res.data;
  } catch (error) {
    console.error("Error creating donatition:", error);
    throw error;
  }
};

const createList = async (donationList) => {
  const formData = new FormData();
  for (const key in donationList) {
    formData.append(key, donationList[key]);
  }

  try {
    const res = await instance.post("/donation/list", donationList);
    return res.data;
  } catch (error) {
    console.error("Error creating list:", error);
    throw error;
  }
};

const deleteList = async (listId) => {
  try {
    const res = await instance.delete(`/donation/deletelist/${listId}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting list:", error);
    throw error;
  }
};

const getAllLists = async () => {
  const { data } = await instance.get("/donation/list");
  return data;
};

// const getListById = async (listId) => {
//   const { data } = await instance.get(`/donation/list/${listId})`);
//   return data;
// };

const getListById = async (listId) => {
  try {
    const response = await instance.get(`/donation/list/${listId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error(`List with ID ${listId} not found.`);
    }
    throw new Error(`Fetching list failed: ${error.message}`);
  }
};

const getListsByUser = async () => {
  const { data } = await instance.get("/donation/listbyuser");
  return data;
};

export {
  createDonation,
  getAllDonation,
  createList,
  getAllLists,
  getListsByUser,
  getListById,
  deleteList,
};