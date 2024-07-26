import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import EventCard from "../../components/EventCard";
import { useQuery } from "@tanstack/react-query";
import getAllEvents from "../../apis/events";

const HomeScreen = () => {
  const { data: events } = useQuery({
    queryKey: ["getAllEvents"],
    queryFn: () => getAllEvents(),
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
        <TouchableOpacity style={styles.filterButton}>
          <Image
            // source={require("../../assets/filter-icon.png")} // Add your filter icon image here
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        {events?.map((event) => (
          <EventCard event={event} key={event._id} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#1E1E2B",
    padding: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#29293E",
    borderRadius: 20,
    paddingHorizontal: 15,
    color: "#FFF",
    fontSize: 16,
    marginRight: 10,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#6165F6",
    justifyContent: "center",
    alignItems: "center",
  },
  filterIcon: {
    width: 20,
    height: 20,
    tintColor: "#FFF",
  },
  scrollView: {
    width: "100%",
  },
});

export default HomeScreen;
