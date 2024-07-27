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
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteList } from "../../apis/donations";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install @expo/vector-icons if not already installed

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
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>DonationDetail</Text>
        <Text style={styles.text}>List name: {donationList.name}</Text>
        <Text style={styles.text}>Items donated:</Text>
        {donationList.donationItemId.map((item, index) => (
          <View key={index}>
            <Text style={styles.text}>
              {index + 1}. {item.name}
            </Text>
          </View>
        ))}

        <Text style={styles.text}>SHARE LINK</Text>
        <View style={styles.linkContainer}>
          <Text
            style={styles.linkText}
          >{`localhost:3000/link/${donationList._id}`}</Text>
          <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
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
