import instance from ".";

const getAllEvents = async () => {
  const { data } = await instance.get("/event/");
  console.log(data);
  return data;
};

export default getAllEvents;
