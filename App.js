import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AuthNavigation from "./src/navigation/AuthNavigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { checkToken } from "./src/apis/auth";
import UserContext from "./src/context/UserContext";
import MainNavigation from "./src/navigation/MainNavigation";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Drawer } from "react-native-paper";
import settings from "./src/screens/settings";
import DrawerNav from "./src/navigation/drawerNav";

export default function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (checkToken()) {
      setUser(true);
    }
  }, []);

  return (
    <QueryClientProvider client={new QueryClient()}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#1E1E2B" }}>
          <UserContext.Provider value={[user, setUser]}>
            <NavigationContainer>
              {user ? <DrawerNav /> : <AuthNavigation />}
            </NavigationContainer>
          </UserContext.Provider>
        </SafeAreaView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
