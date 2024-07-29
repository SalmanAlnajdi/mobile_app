// src/navigation/CustomDrawerContent.js
import React from "react";
import { View, Button, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { logout } from "../apis/auth";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const CustomDrawerContent = (props) => {
  const [user, setUser] = useContext(UserContext);
  const handleLogout = () => {
    logout();
    setUser(false);
    props.navigation.navigate("Login");
  };
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <TouchableOpacity
        onPress={handleLogout}
        style={styles.logoutButtonContainer}
      >
        <LinearGradient
          colors={["#4D81D3", "#ff3333"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.linearGradientButton}
        >
          <Text style={styles.signInButtonText}>Logout</Text>
        </LinearGradient>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};
const styles = StyleSheet.create({
  linearGradientButton: {
    padding: 15,
    alignItems: "center",
    borderRadius: 20,
  },
  signInButtonText: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "white",
  },
  logoutButtonContainer: {
    marginHorizontal: 20,
    marginTop: 10,
  },
});

export default CustomDrawerContent;
