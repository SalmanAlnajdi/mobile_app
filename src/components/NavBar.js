import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { logout } from "../apis/auth";
import UserContext from "../context/UserContext";

const NavBar = () => {
  const [user, setUser] = useContext(UserContext);
  return (
    <View
      style={{ flexDirection: "row", alignItems: "space-between", padding: 10 }}
    >
      <Text>NavBar</Text>
      <Pressable
        onPress={() => {
          logout();
          setUser(false);
        }}
      >
        <Text>LOGOUT</Text>
      </Pressable>
    </View>
  );
};

export default NavBar;
