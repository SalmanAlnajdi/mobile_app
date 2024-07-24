import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import DonationCard from "../../components/DonationCard";
import { getListsByUser } from "../../apis/donations";
import { useQuery } from "@tanstack/react-query";

const HomeDonatios = () => {
  const navigation = useNavigation();

  const { data: listsByUser } = useQuery({
    queryKey: ["listsByUser"],
    queryFn: getListsByUser,
  });

  console.log(listsByUser);
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
          {listsByUser?.map((list) => (
            <DonationCard donationList={list} key={list._id} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeDonatios;
