import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const EventCard = () => {
  const navigation = useNavigation();
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
      <Text>EventCard</Text>
      <Button
        title="View Details"
        onPress={() => {
          navigation.navigate("EventDetail");
        }}
      />
    </View>
  );
};

export default EventCard;

const styles = StyleSheet.create({});
