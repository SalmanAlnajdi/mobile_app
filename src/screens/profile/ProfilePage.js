// import {
//   Button,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import React, { useContext, useState, useEffect } from "react";
// import * as ImagePicker from "expo-image-picker";
// import { logout, myProfile, updateProfile } from "../../apis/auth";
// import {
//   QueryClient,
//   useMutation,
//   useQuery,
//   useQueryClient,
// } from "@tanstack/react-query";
// import UserContext from "../../context/UserContext";
// import { LinearGradient } from "expo-linear-gradient";

// const ProfilePage = () => {
//   const [user, setUser] = useContext(UserContext);
//   const [userInfo, setUserInfo] = useState({});
//   const [profileImage, setProfileImage] = useState("");
//   const queryClient = useQueryClient();

//   const { data: userProfile } = useQuery({
//     queryKey: ["getMyProfile"],
//     queryFn: myProfile,
//   });

//   useEffect(() => {
//     if (userProfile) {
//       setUserInfo(userProfile);
//     }
//   }, [userProfile]);

//   const { mutate } = useMutation({
//     mutationKey: ["updateProfile"],
//     mutationFn: (updateInfo) => updateProfile(updateInfo),
//     onSuccess: () => {
//       console.log("Profile updated successfully");
//       queryClient.invalidateQueries({ queryKey: ["getMyProfile"] });
//     },
//     onError: (error) => {
//       console.error(error);
//     },
//   });

//   const onChangeHandler = (key, value) => {
//     setUserInfo({ ...userInfo, [key]: value });
//   };

//   const onUpdateProfile = async (userInfo) => {
//     await mutate(userInfo);
//   };

//   const pickImage = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== "granted") {
//       Alert.alert(
//         "Permission denied",
//         "We need permission to access your photos"
//       );
//       return;
//     }

//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.canceled) {
//       console.log(result);
//       setProfileImage(result.uri);
//       setUserInfo({ ...userInfo, image: result.uri });
//     }
//   };

//   const takePhoto = async () => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== "granted") {
//       Alert.alert(
//         "Permission denied",
//         "We need permission to access your camera"
//       );
//       return;
//     }

//     let result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.canceled) {
//       console.log(result);
//       setProfileImage(result.uri);
//       setUserInfo({ ...userInfo, image: result.uri });
//     }
//   };

//   return (
//     <ScrollView
//       scrollEventThrottle={16}
//       style={{ flex: 1, backgroundColor: "#1E1E2B" }}
//     >
//       <View
//         style={{
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundColor: "#1E1E2B",
//           paddingBottom: 100,
//         }}
//       >
//         <Button title="Choose from Gallery" onPress={pickImage} />
//         <Button title="Take Photo" onPress={takePhoto} />

//         <View
//           style={{
//             flexDirection: "column",
//             width: "100%",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <TextInput
//             defaultValue={userProfile?.username}
//             onChangeText={(text) => onChangeHandler("username", text)}
//             style={styles.input}
//           />
//           <TextInput
//             defaultValue={userProfile?.email}
//             onChangeText={(text) => onChangeHandler("email", text)}
//             style={styles.input}
//           />
//           <TextInput
//             defaultValue={userProfile?.firstName}
//             onChangeText={(text) => onChangeHandler("firstName", text)}
//             style={styles.input}
//           />
//           <TextInput
//             defaultValue={userProfile?.lastName}
//             onChangeText={(text) => onChangeHandler("lastName", text)}
//             style={styles.input}
//           />
//           <TextInput
//             defaultValue={userProfile?.phone}
//             onChangeText={(text) => onChangeHandler("phone", text)}
//             style={styles.input}
//           />
//           <TextInput
//             defaultValue={userProfile?.gender}
//             onChangeText={(text) => onChangeHandler("gender", text)}
//             style={styles.input}
//           />
//           <Text style={styles.text}>{userProfile?.image}</Text>
//           <TouchableOpacity
//             style={{
//               width: "100%",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//             onPress={() => onUpdateProfile(userInfo)}
//           >
//             <LinearGradient
//               colors={["#4D81D3", "#9765B5"]}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 0 }}
//               style={{
//                 padding: 15,
//                 borderRadius: 10,
//                 marginBottom: 20,
//                 width: "80%",
//                 alignItems: "center",
//               }}
//             >
//               <Text style={styles.updateButtonText}>Update Profile</Text>
//             </LinearGradient>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   input: {
//     width: "80%",
//     height: 40,
//     borderColor: "#4583D5",
//     borderWidth: 1,
//     marginBottom: 12,
//     paddingLeft: 8,

