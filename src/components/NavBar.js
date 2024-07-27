import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { logout } from "../apis/auth";
import UserContext from "../context/UserContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const NavBar = ({ showBackArrow }) => {
  const [user, setUser] = useContext(UserContext);
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            marginLeft: 10,
          }}
        >
          <Ionicons name="chevron-back" size={30} color="white" />
        </Pressable>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../assets/Gadha-logo-co.png")}
          style={{ width: 75, height: 75 }}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-end",
          paddingRight: 15,
        }}
      >
        <View
          style={{
            backgroundColor: "#FFFFFF0B",
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
            width: 40,
            height: 40,
          }}
        >
          <Pressable
            onPress={() => {
              logout();
              setUser(false);
            }}
          >
            <Ionicons name="settings-sharp" size={24} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default NavBar;
