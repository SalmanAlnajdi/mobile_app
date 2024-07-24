import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const DonationDetail = ({ route }) => {
  const { donationList } = route.params;
  const navigation = useNavigation();

  return (
    <View>
      <Text>DonationDetail</Text>
      <Text>List name : {donationList.createBy.username}</Text>
      <Text>items donated </Text>
      {donationList.donationItemId.map((item, index) => (
        <View key={index}>
          <Text>
            {index + 1}.{item.name}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default DonationDetail;

const styles = StyleSheet.create({});
