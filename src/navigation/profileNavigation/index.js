import React, { useContext, useEffect, useState } from "react";
import ProfilePage from "../../screens/profile/ProfilePage";
import MyEvents from "../../screens/profile/MyEvents";
import Donations from "../../screens/profile/Donations";
import FeedBack from "../../screens/profile/FeedBack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CustomHeader from "../../components/CustomHeader";
import { View } from "react-native";
import UserContext from "../../context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { myProfile } from "../../apis/auth";
import { BASE_URL } from "../../apis";

const Tab = createMaterialTopTabNavigator();
const ProfileNavigation = () => {
  const { user, setUser } = useContext(UserContext);

  const { data: userProfile } = useQuery({
    queryKey: ["getMyProfile"],
    queryFn: myProfile,
  });

  const username = userProfile?.username;
  const profileImage = `${BASE_URL}/${userProfile?.image}`;

  console.log(profileImage);

  return (
    <View style={{ flex: 1, backgroundColor: "#1E1E2B" }}>
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
        <Tab.Screen name="ProfilePage" component={ProfilePage} />
        <Tab.Screen name="MyEvents" component={MyEvents} />
        <Tab.Screen name="DonationsPage" component={Donations} />
        <Tab.Screen name="Feedback" component={FeedBack} />
      </Tab.Navigator>
    </View>
  );
};

export default ProfileNavigation;
