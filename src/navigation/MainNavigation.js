import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";

import HomeDonatios from "../screens/donation/HomeDonatios";
import profileNavigation from "./profileNavigation";

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />

      <Tab.Screen name="Profile" component={profileNavigation} />
      <Tab.Screen name="Donation" component={HomeDonatios} />
    </Tab.Navigator>
  );
};

export default MainNavigation;
