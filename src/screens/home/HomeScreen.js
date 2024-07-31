import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import EventCard from "../../components/EventCard";
import { useQuery } from "@tanstack/react-query";
import getAllEvents from "../../apis/events";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

const HomeScreen = () => {
  const {
    data: events,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getAllEvents"],
    queryFn: () => getAllEvents(),
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("All");

  useEffect(() => {
    filterEvents();
  }, [searchQuery, selectedAddress, events]);

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const handleFilter = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownVisible(false);
  };

  const filterEvents = () => {
    const filtered = events?.filter((event) => {
      const matchesAddress =
        selectedAddress === "All" ||
        event.address?.toLowerCase() === selectedAddress.toLowerCase();
      const matchesName = event.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesAddress && matchesName;
    });
    setFilteredEvents(filtered);
  };

  const addressOptions = [
    "All",
    ...new Set(events?.map((event) => event.address)),
  ];

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading events...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error loading events</Text>
      </View>
    );
  }

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
          style={styles.filterButton}
        >
          <TouchableOpacity onPress={handleFilter}>
            <FontAwesome name="sliders" size={24} color="#FFF" />
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <ScrollView style={styles.scrollView}>
        {isDropdownVisible && (
          <View style={styles.dropdown}>
            {addressOptions.map((address, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleAddressSelect(address)}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownItemText}>{address}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {filteredEvents?.map((event) => (
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
    flex: 1,
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
    borderColor: "#4583D5",
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 8,
    backgroundColor: "#1E1E2B",
    color: "#fff",
    borderRadius: 10,
  },
  filterButton: {
    borderRadius: 10,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  dropdown: {
    backgroundColor: "#2E2E3D",
    borderRadius: 10,
    padding: 10,
    width: "60%",
    maxHeight: 200,
    position: "absolute",
    zIndex: 1,
    top: 0,
    right: 0,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomColor: "#444",
    borderBottomWidth: 1,
  },
  dropdownItemText: {
    color: "#fff",
    fontSize: 16,
  },
  scrollView: {
    width: "100%",
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
  },
  errorText: {
    color: "#ff0000",
    fontSize: 18,
  },
});

export default HomeScreen;
