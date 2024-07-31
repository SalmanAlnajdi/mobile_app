import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import FeedBackCard from "../../components/FeedBackCard";

const FeedBack = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1E1E2B",
        paddingBottom: 80,
        width: "100%",
      }}
    >
      <ScrollView style={{ width: "90%" }}>
        <FeedBackCard />
      </ScrollView>
    </View>
  );
};

export default FeedBack;
