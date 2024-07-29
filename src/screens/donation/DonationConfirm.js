import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getListById } from "../../apis/donations";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

const DonationConfirm = ({ route }) => {
  const { listId } = route.params;

  const navigation = useNavigation();
  const { data, error, isLoading } = useQuery({
    queryKey: ["list", listId],
    queryFn: async ({ queryKey }) => {
      const [_key, listId] = queryKey;

      const result = await getListById(listId);

      return result;
    },
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    console.log("Error fetching data:", error);
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>List Name: {data?.name}</Text>
        <Text style={styles.subtitle}>Donation Items:</Text>
        {data?.donationItemId.map((item, index) => (
          <View key={index} style={styles.item}>
            <View>
              {item.image && (
                <Image source={{ uri: item.image }} style={styles.image} />
              )}
            </View>
            <Text style={styles.itemName}>Name: {item.name}</Text>
            <Text style={styles.itemDescription}>
              Description: {item.description}
            </Text>

            <Text style={styles.itemCondition}>
              Condition: {item.condition}
            </Text>
            <Text style={styles.itemReceiver}>
              Receiver ID: {item.receiverId}
            </Text>
          </View>
        ))}
      </ScrollView>
      {/* <Pressable
        onPress={() => navigation.navigate("HomeDonatios")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Confirm</Text>
      </Pressable> */}
      <LinearGradient
        colors={["#4D81D3", "#14933A"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
          width: "100%",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("HomeDonatios")}>
          <Text style={styles.signInButtonText}>Confirm </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
    backgroundColor: "#1E1E2B",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#fff",
  },
  name: {
    fontSize: 18,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    color: "#fff",
  },
  item: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#29293E",
    borderRadius: 8,
    color: "#fff",
    width: "90%",
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  itemDescription: {
    fontSize: 16,
    marginBottom: 8,
    color: "#fff",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  itemCondition: {
    fontSize: 16,
    color: "#fff",
  },
  itemReceiver: {
    fontSize: 16,
    color: "#fff",
  },
  button: {
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 12,
    marginTop: 20,
  },
});

export default DonationConfirm;
