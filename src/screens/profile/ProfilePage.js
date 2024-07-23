import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { logout, myProfile } from "../../apis/auth";
import { useQuery } from "@tanstack/react-query";
import UserContext from "../../context/UserContext";

const ProfilePage = () => {
  const [user, setUser] = useContext(UserContext);
  const { data: userProfile } = useQuery({
    queryKey: ["getMyProfile"],
    queryFn: myProfile,
  });

  console.log("User Data:", userProfile);

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

      <Pressable
        onPress={() => {
          logout();
          setUser(false);
        }}
      >
        <Text>LOGOUT</Text>
      </Pressable>

      <Text>{userProfile?.username}</Text>
    </View>
  );
};

export default ProfilePage;
