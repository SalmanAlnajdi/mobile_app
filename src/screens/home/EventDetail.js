import { StyleSheet, Text, View, Image, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const EventDetail = ({ route }) => {
  const { event } = route.params;
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 30 }}>EventDetail</Text>
      <Text style={{ fontSize: 24 }}>{event.name}</Text>
      <Text>{event.description}</Text>
      <Text>{event.date}</Text>
      <Text>{event.time}</Text>
      <Text>{event.location}</Text>
      <Image
        source={{ uri: event.image }}
        style={{ width: 100, height: 100 }}
      />

      <Button
        title="Attend"
        onPress={() => {
          navigation.navigate("EventDetail", { event }); // here we should navigate to the confirmatin page and send the event in params
        }}
      />
    </View>
  );
};

export default EventDetail;

const styles = StyleSheet.create({});
