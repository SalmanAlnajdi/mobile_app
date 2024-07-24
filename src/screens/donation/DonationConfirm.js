import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getListById } from "../../apis/donations";

const DonationConfirm = ({ route }) => {
  const { listId } = route.params;

  const { data } = useQuery({
    queryKey: ["list", getListById],
    queryFn: () => getListById(userId),
  });

  return (
    <View>
      <Text>{listId}</Text>
    </View>
  );
};

export default DonationConfirm;

const styles = StyleSheet.create({});
