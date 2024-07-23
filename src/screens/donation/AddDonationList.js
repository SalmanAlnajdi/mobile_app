import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

const AddDonationList = () => {
  const [donationList, setDonationList] = useState({});
  const [items, setItems] = useState([]);

  const onChangeHandler = (key, value) => {};

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
      }}
    >
      <Text>AddDonationList</Text>
      <View style={{ flexDirection: "row", padding: 10 }}>
        <View>
          <Text style={styles.text}>List Name : </Text>
        </View>
        <View>
          <TextInput
            placeholder="Enter your List Name"
            onChangeText={(text) => onChangeHandler("listName", text)}
            style={styles.input}
          />
        </View>
      </View>
      <View>
        <Text style={styles.text}>Items : </Text>
        {items.map((item) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text style={styles.text}>Item Name : </Text>
            <TextInput
              placeholder="Enter your Item Name"
              onChangeText={(text) => onChangeHandler("itemName", text)}
              style={styles.input}
            />
            <Text style={styles.text}>condition : </Text>
            <TextInput
              placeholder="Enter your Condition"
              onChangeText={(text) => onChangeHandler("condition", text)}
              style={styles.input}
            />
            <Text style={styles.text}>item image : </Text>
          </View>
        ))}
        <Pressable onPress={() => {}} style={styles.button}>
          <Text style={styles.buttonText}>Add Item</Text>
        </Pressable>
      </View>
      <Pressable onPress={() => {}} style={styles.button}>
        <Text style={styles.buttonText}>Add List</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 50,
  },
  button: {
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 12,
  },
  buttonText: {
    color: "white",
  },
  text: {
    fontWeight: "bold",
    height: 50,
  },
});

export default AddDonationList;
