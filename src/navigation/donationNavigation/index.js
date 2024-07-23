import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeDonatios from "../../screens/donation/HomeDonatios";
import AddDonationList from "../../screens/donation/AddDonationList";
import DonationDetail from "../../screens/donation/DonationDetail";

const Stack = createStackNavigator();
const DonationNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeDonatios"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeDonatios" component={HomeDonatios} />
      <Stack.Screen name="AddDonationList" component={AddDonationList} />
      <Stack.Screen name="DonationDetail" component={DonationDetail} />
    </Stack.Navigator>
  );
};

export default DonationNavigation;
