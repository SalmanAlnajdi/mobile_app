import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
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
    return (
      <ActivityIndicator
        size="large"
        color="#FFFFFF"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  if (error) {
    console.log("Error fetching data:", error);
    return <Text style={styles.errorText}>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Summary</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.sectionContainer}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
              color: "#9765B5",
            }}
          >
            List Name:
          </Text>
          <Text style={styles.title}>{data?.name}</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.subtitle}>Donation Items:</Text>
          {data?.donationItemId.map((item, index) => (
            <View key={index} style={styles.item}>
              {item.image && (
                <Image source={{ uri: item.image }} style={styles.image} />
              )}
              <View style={styles.itemDetails}>
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
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("HomeDonatios")}>
          <LinearGradient
            colors={["#4D81D3", "#14933A"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E1E2B",
    padding: 16,
    width: "100%",
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  headerContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    borderBottomColor: "#a0a0e0",
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "white",
  },
  sectionContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#29293E",
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#9765B5",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#29293E",
    borderRadius: 8,
    color: "#fff",
    width: "100%",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 16,
    marginBottom: 4,
    color: "#fff",
  },
  itemCondition: {
    fontSize: 16,
    marginBottom: 4,
    color: "#fff",
  },
  itemReceiver: {
    fontSize: 16,
    color: "#fff",
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 80,
  },
  gradientButton: {
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "#ff0000",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default DonationConfirm;
