import { Button, Image, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import getAllEvents from "../apis/events";
import { useQuery } from "@tanstack/react-query";
import getUserById from "../apis/users";

const EventCard = ({ event }) => {
  const navigation = useNavigation();
  // const {
  //   data: user,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["user", event.owner],
  //   queryFn: () => getUserById(event.owner),
  // });

  // console.log("User Data:", user);
  // console.log("Error:", error);

  // if (isLoading) {
  //   return <Text>Loading...</Text>;
  // }

  // if (error) {
  //   return <Text>Error loading user details</Text>;
  // }

  return (
    <View
      style={{
        height: 250,
        width: 300,
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid black",

        padding: 10,
        borderRadius: 24,
        backgroundColor: "gray",

        margin: 10,
      }}
    >
      <Text>Created by: {event?.owner?.username}</Text>
      {/* <Text>Created by2: {user?.username}</Text> */}
      <Text>Event Card</Text>
      <Text>{event.name}</Text>
      <Text>{event.description}</Text>
      <Text>{event.date}</Text>
      <Text>{event.time}</Text>
      <Text>{event.location}</Text>
      <Text>{event.image}</Text>
      <Button
        title="View Details"
        onPress={() => {
          navigation.navigate("EventDetail", { event });
        }}
      />
    </View>
  );
};

export default EventCard;
