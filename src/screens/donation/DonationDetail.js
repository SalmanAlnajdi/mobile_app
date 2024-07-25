import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteList } from "../../apis/donations";

const DonationDetail = ({ route }) => {
  const { donationList } = route.params;
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const { mutate: deleteListMutation } = useMutation({
    mutationKey: ["deleteList"],
    mutationFn: (listId) => deleteList(listId),
    onSuccess: () => {
      console.log("List deleted successfully");
      queryClient.invalidateQueries(["listsByUser"]);
      navigation.navigate("HomeDonatios");
    },
  });

  const deleteListHandler = () => {
    // deleteList.mutate(donationList._id);
    deleteListMutation(donationList._id);
  };

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

      <TouchableOpacity
        style={{
          backgroundColor: "red",
          padding: 10,
          height: 50,
          justifyContent: "center",
          alignItems: "center",

          borderRadius: 24,
        }}
        onPress={deleteListHandler}
      >
        <Text>Delete The List</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DonationDetail;
