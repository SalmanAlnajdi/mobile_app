import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createDonation } from "../../apis/donations";
import { useNavigation } from "@react-navigation/native";

const AddDonationItems = ({ route }) => {
  const queryClient = new useQueryClient();
  const { listId } = route.params;

  if (!listId) {
    console.error("List ID is undefined");
    return null; // or render an error message
  }

  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    imageUrl: "",
    condition: "",
    listId: listId,
  });
  const [items, setItems] = useState([]);
  const navigation = useNavigation();

  const addItemMutation = useMutation({
    mutationKey: ["addItem"],
    mutationFn: (newItem) => createDonation({ ...newItem, listId }),
    onSuccess: (data) => {
      console.log(data);
      setItems([...items, newItem]);
      setNewItem({ name: "", description: "", imageUrl: "", condition: "" });
    },
  });

  const onChangeHandler = (key, value) => {
    setNewItem({ ...newItem, [key]: value });
  };

  const addItem = () => {
    if (newItem.name.trim() && newItem.description.trim()) {
      addItemMutation.mutate(newItem);
    }
  };

  const confirmHandler = () => {
    console.log("Invalidating queries...");
    queryClient.invalidateQueries(["listsByUser"], {
      onSuccess: () => {
        console.log("Query invalidated and refetched successfully.");
        navigation.navigate("HomeDonations");
      },
      onError: (error) => {
        console.error("Error invalidating queries: ", error);
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Items to Donation List</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.label}>Item Name:</Text>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.text}>{item.description}</Text>
            <Text style={styles.label}>Condition:</Text>
            <Text style={styles.text}>{item.condition}</Text>
            <Text style={styles.label}>Image URL:</Text>
            <Text style={styles.text}>{item.imageUrl}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.inputRow}>
        <Text style={styles.label}>Item Name:</Text>
        <TextInput
          placeholder="Enter Item Name"
          value={newItem.name}
          onChangeText={(text) => onChangeHandler("name", text)}
          style={styles.input}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Description:</Text>
        <TextInput
          placeholder="Enter Description"
          value={newItem.description}
          onChangeText={(text) => onChangeHandler("description", text)}
          style={styles.input}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Condition:</Text>
        <TextInput
          placeholder="Enter Condition"
          value={newItem.condition}
          onChangeText={(text) => onChangeHandler("condition", text)}
          style={styles.input}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Image URL:</Text>
        <TextInput
          placeholder="Enter Image URL"
          value={newItem.imageUrl}
          onChangeText={(text) => onChangeHandler("imageUrl", text)}
          style={styles.input}
        />
      </View>
      <Pressable onPress={addItem} style={styles.button}>
        <Text style={styles.buttonText}>Add Item</Text>
      </Pressable>
      <Pressable onPress={confirmHandler} style={styles.button}>
        <Text style={styles.buttonText}>Confirm</Text>
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
  itemRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
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
  text: {
    height: 40,
    paddingTop: 10,
  },
});

export default AddDonationItems;
