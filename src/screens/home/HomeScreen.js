import { ScrollView, Text, View } from "react-native";
import React from "react";
import EventCard from "../../components/EventCard";

const HomeScreen = () => {
  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 30 }}>HomeScreen</Text>
        <ScrollView
          style={{
            height: "100%",
            width: "90%",
            backgroundColor: "red",
            flexWrap: "wrap",
            flexDirection: "column",

            padding: 20,
          }}
        >
          <EventCard />
          <EventCard />
          <EventCard />
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;
