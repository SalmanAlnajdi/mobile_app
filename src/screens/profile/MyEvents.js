import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import MyEventsCard from "../../components/MyEventsCard";
import { useQuery } from "@tanstack/react-query";
import getAllEvents from "../../apis/events";

const MyEvents = () => {
  const { data: events } = useQuery({
    queryKey: ["getAllEvents"],
    queryFn: () => getAllEvents(),
  });
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1E1E2B",
        width: "100%",
        paddingBottom: 80,
      }}
    >
      <ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {events?.map((event) => (
            <MyEventsCard event={event} key={event._id} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default MyEvents;
