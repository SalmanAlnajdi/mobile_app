import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
  Modal,
} from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import UserContext from "../../context/UserContext";
import { logout, myProfile, updateProfile } from "../../apis/auth";
import ImagePickerModal from "../../components/ImagePickerModal";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { BASE_URL } from "../../apis";

const ProfilePage = () => {
  const [user, setUser] = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({});
  const [originalUserInfo, setOriginalUserInfo] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [originalProfileImage, setOriginalProfileImage] = useState(null);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const { data: userProfile } = useQuery({
    queryKey: ["getMyProfile"],
    queryFn: myProfile,
    onSuccess: (data) => {
      setUserInfo(data);
      setOriginalUserInfo(data);
      setProfileImage(data.image);
      setOriginalProfileImage(data.image);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    if (userProfile) {
      setUserInfo(userProfile);
      setOriginalUserInfo(userProfile);
      setProfileImage(userProfile.image);
      setOriginalProfileImage(userProfile.image);
    }
  }, [userProfile]);

  const { mutate } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: (updateInfo) => updateProfile(updateInfo),
    onSuccess: () => {
      console.log("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["getMyProfile"] });
      setIsEditing(false);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onChangeHandler = (key, value) => {
    setUserInfo({ ...userInfo, [key]: value });
  };

  const onUpdateProfile = (userInfo) => {
    mutate(userInfo);
  };

  const toggleImagePicker = () => {
    setShowImagePicker(!showImagePicker);
  };

  const enableEditing = () => {
    setIsEditing(true);
  };

  const disableEditing = () => {
    setIsEditing(false);
    setUserInfo(originalUserInfo);
    setProfileImage(originalProfileImage);
  };

  return (
    <ScrollView
      scrollEventThrottle={16}
      style={{ flex: 1, backgroundColor: "#1E1E2B" }}
    >
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingRight: 20,
          }}
        >
          {!isEditing ? (
            <TouchableOpacity
              onPress={enableEditing}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome5 name="edit" size={24} color="white" />
            </TouchableOpacity>
          ) : null}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          {profileImage ? (
            <LinearGradient
              colors={["#4D81D3", "#9765B5"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                width: 80,
                height: 80,
                borderRadius: "100%",
                backgroundColor: "#9765B5",
                alignItems: "center",
                justifyContent: "center",
                padding: 5,
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#1E1E2B",
                }}
              >
                <Image
                  source={{ uri: `${BASE_URL}/${profileImage}` }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 50,
                    backgroundColor: "white",
                  }}
                />
              </View>
            </LinearGradient>
          ) : (
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 50,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome5 name="user" size={24} color="black" />
            </View>
          )}

          {isEditing && (
            <Button title="Upload Photo" onPress={toggleImagePicker} />
          )}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showImagePicker}
          onRequestClose={toggleImagePicker}
        >
          <View style={styles.modalBackground}>
            <ImagePickerModal
              setProfileImage={setProfileImage}
              setUserInfo={setUserInfo}
              userInfo={userInfo}
              onClose={toggleImagePicker}
            />
          </View>
        </Modal>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              defaultValue={userProfile?.username}
              onChangeText={(text) => onChangeHandler("username", text)}
              style={[styles.input, !isEditing && styles.disabledInput]}
              editable={isEditing}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              defaultValue={userProfile?.email}
              onChangeText={(text) => onChangeHandler("email", text)}
              style={[styles.input, !isEditing && styles.disabledInput]}
              editable={isEditing}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              defaultValue={userProfile?.firstName}
              onChangeText={(text) => onChangeHandler("firstName", text)}
              style={[styles.input, !isEditing && styles.disabledInput]}
              editable={isEditing}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              defaultValue={userProfile?.lastName}
              onChangeText={(text) => onChangeHandler("lastName", text)}
              style={[styles.input, !isEditing && styles.disabledInput]}
              editable={isEditing}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              defaultValue={userProfile?.phone}
              onChangeText={(text) => onChangeHandler("phone", text)}
              style={[styles.input, !isEditing && styles.disabledInput]}
              editable={isEditing}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Gender</Text>
            <TextInput
              defaultValue={userProfile?.gender}
              onChangeText={(text) => onChangeHandler("gender", text)}
              style={[styles.input, !isEditing && styles.disabledInput]}
              editable={isEditing}
            />
          </View>

          {isEditing ? (
            <>
              <TouchableOpacity
                style={styles.updateButtonContainer}
                onPress={() => onUpdateProfile(userInfo)}
              >
                <LinearGradient
                  colors={["#4D81D3", "#9765B5"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.updateButton}
                >
                  <Text style={styles.updateButtonText}>Update Profile</Text>
                </LinearGradient>
              </TouchableOpacity>
              <Button title="Cancel" onPress={disableEditing} />
            </>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E2B",
    paddingBottom: 100,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#aaa",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  formContainer: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
    marginBottom: 12,
  },
  label: {
    color: "#aaa",
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: "#4583D5",
    borderWidth: 1,
    paddingLeft: 8,
    backgroundColor: "#1E1E2B",
    color: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  disabledInput: {
    backgroundColor: "#555",
    color: "#aaa",
  },
  updateButtonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  updateButton: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    width: "100%",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfilePage;
