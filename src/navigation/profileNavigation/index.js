import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfilePage from "../../screens/profile/ProfilePage";

const Stack = createStackNavigator();
const profileNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfilePage" component={ProfilePage} />
    </Stack.Navigator>
  );
};

export default profileNavigation;
