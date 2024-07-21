import { Button, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 30 }}>Register Screen</Text>
      <Button
        title="Login"
        onPress={() => {
          navigation.navigate("Login");
        }}
      ></Button>
    </View>
  );
};

export default Register;
