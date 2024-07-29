// import {
//   Pressable,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import React from "react";
// import { useNavigation } from "@react-navigation/native";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { deleteList } from "../../apis/donations";

// const DonationDetail = ({ route }) => {
//   const { donationList } = route.params;
//   const navigation = useNavigation();
//   const queryClient = useQueryClient();

//   const { mutate: deleteListMutation } = useMutation({
//     mutationKey: ["deleteList"],
//     mutationFn: (listId) => deleteList(listId),
//     onSuccess: () => {
//       console.log("List deleted successfully");
//       queryClient.invalidateQueries(["listsByUser"]);
//       navigation.navigate("HomeDonatios");
//     },
//   });

//   const deleteListHandler = () => {
//     // deleteList.mutate(donationList._id);
//     deleteListMutation(donationList._id);
//   };

//   return (
//     <View
//       style={{
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#1E1E2B",
//         height: "100%",
//       }}
//     >
//       <View
//         style={{
//           justifyContent: "space-between",
//           alignItems: "center",
//           gap: 10,
//         }}
//       >
//         <Text>DonationDetail</Text>
//         <Text>List name : {donationList.name}</Text>
//         <Text>items donated </Text>
//         {donationList.donationItemId.map((item, index) => (
//           <View key={index}>
//             <Text>
//               {index + 1}.{item.name}
//             </Text>
//           </View>
//         ))}

//         <Text>SHARE LINK</Text>
//         <Text>{`localhost:3000/link/${donationList._id}`}</Text>

//         <TouchableOpacity
//           style={{
//             backgroundColor: "red",
//             padding: 10,
//             height: 50,
//             justifyContent: "center",
//             alignItems: "center",

//             borderRadius: 24,
//           }}
//           onPress={deleteListHandler}
//         >
//           <Text>Delete The List </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default DonationDetail;
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Clipboard,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteList } from "../../apis/donations";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install @expo/vector-icons if not already installed
import { BASE_URL } from "../../apis";

const DonationDetail = ({ route }) => {
  const { donationList } = route.params;
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const { mutate: deleteListMutation } = useMutation({
    mutationKey: ["deleteList"],
    mutationFn: (listId) => deleteList(listId),
    onSuccess: () => {
      console.log("List deleted successfully");
      queryClient.invalidateQueries(["listsByUser"]);
      navigation.navigate("HomeDonatios");
    },
  });

  const deleteListHandler = () => {
    deleteListMutation(donationList._id);
  };

  const copyToClipboard = () => {
    Clipboard.setString(`localhost:3000/link/${donationList._id}`);
    alert("Link copied to clipboard!");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#1E1E2B" }}>
      <ScrollView style={{ backgroundColor: "#1E1E2B" }}>
        <View
          style={{ flexDirection: "column", justifyContent: "space-between" }}
        >
          <View
            style={{ flexDirection: "column", justifyContent: "space-between" }}
          >
            <Text style={styles.text}>List name: {donationList.name}</Text>

            <View
              style={{
                height: 200,
                width: "100%",
                flexDirection: "row",
                gap: 10,
                marginBottom: 10,
                flexWrap: "wrap",
              }}
            >
              {donationList.donationItemId.map(
                (item, index) => (
                  console.log(item.image),
                  (
                    <View key={index}>
                      <Image
                        source={{ uri: item.image }}
                        style={{
                          width: 180,
                          height: 200,
                          borderRadius: 10,
                        }}
                      />
                      {/* <Image
                  source={{ uri: `${BASE_URL}/${item.image}` }}
                  style={{ width: 200, height: 200 }}
                  /> */}

                      <Text style={styles.text}>Name: {item.name}</Text>

                      <Text style={styles.text}>
                        Description: {item.description}
                      </Text>
                      <Text style={styles.text}>
                        Condition: {item.condition}
                      </Text>
                    </View>
                  )
                )
              )}
            </View>
            <View style={{ flex: 1, gap: 10 }}>
              <Text style={styles.text}>SHARE LINK</Text>
              <View style={styles.linkContainer}>
                <Text
                  style={styles.linkText}
                >{`localhost:3000/link/${donationList._id}`}</Text>
                <TouchableOpacity
                  onPress={copyToClipboard}
                  style={styles.copyButton}
                >
                  <Ionicons name="copy" size={20} color="#FFF" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={deleteListHandler}
              >
                <Text style={styles.deleteButtonText}>Delete The List</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E1E2B",
    height: "100%",
  },
  innerContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  heading: {
    fontSize: 20,
    color: "#FFF",
    marginBottom: 10,
  },
  text: {
    color: "#FFF",
    marginBottom: 5,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#FFF",
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
  },
  linkText: {
    color: "#FFF",
    marginRight: 10,
  },
  copyButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#8B0000",
    padding: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
  deleteButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
});

export default DonationDetail;
