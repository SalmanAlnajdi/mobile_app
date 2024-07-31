import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const mockRatings = [
  { subject: "Respect", rating: 4.6 },
  { subject: "Discipline", rating: 4.8 },
  { subject: "cooperation", rating: 4.2 },
  { subject: "responsibility", rating: 3.8 },
];

const FeedBackCard = () => {
  return (
    <View style={styles.card}>
      {mockRatings.map((item, index) => (
        <View key={index} style={styles.ratingContainer}>
          <Text style={styles.subject}>{item.subject}</Text>
          <View style={styles.rating}>
            {Array.from({ length: 5 }, (_, i) => (
              <FontAwesome
                key={i}
                name="star"
                size={20}
                color={i < Math.floor(item.rating) ? "#FFD700" : "#d3d3d3"}
              />
            ))}
            <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#323048",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    padding: 15,
    justifyContent: "center",
    alignContent: "center",
  },
  ratingContainer: {
    marginBottom: 15,
  },
  subject: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 5,
  },
});

export default FeedBackCard;
