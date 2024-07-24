import { StyleSheet, Text, View } from "react-native";
import React from "react";

const DonationDetail = ({ list }) => {
  return (
    <View>
      <Text>DonationDetail</Text>

      <Text>{list?.name}</Text>
    </View>
  );
};

export default DonationDetail;

const styles = StyleSheet.create({});
