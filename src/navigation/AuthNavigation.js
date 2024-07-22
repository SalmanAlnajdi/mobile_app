import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/landingPages/Login";
import Register from "../screens/landingPages/Register";
import MainNavigation from "./MainNavigation";

const Stack = createStackNavigator();
const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Main" component={MainNavigation} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
