import instance from ".";

const getAllOrders = async () => {
  const { data } = await instance.get("/order");
  return data;
};

export const deleteOrder = async (orderId) => {
  const { data } = await instance.delete(`/order/${orderId}`);
  return data;
};

export default getAllOrders;
