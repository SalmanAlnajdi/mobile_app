import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import getAllEvents from "../apis/events";
import { useQuery } from "@tanstack/react-query";

const EventCard = () => {
  const navigation = useNavigation();
  const { data: EventData, isLoading } = useQuery({
    queryKey: ["getAllEvents"],
    queryFn: getAllEvents,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <View style={styles.cardContainer}>
      {EventData?.map((event) => (
        <View key={event._id} style={styles.card}>
          <Image
            style={styles.cardImage}
            source={{
              uri: event.image
                ? `http://localhost:8000/${event.image}`
                : "path/to/default/placeholder.jpg",
            }}
            onError={(e) =>
              (e.nativeEvent.error = {
                uri: "https://www.foodiesfeed.com/wp-content/uploads/2023/09/healthy-food.jpg",
              })
            }
          />
          <View style={styles.cardBody}>
            <Text>Recipe ID: {event._id}</Text>
            <Text style={styles.cardTitle}>Title: {event.name}</Text>
            <Text>User: {event.user.username}</Text>
          </View>
        </View>
      ))}
      <Text>EventCard</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("EventDetail");
        }}
      >
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 250,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 24,
    backgroundColor: "gray",
    margin: 10,
  },
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardBody: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EventCard;
