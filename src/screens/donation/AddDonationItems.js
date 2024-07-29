import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Alert,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
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
import ImageUploadModal from "../../components/ImageUploadModal";

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
    image: "",
    condition: "",
    listId: listId,
  });
  const [items, setItems] = useState([]);
  const [isChecked, setChecked] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const navigation = useNavigation();

  const addItemMutation = useMutation({
    mutationKey: ["addItem"],
    mutationFn: (newItem) => createDonation({ ...newItem, listId }),
    onSuccess: (data) => {
      setItems([...items, newItem]);
      setNewItem({ name: "", description: "", image: "", condition: "" });
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

  const toggleImagePicker = () => {
    setShowImagePicker(!showImagePicker);
  };

  const setImageUrl = (url) => {
    setNewItem({ ...newItem, image: url });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#1E1E2B" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Add Items to Donation List</Text>

        <FlatList
          horizontal={true}
          style={{ flexDirection: "row" }}
          data={items}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <Image
                source={{ uri: item.image }}
                style={{ width: 50, height: 50, borderRadius: "100%" }}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={styles.uploadSection}>
          <Text style={styles.uploadTitle}>Upload Photo</Text>
          <View style={styles.uploadBox}>
            {newItem.image ? (
              <Image
                source={{ uri: newItem.image }}
                style={styles.uploadedImage}
              />
            ) : (
              <TouchableOpacity onPress={toggleImagePicker}>
                <LinearGradient
                  colors={["#4D81D3", "#9765B5"]}
                  style={styles.uploadButton}
                >
                  <Text style={styles.uploadButtonText}>Upload</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.supportedFormats}>
            Supported formats: JPEG, PNG, GIF, RAW, WEBP
          </Text>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showImagePicker}
          onRequestClose={toggleImagePicker}
        >
          <View style={styles.modalBackground}>
            <ImageUploadModal
              setImageUrl={setImageUrl}
              onClose={toggleImagePicker}
            />
          </View>
        </Modal>

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
            <Text style={styles.text}>Accept Terms and Conditions</Text>
          </View>
        </View>
        <TouchableOpacity onPress={addItem}>
          <LinearGradient
            colors={["#4D81D3", "#9765B5"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.linearGradientButton}
          >
            <Text style={styles.signInButtonText}>Add item</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={confirmHandler}>
          <LinearGradient
            colors={["#4D81D3", "#9765B5"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.linearGradientButton}
          >
            <Text style={styles.signInButtonText}>Next</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </View>
    </ScrollView>
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
    color: "#fff",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#4583D5",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    placeholderTextColor: "#FFFFFF",
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
    alignItems: "center",
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
  uploadedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
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
  linearGradientButton: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: "70%",
    alignItems: "center",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#fff",
  },
  separator: {
    height: 1,
    backgroundColor: "gray",
    width: "100%",
  },
});

export default AddDonationItems;
