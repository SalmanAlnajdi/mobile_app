import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/home/HomeScreen";
import EventDetail from "../../screens/home/EventDetail";
import NavBar from "../../components/NavBar";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DrawerActions } from "@react-navigation/native";
import LogoTitle from "../../components/LogoTitle";

const Stack = createStackNavigator();
const HomeNavigation = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1E1E2B",
          borderBottomWidth: 0,
        },
        headerTintColor: "white",
        headerTitleStyle: {
          color: "white",
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => (
            <View
              style={{
                backgroundColor: "#FFFFFF0B",
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
                width: 40,
                height: 40,
                marginEnd: 16,
              }}
            >
              <Pressable
                onPress={() => {
                  // <Drawer.openDrawer name={settings} component={settings} />;
                  navigation.dispatch(DrawerActions.openDrawer());
                  // DrawerActions.openDrawer();,
                }}
              >
                <Ionicons name="settings-sharp" size={24} color="white" />
              </Pressable>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="EventDetail"
        component={EventDetail}
        options={{
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <View
              style={{
                backgroundColor: "#FFFFFF0B",
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
                width: 40,
                height: 40,
                marginStart: 16,
              }}
            >
              <Ionicons name="chevron-back" size={30} color="white" />
            </View>
          ),
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => (
            <View
              style={{
                backgroundColor: "#FFFFFF0B",
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
                width: 40,
                height: 40,
                marginEnd: 16,
              }}
            >
              <Pressable
                onPress={() => {
                  // <Drawer.openDrawer name={settings} component={settings} />;
                  navigation.dispatch(DrawerActions.openDrawer());
                  // DrawerActions.openDrawer();,
                }}
              >
                <Ionicons name="settings-sharp" size={24} color="white" />
              </Pressable>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
