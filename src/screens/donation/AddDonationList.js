import { StyleSheet, Text, View } from "react-native";
import React from "react";

const AddDonationList = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 30 }}>DonationList</Text>
      <Text style={{ fontSize: 20, color: "red" }}>Add Donation Item</Text>
    </View>
  );
};

export default AddDonationList;
