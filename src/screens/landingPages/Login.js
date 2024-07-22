import { Button, Text, TextInput, View, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { login } from "../../apis/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const data = await login({ userInfo });

      console.log(data);
      Alert.alert("Success", "You have logged in successfully");
      navigation.navigate("Main");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Invalid username or password");
    }
  };

  const onChangeHandler = (e) => {
    console.log(e);
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 30, marginBottom: 20 }}>Login Screen</Text>
      <TextInput
        style={{
          width: "80%",
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 12,
          paddingLeft: 8,
        }}
        placeholder="Username"
        value={username}
        onChangeText={onChangeHandler}
      />
      <TextInput
        style={{
          width: "80%",
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 12,
          paddingLeft: 8,
        }}
        placeholder="Password"
        value={password}
        onChangeText={onChangeHandler}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <View style={{ marginTop: 10 }}>
        <Button
          title="Register"
          onPress={() => {
            navigation.navigate("Register");
          }}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Button
          title="Forgot Password"
          onPress={() => {
            navigation.navigate("ForgotPassword");
          }}
        />
      </View>
    </View>
  );
};

export default Login;
