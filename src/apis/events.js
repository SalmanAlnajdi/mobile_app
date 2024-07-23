import instance from ".";

const getAllEvents = async () => {
  const { data } = await instance.get("/event/");
  return data;
};

export default getAllEvents;
