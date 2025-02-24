import { useRouter } from "expo-router";
import { View, Text, Image, Pressable, StyleSheet, FlatList, Dimensions } from "react-native";
import { profileFeed } from "@/placeholder";
import { useProfile } from "@/context/ProfileContext";

const screenWidth = Dimensions.get("window").width;
const imageSize = screenWidth / 3;

export default function ProfileScreen() {
  const router = useRouter();
  const { profileImage, username } = useProfile();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push("/profile/edit")} style={styles.profileSection}>
        <Image
          source={{ uri: profileImage }}
          style={styles.profileImage}
          accessibilityRole="imagebutton"
          accessibilityLabel="Edit Profile Picture"
        />
      </Pressable>
      <Text style={styles.username}>{username}</Text>

      <FlatList
        data={profileFeed}
        renderItem={({ item }) => (
          <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
        )}
        keyExtractor={(item) => item.id}
        numColumns={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", backgroundColor: "#ECEDEE" },
  profileSection: { alignItems: "center", marginVertical: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  username: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  image: { width: imageSize, height: imageSize },
});
