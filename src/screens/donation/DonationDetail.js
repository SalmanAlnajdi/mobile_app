import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const DonationDetail = ({ route }) => {
  const { donationList } = route.params;
  const navigation = useNavigation();

  return (
    <View>
      <Text>DonationDetail</Text>
      <Text>List name : {donationList.name}</Text>
      <Text>items donated </Text>
      {donationList.donationItemId.map((item, index) => (
        <View key={index}>
          <Text>
            {index + 1}.{item.name}
          </Text>
        </View>
      ))}

      <Text>SHARE LINK</Text>
      <Text>{`localhost:3000/link/${donationList._id}`}</Text>
    </View>
  );
};

export default DonationDetail;

const styles = StyleSheet.create({});
