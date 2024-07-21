import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 30 }}>Login Screen</Text>
      <Button
        title="Register"
        onPress={() => {
          navigation.navigate("Register");
        }}
      ></Button>
    </View>
  );
};

export default Login;
