import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";

import profileNavigation from "./profileNavigation";
import homeNavigation from "./homeNavigation";

import donationNavigation from "./donationNavigation";

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeIndex" component={homeNavigation} />

      <Tab.Screen name="ProfileIndex" component={profileNavigation} />
      <Tab.Screen name="DonationIndex" component={donationNavigation} />
    </Tab.Navigator>
  );
};

export default MainNavigation;
