import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeDonatios from "../../screens/donation/HomeDonatios";
import AddDonationList from "../../screens/donation/AddDonationList";
import DonationDetail from "../../screens/donation/DonationDetail";
import AddDonationItems from "../../screens/donation/AddDonationItems";

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
      <Stack.Screen name="AddDonationItems" component={AddDonationItems} />
    </Stack.Navigator>
  );
};

export default DonationNavigation;
