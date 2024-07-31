import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BASE_URL } from "../apis";
import { LinearGradient } from "expo-linear-gradient";
import Dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";

const MyEventsCard = ({ event }) => {
  // console.log(JSON.stringify(event));
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: `${BASE_URL}/${event.image}` }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.useravatar}>
          {/* <LinearGradient
            colors={["#4D81D3", "#9765B5"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.avatarGradient}
          > */}
          {/* <Image
              source={{ uri: `${BASE_URL}/${event.owner.image}` }}
              style={styles.ownerImage}
            /> */}
          {/* </LinearGradient> */}
          {/* <Text style={styles.owner}> {event?.owner?.username}</Text> */}
        </View>
        <Text style={styles.title}>{event.name}</Text>
        {/* <View style={styles.infoBox}>
          <Text style={styles.location}> {event.address}</Text>
        </View> */}
        {/* <Text style={styles.description}>{event.description}</Text>
        <Text style={styles.date}>
          {Dayjs(event.date).format("dddd DD-MM-YYYY")}
        </Text> */}
        {/* <Text style={styles.time}>
          From {event.startTime} To {event.endTime}
        </Text> */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EventDetail", { event });
          }}
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
    height: 150,
    width: "100%",
  },
  image: {
    width: "100%",
    height: 80,
  },
  content: {
    padding: 5,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },
  location: {
    color: "#BFCEE1",
    fontSize: 16,
    marginVertical: 5,
  },
  description: {
    color: "#ddd",
    fontSize: 14,
    marginVertical: 10,
  },
  owner: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  date: {
    color: "#bbb",
    fontSize: 14,
  },
  time: {
    color: "#bbb",
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 4,
  },
  seeMore: {
    color: "#a0a0e0",
    fontSize: 14,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 50,
    marginBottom: 10,
    width: 200,
    height: 30,
  },
  useravatar: {
    flexDirection: "row",
    alignItems: "center",
    width: 300,
    height: 5,
  },
  avatarGradient: {
    width: 43,
    height: 43,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  ownerImage: {
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: "white",
  },
});

export default MyEventsCard;
