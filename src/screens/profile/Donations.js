
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
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E2B",
    paddingTop: 50,
  },
  searchContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 7,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#4583D5",
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 8,
    backgroundColor: "#1E1E2B",
    color: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  searchButton: {
    borderRadius: 10,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Donations;
