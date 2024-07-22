import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import EventCard from "../../components/EventCard";
import { useNavigation } from "@react-navigation/native";
import DonationCard from "../../components/DonationCard";

const HomeDonatios = () => {
  const navigation = useNavigation();
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 30 }}>HomeDonatios</Text>
      <Button
        title=" Add Donate List + "
        onPress={() => {
          navigation.navigate("AddDonationList");
        }}
      ></Button>
      <View
        style={{
          height: "80%",
          width: "100%",
          borderBlockColor: "red",
        }}
      >
        <ScrollView style={{ width: "100%", height: "100%", flexWrap: "wrap" }}>
          <DonationCard />
          <DonationCard />
          <DonationCard />
          <DonationCard />
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeDonatios;
