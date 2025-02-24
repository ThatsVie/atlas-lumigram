import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, FlatList, StyleSheet, Dimensions } from "react-native";
import { profileFeed, userSearch } from "@/placeholder";

const screenWidth = Dimensions.get("window").width;
const imageSize = screenWidth / 3;

export default function UserProfile() {
  const { id } = useLocalSearchParams();
  const user = userSearch.find((u) => u.id === id);

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Image source={{ uri: user.avatar }} style={styles.profileImage} />
          <Text style={styles.username}>{user.username}</Text>
          <FlatList
            data={profileFeed}
            renderItem={({ item }) => (
              <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
            )}
            keyExtractor={(item) => item.id}
            numColumns={3}
          />
        </>
      ) : (
        <Text>User not found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", backgroundColor: "#ECEDEE", padding: 10 },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  username: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  image: { width: imageSize, height: imageSize },
});
