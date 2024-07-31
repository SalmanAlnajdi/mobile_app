import { ScrollView, Text, View } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import getAllOrders from "../../apis/order";
import { useNavigation } from "@react-navigation/native";
import OrderCard from "../../components/OrderCard";

const Donations = () => {
  const navigation = useNavigation();

  const { data: orders } = useQuery({
    queryKey: ["getAllOrders"],
    queryFn: () => getAllOrders(),
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1E1E2B",
      }}
    >
      <ScrollView>
        {orders?.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
        {/* {orders?.map((order) => (
        <View key={order._id}>
        <Text>{order._id}</Text>
        {order.items.map((item) => (
            <View key={item._id}>
            <Text>{item.image}</Text>
            <Text>{item.name}</Text>
              <Text>{item.description}</Text>
              </View>
              ))}
              </View>
              ))} */}
      </ScrollView>
    </View>
  );
};

export default Donations;
