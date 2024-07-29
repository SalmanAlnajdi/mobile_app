import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const LogoTitle = () => {
  return (
    <Image
      source={require("../assets/Gadha-logo-co.png")}
      style={{ width: 75, height: 75 }}
    />
  );
};

export default LogoTitle;
