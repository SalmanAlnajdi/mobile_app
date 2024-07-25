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
            <Text style={styles.itemName}>Name: {item.name}</Text>
            <Text style={styles.itemDescription}>
              Description: {item.description}
            </Text>
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.image} />
            )}
            <Text style={styles.itemCondition}>
              Condition: {item.condition}
            </Text>
            <Text style={styles.itemReceiver}>
              Receiver ID: {item.receiverId}
            </Text>
          </View>
        ))}
      </ScrollView>
      <Pressable
        onPress={() => navigation.navigate("HomeDonatios")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Confirm</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1E1E2B",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
  },
  item: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  itemCondition: {
    fontSize: 16,
  },
  itemReceiver: {
    fontSize: 16,
  },
  button: {
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 12,
    marginTop: 20,
  },
});

export default DonationConfirm;
