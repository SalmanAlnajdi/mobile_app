import {
  Button,
  Text,
  TextInput,
  View,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { register } from "../../apis/auth"; // Ensure this path is correct
import UserContext from "../../context/UserContext";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RadioButton } from "react-native-paper";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const [user, setUser] = useContext(UserContext);
  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        Alert.alert("Error", "Passwords do not match");
        return;
      }

      const userInfo = {
        username,
        password,
        firstName,
        lastName,
        phone,
        gender,
        email,
      };

      const data = await register(userInfo);
      console.log(data);
      Alert.alert("Success", "You have registered successfully");
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
      // Alert.alert("Error", "Failed to register. Please try again.");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1E1E2B",
      }}
    >
      <Text style={{ fontSize: 15, marginBottom: 20, color: "#fff" }}>
        Create an account{" "}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor="#aaa"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor="#aaa"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#aaa"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        placeholderTextColor="#aaa"
        value={phone}
        onChangeText={setPhone}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Gender"
        placeholderTextColor="#aaa"
        value={gender}
        onChangeText={setGender}
      /> */}
      <View style={styles.radioContainer}>
        <Text style={styles.radioText}>Gender:</Text>

        <RadioButton.Group
          onValueChange={(newValue) => setGender(newValue)}
          value={gender}
        >
          <View style={styles.radioRow}>
            <View style={styles.radioButton}>
              <RadioButton value="male" />
              <Text style={styles.radioLabel}>Male</Text>
            </View>
            <View style={styles.radioButton}>
              <RadioButton value="female" />
              <Text style={styles.radioLabel}>Female</Text>
            </View>
          </View>
        </RadioButton.Group>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />
      <LinearGradient
        colors={["#4D81D3", "#9765B5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
          width: "80%",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.signInButtonText}>Sign up</Text>
        </TouchableOpacity>
      </LinearGradient>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text>
            <Text style={styles.signupText}>Already have an account?</Text>
            <Text style={styles.signinText}> Signin</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  input: {
    width: "80%",
    height: 40,
    borderColor: "#4583D5",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,

    placeholderTextColor: "FFFFFF",
    backgroundColor: "#1E1E2B",
    color: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  signupText: {
    color: "#fff",
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  signinText: {
    color: "#4a90e2",
  },
  radioContainer: {
    width: "80%",
    marginBottom: 12,
  },
  radioText: {
    color: "#fff",
    marginBottom: 8,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#fff",
  },
  radioLabel: {
    color: "#fff",
    marginLeft: 8,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export default Register;
