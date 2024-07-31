import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Clipboard,
  ScrollView,
} from "react-native";
import { Card, Title, Paragraph, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteList } from "../../apis/donations";
import { Ionicons } from "@expo/vector-icons";
import { BASE_URL } from "../../apis";
import { LinearGradient } from "expo-linear-gradient";

const DonationDetail = ({ route }) => {
  const { donationList } = route.params;
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const { mutate: deleteListMutation } = useMutation({
    mutationKey: ["deleteList"],
    mutationFn: (listId) => deleteList(listId),
    onSuccess: () => {
      console.log("List deleted successfully");
      queryClient.invalidateQueries(["listsByUser"]);
      navigation.navigate("HomeDonatios");
    },
  });

  const deleteListHandler = () => {
    deleteListMutation(donationList._id);
  };

  const copyToClipboard = () => {
    Clipboard.setString(`localhost:3000/link/${donationList._id}`);
    alert("Link copied to clipboard!");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#1E1E2B", paddingBottom: 100 }}>
      <ScrollView style={{ backgroundColor: "#1E1E2B" }}>
        <View style={styles.topContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}> {donationList.name}</Text>
          </View>
          <View style={styles.cardsContainer}>
            {donationList.donationItemId.map((item, index) => (
              <Card key={index} style={styles.card}>
                <Card.Cover source={{ uri: item.image }} style={styles.image} />
                <Card.Content>
                  <Title style={styles.cardText}>{item.name}</Title>
                  <Paragraph style={styles.cardText}>
                    Description: {item.description}
                  </Paragraph>
                  <Paragraph style={styles.cardText}>
                    Condition: {item.condition}
                  </Paragraph>
                </Card.Content>
              </Card>
            ))}
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.text}>SHARE LINK</Text>
          <View style={styles.linkContainer}>
            <Text style={styles.linkText}>
              {`localhost:3000/link/${donationList._id}`}
            </Text>
            <TouchableOpacity
              onPress={copyToClipboard}
              style={styles.copyButton}
            >
              <Ionicons name="copy" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>

          <LinearGradient
            colors={["#4D81D3", "#ff3333"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.5, y: 0 }}
            style={{
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 25,
            }}
          >
            <IconButton
              icon="delete"
              color="white"
              size={30}
              onPress={deleteListHandler}
              style={styles.deleteButton}
            />
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    padding: 10,
  },
  headerContainer: {
    padding: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#a0a0e0",
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  bottomContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    color: "#FFF",
    marginBottom: 10,
    fontSize: 18,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    marginBottom: 10,
    backgroundColor: "#2E2E3A",
  },
  image: {
    height: 150,
  },
  cardText: {
    color: "#FFF",
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#FFF",
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
  },
  linkText: {
    color: "#FFF",
    marginRight: 10,
  },
  copyButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    borderRadius: 24,
  },
});

export default DonationDetail;
