import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const DonationCard = ({ donationList }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.title}>
          List name: {donationList.name ? donationList.name : "no name"}
        </Text>
        <View style={styles.circleContainer}>
          {donationList.donationItemId &&
            donationList.donationItemId.map((item, index) => (
              <View key={index} style={styles.circle}>
                <Text style={styles.circleText}>{item.name}</Text>
              </View>
            ))}
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("DonationDetail", { donationList });
          }}
        >
          <Text style={styles.seeMore}>see more</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#323048",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
    marginLeft: 14,
    width: 400,
    height: 150,
  },

  content: {
    padding: 15,
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },

  seeMore: {
    color: "#a0a0e0",
    fontSize: 14,
    textAlign: "right",
  },

  circleContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },

  circle: {
    width: 35,
    height: 35,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },

  circleText: {
    color: "#323048",
    textAlign: "center",
  },
});

export default DonationCard;
