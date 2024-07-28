import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
  DrawerContent,
  DrawerItem,
} from "@react-navigation/drawer";
import Settings from "../screens/settings";
import MainNavigation from "./MainNavigation";
import Help from "../screens/Help";
import { useNavigation } from "@react-navigation/native";
import { logout } from "../apis/auth";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { StyleSheet, Text, View, Button } from "react-native";

import CustomDrawerContent from "../components/CustomDrawerContent";

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: "right",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="app" component={MainNavigation} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Help" component={Help} />
    </Drawer.Navigator>
  );
};

export default DrawerNav;
