import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

const ImageUploadModal = ({ setImageUrl, onClose }) => {
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "We need permission to access your photos"
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUrl(result.assets[0].uri);
      onClose();
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "We need permission to access your camera"
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUrl(result.assets[0].uri);
      onClose();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.circleButton} onPress={pickImage}>
        <Ionicons name="image" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.circleButton} onPress={takePhoto}>
        <Ionicons name="camera" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.circleButton} onPress={onClose}>
        <Ionicons name="close" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 150,
    left: "50%",
    transform: [{ translateX: -125 }],
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
  },
  circleButton: {
    width: 75,
    height: 75,
    borderRadius: 50,
    backgroundColor: "#4583D5C4",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
});

export default ImageUploadModal;
