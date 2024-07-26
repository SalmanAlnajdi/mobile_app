import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createDonation } from "../../apis/donations";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";

const AddDonationItems = ({ route }) => {
  const queryClient = useQueryClient();
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
  const [isChecked, setChecked] = useState(false);
  const navigation = useNavigation();

  const addItemMutation = useMutation({
    mutationKey: ["addItem"],
    mutationFn: (newItem) => createDonation({ ...newItem, listId }),
    onSuccess: (data) => {
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
    if (isChecked) {
      console.log("Invalidating queries...");
      navigation.navigate("DonationConfirm", { listId });
      queryClient.invalidateQueries(["listsByUser"], {
        onSuccess: () => {
          console.log("Query invalidated and refetched successfully.");
          navigation.navigate("DonationConfirm");
        },
        onError: (error) => {
          console.error("Error invalidating queries: ", error);
        },
      });
    } else {
      console.log("Please accept the terms and conditions.");
      Alert.alert("Error", "Please Accept Term and Condition");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Items to Donation List</Text>

      <View style={styles.uploadSection}>
        <Text style={styles.uploadTitle}>Upload Photo</Text>
        <View style={styles.uploadBox}>
          {/* <Image
            source={require("./path/to/upload-icon.png")} // Replace with your upload icon path
            style={styles.uploadIcon}
          /> */}
          <LinearGradient
            colors={["#4D81D3", "#9765B5"]}
            style={styles.uploadButton}
          >
            <Text style={styles.uploadButtonText}>Upload</Text>
          </LinearGradient>
        </View>
        <Text style={styles.supportedFormats}>
          Supported formats: JPEG, PNG, GIF, RAW, WEBP
        </Text>
      </View>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Enter Item Name"
          placeholderTextColor="#aaa"
          value={newItem.name}
          onChangeText={(text) => onChangeHandler("name", text)}
          style={styles.input}
        />
      </View>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Enter Description"
          placeholderTextColor="#aaa"
          value={newItem.description}
          onChangeText={(text) => onChangeHandler("description", text)}
          style={styles.input}
        />
      </View>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Enter Condition"
          placeholderTextColor="#aaa"
          value={newItem.condition}
          onChangeText={(text) => onChangeHandler("condition", text)}
          style={styles.input}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
          />
          <Text style={styles.text}>Accpted Term and Condition</Text>
        </View>
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
        <TouchableOpacity onPress={addItem}>
          <Text style={styles.signInButtonText}>Add item </Text>
        </TouchableOpacity>
      </LinearGradient>
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
        <TouchableOpacity onPress={confirmHandler}>
          <Text style={styles.signInButtonText}>Next </Text>
        </TouchableOpacity>
      </LinearGradient>
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
    backgroundColor: "#1E1E2B",
    alignItems: "center",
    padding: 20,
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
    color: "#fff",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
    color: "#fff",
  },
  checkbox: {
    margin: 8,
  },
  uploadSection: {
    marginBottom: 20,
  },
  uploadTitle: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: "#8F68B8",
    borderStyle: "dashed",
    borderRadius: 10,
    padding: 30,
    alignItems: "center",
    marginBottom: 20,
  },
  uploadIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  uploadButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  uploadButtonText: {
    color: "#fff",
  },
  supportedFormats: {
    color: "#aaa",
    fontSize: 12,
    textAlign: "center",
  },
});

export default AddDonationItems;
