// CustomHeader.js
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const CustomHeader = ({ username, profileImage }) => {
  return (
    <View
      style={{
        flexDirection: "Column",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#1E1E2B",
      }}
    >
      <LinearGradient
        colors={["#4D81D3", "#9765B5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          width: 150,
          height: 150,
          borderRadius: "100%",
          backgroundColor: "#9765B5",
          alignItems: "center",
          justifyContent: "center",
          padding: 5,
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#1E1E2B",
          }}
        >
          <Image
            source={{ uri: profileImage }}
            style={{
              width: "90%",
              height: "90%",
              borderRadius: "100%",
            }}
          />
        </View>
      </LinearGradient>
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
        {username}
      </Text>
    </View>
  );
};

export default CustomHeader;
