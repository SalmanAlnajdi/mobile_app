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
    });

    console.log("Response:", res);
    return res.data;
  } catch (error) {
    console.error("Error creating donatition:", error);
    throw error;
  }
};

export { createDonation, getAllDonation };
