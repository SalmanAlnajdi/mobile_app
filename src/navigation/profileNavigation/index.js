// import React, { useContext, useEffect, useState } from "react";
// import ProfilePage from "../../screens/profile/ProfilePage";
// import MyEvents from "../../screens/profile/MyEvents";
// import Donations from "../../screens/profile/Donations";
// import FeedBack from "../../screens/profile/FeedBack";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import CustomHeader from "../../components/CustomHeader";
// import { View } from "react-native";
// import UserContext from "../../context/UserContext";
// import { useQuery } from "@tanstack/react-query";
// import { myProfile } from "../../apis/auth";

// const Tab = createMaterialTopTabNavigator();
// const ProfileNavigation = () => {
//   const { user, setUser } = useContext(UserContext);

//   const { data: userProfile } = useQuery({
//     queryKey: ["getMyProfile"],
//     queryFn: myProfile,
//   });

//   const username = userProfile?.username;
//   // const profileImage = `http://192.168.0.149:8000/${userProfile?.image}`;
//   const profileImage =
//     "https://www.pngitem.com/pimgs/m/404-4042710_circle-profile-picture-png-transparent-png.png";

//   return (
//     <View style={{ flex: 1, backgroundColor: "#1E1E2B" }}>
//       <CustomHeader username={username} profileImage={profileImage} />
//       <Tab.Navigator
//         screenOptions={{
//           tabBarLabelStyle: {
//             fontSize: 8.5,
//             fontWeight: "bold",
//             color: "#95AFD2",
//             textTransform: "capitalize",
//           },
//           tabBarStyle: {
//             backgroundColor: "#1e1e2b",
//             marginStart: 10,
//             marginEnd: 10,
//             height: 50,
//             borderRadius: 10,
//           },

//           tabBarIndicatorStyle: {
//             backgroundColor: "#1e1e2b",
//           },

//           tabBarItemStyle: {
//             borderRadius: 10,
//             gap: 10,
//             borderColor: "#95AFD2",
//             borderWidth: 1,
//             backgroundColor: "#1e1e2b",
//           },

//           tabBarActiveTintColor: "#95AFD2",
//           tabBarInactiveTintColor: "#95AFD2",

//           headerShown: false,
//         }}
//       >
//         <Tab.Screen name="ProfilePage" component={ProfilePage} />
//         <Tab.Screen name="MyEvents" component={MyEvents} />
//         <Tab.Screen name="DonationsPage" component={Donations} />
//         <Tab.Screen name="Feedback" component={FeedBack} />
//       </Tab.Navigator>
//     </View>
//   );
// };

// export default ProfileNavigation;

import React from "react";
import { View, Text, Pressable } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfilePage from "../../screens/profile/ProfilePage";
import MyEvents from "../../screens/profile/MyEvents";
import Donations from "../../screens/profile/Donations";
import FeedBack from "../../screens/profile/FeedBack";
import CustomHeader from "../../components/CustomHeader";
import { useQuery } from "@tanstack/react-query";
import { myProfile } from "../../apis/auth";
import { BASE_URL } from "../../apis";
import UserContext from "../../context/UserContext";
import { LinearGradient } from "expo-linear-gradient";

const Tab = createMaterialTopTabNavigator();

const CustomTabBarButton = ({ children, onPress, accessibilityState }) => {
  const focused = accessibilityState.selected;

  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        margin: 5,
        borderRadius: 10,
        borderColor: "#95AFD2",
        borderWidth: 1,
        overflow: "hidden",
        height: 50,
      }}
    >
      <LinearGradient
        colors={focused ? ["#4D81D3", "#9765B5"] : ["#1e1e2b", "#1e1e2b"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </LinearGradient>
    </Pressable>
  );
};

const ProfileNavigation = () => {
  const { user, setUser } = React.useContext(UserContext);

  const { data: userProfile } = useQuery({
    queryKey: ["getMyProfile"],
    queryFn: myProfile,
  });

  const username = userProfile?.username;
  const profileImage = `${BASE_URL}/${userProfile?.image}`;
  // const profileImage = `${userProfile?.image}`;

  console.log("profile image", profileImage);

  return (
    <View style={{ flex: 1, backgroundColor: "#1E1E2B" }}>
      <CustomHeader username={username} profileImage={profileImage} />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 8.5,
            fontWeight: "bold",
            color: "#95AFD2",
            textTransform: "capitalize",
          },
          tabBarStyle: {
            backgroundColor: "#1e1e2b",
            marginStart: 10,
            marginEnd: 10,
            height: 50,
            borderRadius: 10,
            gap: 10,
          },
          tabBarIndicatorStyle: {
            backgroundColor: "#1e1e2b",
          },

          headerShown: false,
        }}
        tabBar={(props) => (
          <View style={{ flexDirection: "row" }}>
            {props.state.routes.map((route, index) => {
              const { options } = props.descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;

              const isFocused = props.state.index === index;

              const onPress = () => {
                const event = props.navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  props.navigation.navigate(route.name);
                }
              };

              return (
                <CustomTabBarButton
                  key={index}
                  onPress={onPress}
                  accessibilityState={{ selected: isFocused }}
                >
                  <Text
                    style={{
                      color: isFocused ? "#1e1e2b" : "#95AFD2",
                      fontSize: 8.5,
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                  >
                    {label}
                  </Text>
                </CustomTabBarButton>
              );
            })}
          </View>
        )}
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
