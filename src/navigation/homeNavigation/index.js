import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/home/HomeScreen";
import EventDetail from "../../screens/home/EventDetail";

const Stack = createStackNavigator();
const homeNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="EventDetail" component={EventDetail} />
    </Stack.Navigator>
  );
};

export default homeNavigation;
