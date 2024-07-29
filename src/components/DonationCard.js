import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const DonationCard = ({ donationList }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        height: 150,
        width: "90%",
        backgroundColor: "#323048",
        borderRadius: 10,
        marginBottom: 10,
        marginLeft: 14,
      }}
    >
      <View style={styles.content}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            borderBottomColor: "#a0a0e0",
            borderBottomWidth: 1,
            paddingBottom: 5,
          }}
        >
          <Text style={styles.title}>
            {donationList.name ? donationList.name : "no name"}
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.circleContainer}>
            {donationList.donationItemId &&
              donationList.donationItemId.map((item, index) => (
                <View key={index} style={styles.circle}>
                  <LinearGradient
                    colors={["#4D81D3", "#9765B5"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "100%",
                      backgroundColor: "#9765B5",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 2,
                    }}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "100%",
                      }}
                    />
                  </LinearGradient>
                </View>
              ))}
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("DonationDetail", { donationList });
              }}
            >
              <Text style={styles.seeMore}>see more</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    paddingBottom: 0,
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
    flex: 3,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    overflow: "hidden",
    borderRadius: "100%",
    paddingLeft: 5,
    backgroundColor: "#29293E",
  },

  circle: {
    width: 35,
    height: 35,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    overflow: "hidden",
  },

  circleText: {
    color: "#323048",
    textAlign: "center",
  },
});

export default DonationCard;
