import { NavigationContainer } from "@react-navigation/native";

import { View } from "react-native";
import MainNavigation from "./src/navigation/MainNavigation";
import AuthNavigation from "./src/navigation/AuthNavigation";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        {/* <AuthNavigation /> */}
        <MainNavigation />
      </NavigationContainer>
    </View>
  );
}
