import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import MyEventsCard from "../../components/MyEventsCard";

const MyEvents = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1E1E2B",
        paddingBottom: 80,
      }}
    >
      <ScrollView>
        <MyEventsCard />
        <MyEventsCard />
        <MyEventsCard />
      </ScrollView>
    </View>
  );
};

export default MyEvents;
