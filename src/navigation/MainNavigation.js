import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import NavBar from "../components/NavBar";
import profileNavigation from "./profileNavigation";
import donationNavigation from "./donationNavigation";
import HomeNavigation from "./homeNavigation";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* <NavBar /> */}
      <View
        style={{
          flex: 1,
          backgroundColor: "#1e1e2b",
        }}
      >
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              borderTopWidth: 0,
              flexDirection: "row",
              paddingRight: -20,
              paddingLeft: -20,
              backgroundColor: "#1e1e2b",
              width: "90%",
              height: 70,
              borderRadius: 50,
              shadowColor: "white",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 10,
              elevation: 10,
              position: "absolute",
              left: "5%",
              bottom: "1%",
              alignSelf: "center",
            },
            tabBarActiveTintColor: "white",
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let backgroundColor = focused ? "#FFFFFF2B" : "#FFFFFF0B";

              if (route.name === "Main") {
                iconName = "home";
              } else if (route.name === "ProfileIndex") {
                iconName = "user";
              } else if (route.name === "DonationIndex") {
                iconName = "hand-holding-heart";
              }

              return (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    top: 14,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: backgroundColor,
                      borderRadius: 25,
                      justifyContent: "center",
                      alignItems: "center",
                      width: 50,
                      height: 50,
                    }}
                  >
                    <FontAwesome5
                      name={iconName}
                      size={size}
                      color={focused ? "white" : "gray"}
                    />
                  </View>
                </View>
              );
            },
          })}
        >
          <Tab.Screen name="Main" component={HomeNavigation} />
          <Tab.Screen name="ProfileIndex" component={profileNavigation} />
          <Tab.Screen name="DonationIndex" component={donationNavigation} />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default MainNavigation;
