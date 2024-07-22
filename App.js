import { NavigationContainer } from "@react-navigation/native";

import { View } from "react-native";
import AuthNavigation from "./src/navigation/AuthNavigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <AuthNavigation />
        </NavigationContainer>
      </View>
    </QueryClientProvider>
  );
}
