import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";

const ProfilePage = () => {
  const { data: user } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => myProfile(),
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
      }}
    >
      <Text>ProfilePage</Text>
      <Text>{console.log(user?.username)}</Text>
    </View>
  );
};

export default ProfilePage;
