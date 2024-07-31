import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getUserById from "../apis/users";
import { deleteOrder } from "../apis/order";

const OrderCard = ({ order }) => {
  //   const [reId, setReId] = useState("");

  //   useEffect(() => {
  //     if (order.items.length > 0) {
  //       setReId(order.items[0].receiverId);
  //     }
  //   }, [order]);

  const queryClient = useQueryClient();

  const { data: receiverData } = useQuery({
    queryKey: ["getReceiver", order.receiver._id],
    queryFn: () => getUserById(order.receiver._id),
  });

  const { mutate } = useMutation({
    mutationFn: () => deleteOrder(order._id),
    onSuccess: () => {
      console.log("Order deleted successfully");
      queryClient.invalidateQueries(["getAllOrders"]);
      queryClient.invalidateQueries(["getReceiver", order.receiver._id]);
    },
    onError: (error) => {
      console.log("Error deleting order:", error);
    },
  });
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Order ID: {order._id}</Text>
      </View>

      <View style={styles.receiverInfo}>
        <Text style={styles.receiverName}>
          {receiverData?.firstName} {receiverData?.lastName}
        </Text>
        <Text style={styles.receiverPhone}>Phone: {receiverData?.phone}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.itemsContainer}>
          {order.items.map((item) => (
            <View key={item._id} style={styles.item}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            mutate();
          }}
        >
          <Text style={styles.completeButton}>Complete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#323048",
    borderRadius: 10,
    marginBottom: 10,
    marginLeft: 14,
    width: "90%",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#a0a0e0",
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  receiverInfo: {
    marginVertical: 10,
  },
  receiverName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  receiverPhone: {
    color: "#ccc",
    fontSize: 14,
  },
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    width: "45%",
    backgroundColor: "#29293E",
    margin: 5,
    padding: 5,
    borderRadius: 5,
  },
  itemImage: {
    width: "100%",
    height: 100,
    borderRadius: 5,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    color: "#fff",
  },
  itemDescription: {
    fontSize: 12,
    color: "#555",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  completeButton: {
    color: "#a0a0e0",
    fontSize: 14,
    borderColor: "#a0a0e0",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
});
