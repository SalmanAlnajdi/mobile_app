import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createList } from "../../apis/donations";

const AddDonationList = ({ navigation }) => {
  const [listName, setListName] = useState("");

  const addListMutation = useMutation({
    mutationKey: ["addList"],
    mutationFn: (list) => createList(list),
    onSuccess: (data) => {
      console.log(data);
      // Ensure the data contains the list ID
      const listId = data._id; // Use _id based on your API response structure
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
    if (listName.trim()) {
      addListMutation.mutate({ listName });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Donation List</Text>
      <View style={styles.inputRow}>
        <Text style={styles.label}>List Name:</Text>
        <TextInput
          placeholder="Enter your List Name"
          value={listName}
          onChangeText={setListName}
          style={styles.input}
        />
      </View>
      <Pressable onPress={addList} style={styles.button}>
        <Text style={styles.buttonText}>Add List</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    flex: 1,
    padding: 5,
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
