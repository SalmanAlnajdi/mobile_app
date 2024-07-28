import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const FeedBackCard = () => {
  return (
    <View style={styles.card}>
      {/* <Image source={{ uri: event.image }} style={styles.image} /> */}
      <View style={styles.content}>
        {/* <Text style={styles.status}>Live</Text> */}
        <Text style={styles.title}>event.name</Text>

        <Text style={styles.description}>event.description</Text>
        <Text style={styles.owner}>Created by: event?.owner?.username</Text>
        <TouchableOpacity
        //   onPress={() => {
        //     navigation.navigate("EventDetail", { event });
        //   }}
        >
          <Text style={styles.seeMore}>...see more</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#323048",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  image: {
    width: 350,
    height: 150,
  },
  content: {
    padding: 15,
  },
  status: {
    color: "#a0a0e0",
    fontSize: 14,
    fontWeight: "bold",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },
  location: {
    color: "#ccc",
    fontSize: 16,
    marginVertical: 5,
  },
  description: {
    color: "#ddd",
    fontSize: 14,
    marginVertical: 10,
  },
  owner: {
    color: "#bbb",
    fontSize: 14,
    marginBottom: 5,
  },
  date: {
    color: "#bbb",
    fontSize: 14,
  },
  time: {
    color: "#bbb",
    fontSize: 14,
    marginBottom: 10,
  },
  seeMore: {
    color: "#a0a0e0",
    fontSize: 14,
    textAlign: "right",
  },
});

export default FeedBackCard;
