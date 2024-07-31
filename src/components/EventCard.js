import { Button, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import getAllEvents from "../apis/events";
import { useQuery } from "@tanstack/react-query";
import getUserById from "../apis/users";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BASE_URL } from "../apis";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import location from "../assets/image.png";
import dayjs, { Dayjs } from "dayjs";
const EventCard = ({ event }) => {
  const navigation = useNavigation();
  // console.log(event.owner);
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: `${BASE_URL}/${event.image}` }}
        style={styles.image}
      />
      <View style={styles.content}>
        {/* <Text style={styles.status}>Live</Text> */}
        <View style={styles.useravatar}>
          <LinearGradient
            colors={["#4D81D3", "#9765B5"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              width: 43,
              height: 43,
              borderRadius: "100%",
              backgroundColor: "#9765B5",
              alignItems: "center",
              justifyContent: "center",
              padding: 5,
            }}
          >
            <Image
              source={{ uri: `${BASE_URL}/${event.owner.image}` }}
              style={{
                width: 35,
                height: 35,
                borderRadius: 50,
                backgroundColor: "white",
              }}
            />
          </LinearGradient>
          {/* <Text style={styles.owner}> {event?.owner?.username}</Text> */}
          <Text style={styles.title}>{event.name}</Text>
        </View>
        <View style={styles.infoBox}>
          <Image source={location} style={{ height: 16, width: 16 }} />
          {/* <FontAwesome name="map-marker" size={16} color="#4583D5" /> */}
          <Text style={styles.location}> {event.address}</Text>
        </View>
        <Text style={styles.description}>{event.description}</Text>

        <Text style={styles.date}>
          {dayjs(event.date).format(" dddd DD-MM-YYYY")}
        </Text>
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
  },
  image: {
    width: 400,
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
    textAlign: "right",
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    // backgroundColor: "#29293E",
    borderRadius: 10,
    marginLeft: 50,
    marginBottom: 10,
    width: 200,
    height: 30,
    paddingEnd: 20,
  },
  useravatar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "normal",
    width: 300,
    height: 30,
    gap: 10,
  },
});
export default EventCard;
