import React from "react";

const getAllEvents = async () => {
  const { data } = await instance.get("/event");

  return data;
};

export default getAllEvents;
