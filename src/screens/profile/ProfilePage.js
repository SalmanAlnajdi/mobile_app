import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { logout, myProfile, updateProfile } from "../../apis/auth";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import UserContext from "../../context/UserContext";

const ProfilePage = () => {
  const [user, setUser] = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({});
  const queryClient = useQueryClient();
  const { data: userProfile } = useQuery({
    queryKey: ["getMyProfile"],
    queryFn: myProfile,
  });

  useEffect(() => {
    if (userProfile) {
      setUserInfo(userProfile);
    }
  }, [userProfile]);

  const { mutate } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: (updateInfo) => updateProfile(updateInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getMyProfile"] });
    },
  });

  const onChangeHandler = (key, value) => {
    setUserInfo({ ...userInfo, [key]: value });
  };

  console.log("User Data:", userProfile);
  console.log("User Info:", userInfo);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
      }}
    >
      <Text>ProfilePage</Text>
      <View style={{ flexDirection: "row", padding: 10 }}>
        <View>
          <Text style={styles.text}>Username : </Text>
          <Text style={styles.text}>Email : </Text>
          <Text style={styles.text}>FirstName : </Text>
          <Text style={styles.text}>LastName : </Text>
          <Text style={styles.text}>Phone : </Text>
          <Text style={styles.text}>Gender : </Text>
          <Text style={styles.text}>Image : </Text>
        </View>
        <View>
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
          <Text style={styles.text}>{userProfile?.image}</Text>
        </View>
      </View>
      <Pressable onPress={() => mutate(userInfo)} style={styles.button}>
        <Text style={styles.buttonText}>Update</Text>
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

export default ProfilePage;
