import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";

import profileNavigation from "./profileNavigation";
import homeNavigation from "./homeNavigation";

import donationNavigation from "./donationNavigation";

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={homeNavigation} />

      <Tab.Screen name="Profile" component={profileNavigation} />
      <Tab.Screen name="Donation" component={donationNavigation} />
    </Tab.Navigator>
  );
};

export default MainNavigation;
