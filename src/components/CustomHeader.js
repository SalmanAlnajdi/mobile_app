// CustomHeader.js
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const CustomHeader = ({ username, profileImage }) => {
  return (
    <View
      style={{ flexDirection: "Column", alignItems: "center", padding: 10 }}
    >
      <Image
        source={{ uri: profileImage }}
        style={{ width: 75, height: 75, borderRadius: 20, marginRight: 10 }}
      />
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{username}</Text>
    </View>
  );
};

export default CustomHeader;
