import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createList } from "../../apis/donations";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

const AddDonationList = ({ navigation }) => {
  const [listName, setListName] = useState("");

  const addListMutation = useMutation({
    mutationKey: ["addList"],
    mutationFn: (list) => createList(list),
    onSuccess: (data) => {
      console.log("backend data", data);
      // Ensure the data contains the list ID
      const listId = data?._id; // Use _id based on your API response structure
      if (listId) {
        // Navigate to the AddDonationItems screen with the new list ID
        navigation.navigate("AddDonationItems", { listId });
      } else {
        console.error("List ID is undefined");
      }
    },
    onError: (error) => {
      console.error("Failed to create list", error);
    },
  });

  const addList = () => {
    // if (listName.trim()) {
    addListMutation.mutate({ name: listName });
    // }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Donation List</Text>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Enter your List Name"
          placeholderTextColor="#aaa"
          value={listName}
          onChangeText={(text) => setListName(text)}
          style={styles.input}
        />
      </View>
      <LinearGradient
        colors={["#4D81D3", "#9765B5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
          width: "70%",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={addList}>
          <Text style={styles.signInButtonText}>Add List </Text>
        </TouchableOpacity>
      </LinearGradient>
      <Text style={styles.buttonText}>
        * Create a list for your donation so you can share it with others{" "}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#1E1E2B",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  label: {
    fontWeight: "bold",
    marginRight: 10,
  },
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
  button: {
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
  },
});

export default AddDonationList;
