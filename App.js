import { NavigationContainer } from "@react-navigation/native";

import { View } from "react-native";
import AuthNavigation from "./src/navigation/AuthNavigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { checkToken } from "./src/apis/auth";
import UserContext from "./src/context/UserContext";
import MainNavigation from "./src/navigation/MainNavigation";

export default function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (checkToken()) {
      setUser(true);
    }
  }, []);

  return (
    <QueryClientProvider client={new QueryClient()}>
      <View style={{ flex: 1 }}>
        <UserContext.Provider value={[user, setUser]}>
          <NavigationContainer>
            {user ? <MainNavigation /> : <AuthNavigation />}
          </NavigationContainer>
        </UserContext.Provider>
      </View>
    </QueryClientProvider>
  );
}
