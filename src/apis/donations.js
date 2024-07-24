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
    const res = await instance.post("/donation/list");
    return res.data;
  } catch (error) {
    console.error("Error creating list:", error);
    throw error;
  }
};

const getAllLists = async () => {
  const { data } = await instance.get("/donation/list");
  return data;
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
};
