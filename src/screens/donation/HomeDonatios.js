import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import DonationCard from "../../components/DonationCard";
import { getListsByUser } from "../../apis/donations";
import { useQuery } from "@tanstack/react-query";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

const HomeDonatios = () => {
  const navigation = useNavigation();

  const { data: listsByUser } = useQuery({
    queryKey: ["listsByUser"],
    queryFn: getListsByUser,
  });

  console.log(listsByUser);
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1E1E2B",
      }}
    >
      <View
        style={{
          height: 100,
          width: "100%",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          paddingTop: 40,
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddDonationList");
          }}
        >
          <LinearGradient
            colors={["#4D81D3", "#9765B5"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              padding: 5,
              borderRadius: 10,
              margin: 16,
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="create" size={24} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: "100%",
          width: "100%",
          borderBlockColor: "red",
          paddingBottom: 150,
        }}
      >
        <ScrollView
          style={{
            width: "100%",
            height: "100%",
            flexWrap: "wrap",
          }}
        >
          {listsByUser?.map((list) => (
            <DonationCard donationList={list} key={list._id} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeDonatios;
