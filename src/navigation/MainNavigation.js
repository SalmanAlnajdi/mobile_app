import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";

import profileNavigation from "./profileNavigation";
import homeNavigation from "./homeNavigation";

import donationNavigation from "./donationNavigation";
import { View } from "react-native";
import NavBar from "../components/NavBar";

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <View style={{ flex: 1 }}>
      <NavBar />
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="HomeIndex" component={homeNavigation} />

        <Tab.Screen name="ProfileIndex" component={profileNavigation} />
        <Tab.Screen name="DonationIndex" component={donationNavigation} />
      </Tab.Navigator>
    </View>
  );
};

export default MainNavigation;
