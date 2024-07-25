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
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: { fontSize: 8.5, fontWeight: "bold" },
          tabBarStyle: {
            backgroundColor: "#1e1e2b",
            marginStart: 20,
            marginEnd: 20,
            height: 50,
            borderRadius: 20,
            shadowColor: "white",
            shadowOffset: 30,
          },

          tabBarActiveTintColor: "black",
        }}
      >
        <Tab.Screen name="HomeIndex" component={homeNavigation} />

        <Tab.Screen name="ProfileIndex" component={profileNavigation} />
        <Tab.Screen name="DonationIndex" component={donationNavigation} />
      </Tab.Navigator>
    </View>
  );
};

export default MainNavigation;