//     placeholderTextColor: "FFFFFF",
//     backgroundColor: "#1E1E2B",
//     color: "#fff",
//     padding: 10,
//     borderRadius: 10,
//   },
//   updateText: {
//     color: "#fff",
//   },
//   updateButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     width: "100%",
//   },
//   buttonText: {
//     color: "#4a90e2",
//   },
//   radioContainer: {
//     width: "80%",
//     marginBottom: 12,
//   },
//   radioText: {
//     color: "#fff",
//     marginBottom: 8,
//   },
//   radioButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderColor: "#fff",
//   },
//   radioLabel: {
//     color: "#fff",
//     marginLeft: 8,
//   },
//   radioRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
// });

// export default ProfilePage;

////////////////////////////////////////////////////////////////////

// 

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
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { logout, myProfile, updateProfile } from "../../apis/auth";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import UserContext from "../../context/UserContext";
import { LinearGradient } from "expo-linear-gradient";

const ProfilePage = () => {
  const [user, setUser] = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const queryClient = useQueryClient();

  const { data: userProfile } = useQuery({
    queryKey: ["getMyProfile"],
    queryFn: myProfile,
  });

  useEffect(() => {
    if (userProfile) {
      setUserInfo(userProfile);
      setProfileImage(userProfile.image);
    }
  }, [userProfile]);

  const { mutate } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: (updateInfo) => updateProfile(updateInfo),
    onSuccess: () => {
      console.log("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["getMyProfile"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onChangeHandler = (key, value) => {
    setUserInfo({ ...userInfo, [key]: value });
  };

  const onUpdateProfile =  (userInfo) => {
     mutate(userInfo);
  };

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
      setProfileImage(result.assets[0].uri);
      setUserInfo({ ...userInfo, image: result.assets[0].uri });
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
      setProfileImage(result.assets[0].uri);
      setUserInfo({ ...userInfo, image: result.assets[0].uri });
    }
  };

  return (
    <ScrollView
      scrollEventThrottle={16}
      style={{ flex: 1, backgroundColor: "#1E1E2B" }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1E1E2B",
          paddingBottom: 100,
        }}
      >
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={{ color: "#aaa" }}>Upload Profile Photo</Text>
          </View>
        )}

        <Button title="Choose from Gallery" onPress={pickImage} />
        <Button title="Take Photo" onPress={takePhoto} />

        <View
          style={{
            flexDirection: "column",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextInput
            defaultValue={userProfile?.username}
            onChangeText={(text) => onChangeHandler("username", text)}
            style={styles.input}
          />
          <TextInput
            defaultValue={userProfile?.email}
            onChangeText={(text) => onChangeHandler("email", text)}
            style={styles.input}
          />
          <TextInput
            defaultValue={userProfile?.firstName}
            onChangeText={(text) => onChangeHandler("firstName", text)}
            style={styles.input}
          />
          <TextInput
            defaultValue={userProfile?.lastName}
            onChangeText={(text) => onChangeHandler("lastName", text)}
            style={styles.input}
          />
          <TextInput
            defaultValue={userProfile?.phone}
            onChangeText={(text) => onChangeHandler("phone", text)}
            style={styles.input}
          />
          <TextInput
            defaultValue={userProfile?.gender}
            onChangeText={(text) => onChangeHandler("gender", text)}
            style={styles.input}
          />
          <TouchableOpacity
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => onUpdateProfile(userInfo)}
          >
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
              <Text style={styles.updateButtonText}>Update Profile</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
    backgroundColor: "#1E1E2B",
    color: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  updateText: {
    color: "#fff",
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    width: "100%",
  },
  buttonText: {
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
});

export default ProfilePage;
