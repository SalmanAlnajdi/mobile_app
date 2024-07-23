// import { NavigationContainer } from "@react-navigation/native";

// import { View } from "react-native";
// import AuthNavigation from "./src/navigation/AuthNavigation";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
// import { checkToken } from "./src/apis/auth";
// import UserContext from "./src/context/UserContext";
// import MainNavigation from "./src/navigation/MainNavigation";
// import {
//   SafeAreaProvider,
//   SafeAreaView,
//   useSafeAreaInsets,
// } from "react-native-safe-area-context";

// export default function App() {
//   const [user, setUser] = useState(false);

//   useEffect(() => {
//     if (checkToken()) {
//       setUser(true);
//     }
//   }, []);

//   const insert = useSafeAreaInsets();

//   return (
//     <QueryClientProvider client={new QueryClient()}>
//       <SafeAreaProvider>
//         <SafeAreaView>
//           <View
//             style={{
//               flex: 1,
//               paddingTop: insert.top,
//               paddingBottom: insert.bottom,
//               paddingHorizontal: insert.left,
//               paddingHorizontal: insert.right,
//             }}
//           >
//             <UserContext.Provider value={[user, setUser]}>
//               <NavigationContainer>
//                 {user ? <MainNavigation /> : <AuthNavigation />}
//               </NavigationContainer>
//             </UserContext.Provider>
//           </View>
//         </SafeAreaView>
//       </SafeAreaProvider>
//     </QueryClientProvider>
//   );
// }

import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import AuthNavigation from "./src/navigation/AuthNavigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { checkToken } from "./src/apis/auth";
import UserContext from "./src/context/UserContext";
import MainNavigation from "./src/navigation/MainNavigation";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

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
        <SafeAreaView style={{ flex: 1 }}>
          <UserContext.Provider value={[user, setUser]}>
            <NavigationContainer>
              {user ? <MainNavigation /> : <AuthNavigation />}
            </NavigationContainer>
          </UserContext.Provider>
        </SafeAreaView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
