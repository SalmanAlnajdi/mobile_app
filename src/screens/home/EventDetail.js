// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Button,
//   TouchableOpacity,
// } from "react-native";
// import React from "react";
// import { useNavigation } from "@react-navigation/native";
// import { LinearGradient } from "expo-linear-gradient";

// const EventDetail = ({ route }) => {
//   const { event } = route.params;
//   const navigation = useNavigation();

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text style={{ fontSize: 30 }}>EventDetail</Text>
//       <Text style={{ fontSize: 24 }}>{event.name}</Text>
//       <Text>{event.description}</Text>
//       <Text>{event.date}</Text>
//       <Text>{event.time}</Text>
//       <Text>{event.address}</Text>
//       <Text>{event.location}</Text>
//       <Image
//         source={{ uri: event.image }}
//         style={{ width: 100, height: 100 }}
//       />

//       <LinearGradient
//         colors={["#4D81D3", "#9765B5"]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//         style={{
//           borderRadius: 10,
//           marginBottom: 20,
//           width: "60%",
//           alignItems: "center",
//         }}
//       >
//         <TouchableOpacity
//           onPress={() => {
//             navigation.navigate("EventDetail", { event }); // here we should navigate to the confirmatin page and send the event in params
//           }}
//         >
//           <Text style={styles.attendButtonText}>Attend?</Text>
//         </TouchableOpacity>
//       </LinearGradient>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   attendButtonText: {
//     padding: 15,
//     color: "#fff",
//     alignItems: "center",
//   },
// });

// export default EventDetail;

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons"; // Make sure to install @expo/vector-icons if not already installed

const EventDetail = ({ route }) => {
  const { event } = route.params;
  const navigation = useNavigation();

  const handleVolunteerPress = () => {
    Alert.alert(
      "Confirmation",
      "Do you want to volunteer for this event?",
      [
        {
          text: "No",
          onPress: () => console.log("No Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => console.log("yes Pressed"),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Image source={{ uri: event.owner.avatar }} style={styles.avatar} /> */}
        <Text style={styles.ownerName}>{event.username}</Text>
      </View>
      <Image source={{ uri: event.image }} style={styles.eventImage} />
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <FontAwesome name="map-marker" size={16} color="#FFF" />
            <Text style={styles.infoText}>
              {event.location},{event.address}
            </Text>
          </View>
          <View style={styles.infoBox}>
            <FontAwesome name="calendar" size={16} color="#FFF" />
            <Text style={styles.infoText}>{event.date}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <FontAwesome name="clock-o" size={16} color="#FFF" />
            <Text style={styles.infoText}>{event.time}</Text>
          </View>
          <View style={styles.infoBox}>
            <FontAwesome name="users" size={16} color="#FFF" />
            <Text style={styles.infoText}>
              {event.participants} participants
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsHeader}>Event details</Text>
        <Text style={styles.detailsText}>{event.description}</Text>
      </View>
      <LinearGradient
        colors={["#4D81D3", "#9765B5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.volunteerButton}
      >
        <TouchableOpacity onPress={handleVolunteerPress}>
          <Text style={styles.volunteerButtonText}>Volunteer</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E2B",
    alignItems: "center",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  ownerName: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  eventImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoContainer: {
    width: "100%",
    marginBottom: 20,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#29293E",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: 190,
    height: 40,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoText: {
    color: "#FFF",
    marginLeft: 10,
  },
  detailsContainer: {
    width: "100%",
    marginBottom: 20,
  },
  detailsHeader: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailsText: {
    color: "#FFF",
    fontSize: 16,
    lineHeight: 24,
  },
  volunteerButton: {
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  volunteerButtonText: {
    padding: 15,
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EventDetail;
