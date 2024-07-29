import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeDonatios from "../../screens/donation/HomeDonatios";
import AddDonationList from "../../screens/donation/AddDonationList";
import DonationDetail from "../../screens/donation/DonationDetail";
import AddDonationItems from "../../screens/donation/AddDonationItems";
import DonationConfirm from "../../screens/donation/DonationConfirm";
import LogoTitle from "../../components/LogoTitle";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";

const Stack = createStackNavigator();
const DonationNavigation = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      initialRouteName="HomeDonatios"
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
        name="HomeDonatios"
        component={HomeDonatios}
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
        name="AddDonationList"
        component={AddDonationList}
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
      <Stack.Screen
        name="DonationDetail"
        component={DonationDetail}
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
      <Stack.Screen
        name="AddDonationItems"
        component={AddDonationItems}
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
      <Stack.Screen
        name="DonationConfirm"
        component={DonationConfirm}
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

export default DonationNavigation;
