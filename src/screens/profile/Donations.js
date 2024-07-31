import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";

const Donations = () => {
  const handleSearchChange = (text) => {
    setSearchQuery(text);
    // You can add search filtering logic here if needed
  };
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1E1E2B",
      }}
    >
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
      </View>
      <View style={{ flex: 5, backgroundColor: "green", width: "100%" }}>
        <Text>Donation items receiver</Text>
      </View>
      <View style={{ flex: 40, backgroundColor: "blue", width: "100%" }}></View>
      <Text>Donations</Text>
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
    paddingTop: 7,
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
});

export default Donations;
