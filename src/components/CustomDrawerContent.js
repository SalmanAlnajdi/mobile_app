// src/navigation/CustomDrawerContent.js
import React from "react";
import { View, Button } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { logout } from "../apis/auth";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "@react-navigation/native";

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
      <DrawerItem
        label="Logout"
        onPress={handleLogout}
        style={{ backgroundColor: "#d90429" }}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
