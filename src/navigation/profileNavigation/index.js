import React from "react";
import ProfilePage from "../../screens/profile/ProfilePage";
import MyEvents from "../../screens/profile/MyEvents";
import Donations from "../../screens/profile/Donations";
import FeedBack from "../../screens/profile/FeedBack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CustomHeader from "../../components/CustomHeader";
import { View } from "react-native";

const Tab = createMaterialTopTabNavigator();
const profileNavigation = () => {
  const username = "Salman";
  const profileImage =
    "data:image/png;base64,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";
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader username={username} profileImage={profileImage} />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 8.5, fontWeight: "bold" },
          tabBarStyle: {
            backgroundColor: "lightgrey",
            marginStart: 20,
            marginEnd: 20,
            height: 50,
            borderRadius: 20,
          },

          tabBarActiveTintColor: "black",
        }}
      >
        <Tab.Screen name="Profile" component={ProfilePage} />
        <Tab.Screen name="MyEvents" component={MyEvents} />
        <Tab.Screen name="Donations" component={Donations} />
        <Tab.Screen name="Feedback" component={FeedBack} />
      </Tab.Navigator>
    </View>
  );
};

export default profileNavigation;
