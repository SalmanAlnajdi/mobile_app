import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  CheckBox,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { login } from "../../apis/auth";
import { useMutation } from "@tanstack/react-query";
import UserContext from "../../context/UserContext";
import { LinearGradient } from "expo-linear-gradient";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  const [user, setUser] = useContext(UserContext);

  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => login({ username, password }),
    onSuccess: (data) => {
      setUser(true);
      console.log(data);
      Alert.alert("Success", "You have logged in successfully");
      navigation.navigate("Main");
    },
    onError: (error) => {
      console.error(error);
      Alert.alert("Error", "Invalid username or password");
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ username, password }); // Log the user info to debug
    if (username && password) {
      mutate();
    } else {
      Alert.alert("Error", "Please enter both username and password");
    }
  };

  return (
    //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //       <Text style={{ fontSize: 30, marginBottom: 20 }}>Login Screen</Text>
    //       <TextInput
    //         style={{
    //           width: "80%",
    //           height: 40,
    //           borderColor: "gray",
    //           borderWidth: 1,
    //           marginBottom: 12,
    //           paddingLeft: 8,
    //         }}
    //         placeholder="Username"
    //         value={username}
    //         onChangeText={setUsername}
    //       />
    //       <TextInput
    //         style={{
    //           width: "80%",
    //           height: 40,
    //           borderColor: "gray",
    //           borderWidth: 1,
    //           marginBottom: 12,
    //           paddingLeft: 8,
    //         }}
    //         placeholder="Password"
    //         value={password}
    //         onChangeText={setPassword}
    //         secureTextEntry
    //       />
    //       <Button title="Login" onPress={handleLogin} />
    //       <View style={{ marginTop: 10 }}>
    //         <Button
    //           title="Register"
    //           onPress={() => {
    //             navigation.navigate("Register");
    //           }}
    //         />
    //       </View>
    //       <View style={{ marginTop: 10 }}>
    //         <Button
    //           title="Forgot Password"
    //           onPress={() => {
    //             navigation.navigate("ForgotPassword");
    //           }}
    //         />
    //       </View>
    //     </View>
    //   );
    // };

    // export default Login;
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.time}>9:41</Text>
        <View style={styles.settingsIcon}></View>
      </View>

      {/* <Image source={require(`${}`)} style={styles.logo} /> */}

      <Text style={styles.loginText}>Login to your account</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaa"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          placeholderTextColor="#aaa"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>

      <View style={styles.rememberMeContainer}>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forget Password?</Text>
        </TouchableOpacity>
      </View>
      <LinearGradient
        colors={["#4D81D3", "#9765B5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
          width: "100%",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.signInButtonText}>Sign in</Text>
        </TouchableOpacity>
      </LinearGradient>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Register");
        }}
      >
        <Text style={styles.signupText}>
          Don’t have an account? <Text style={styles.label}> Sign in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E2B",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  time: {
    color: "#fff",
    fontSize: 16,
  },
  settingsIcon: {
    width: 24,
    height: 24,
    backgroundColor: "#444",
    borderRadius: 12,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  loginText: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    color: "#fff",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#1a1a2e",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  rememberMeText: {
    color: "#fff",
  },
  forgotPasswordText: {
    color: "#4a90e2",
    marginLeft: "auto",
  },
  signInButton: {
    backgroundColor: "#9765B5",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  signupText: {
    color: "#4a90e2",
  },
});

export default Login;
