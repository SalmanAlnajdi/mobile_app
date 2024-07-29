import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DonationCard from "../../components/DonationCard";
import { getListsByUser } from "../../apis/donations";
import { useQuery } from "@tanstack/react-query";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const HomeDonations = () => {
  const navigation = useNavigation();

  const { data: listsByUser } = useQuery({
    queryKey: ["listsByUser"],
    queryFn: getListsByUser,
  });

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (text) => {
    setSearchQuery(text);
    // You can add search filtering logic here if needed
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
        <LinearGradient
          colors={["#4D81D3", "#9765B5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.searchButton}
        >
          <TouchableOpacity>
            <FontAwesome name="sliders" size={24} color="white" />
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View style={styles.scrollContainer}>
        <ScrollView>
          <View style={styles.cardContainer}>
            {listsByUser?.map((list) => (
              <DonationCard donationList={list} key={list._id} />
            ))}
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          navigation.navigate("AddDonationList");
        }}
      >
        <LinearGradient
          colors={["#4D81D3", "#9765B5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.fabButton}
        >
          <Ionicons name="add" size={24} color="white" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E2B",
    paddingTop: 50,
  },
  searchContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#4583D5",
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 8,
    backgroundColor: "#1E1E2B",
    color: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  searchButton: {
    borderRadius: 10,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    height: "100%",
    width: "100%",
  },
  cardContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    paddingBottom: 200,
  },
  fab: {
    position: "absolute",
    bottom: 100,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
  fabButton: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
});

export default HomeDonations;
