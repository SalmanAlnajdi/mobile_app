import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const DonationCard = ({ donationList }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.title}>
          List name: {donationList.name ? donationList.name : "no name"}
        </Text>
        <Text style={styles.title}>
          {/* list created by : {donationList.createBy.username} */}
        </Text>
        {/* <Text style={styles.title}>{donationList._id}</Text> */}

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("DonationDetail", { donationList });
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
    marginBottom: 10,
    marginLeft: 14,
    width: 400,
    height: 80,
  },

  content: {
    padding: 15,
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },

  seeMore: {
    color: "#a0a0e0",
    fontSize: 14,
    textAlign: "right",
  },
});
export default DonationCard;
