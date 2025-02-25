import { useRouter } from "expo-router";
import { View, Text, Image, Pressable, StyleSheet, FlatList, Dimensions } from "react-native";
import { profileFeed } from "@/placeholder";
import { useProfile } from "@/context/ProfileContext";
import { usePosts } from "@/context/PostContext";

const screenWidth = Dimensions.get("window").width;
const imageSize = screenWidth / 3;

export default function ProfileScreen() {
  const router = useRouter();
  const { profileImage, username } = useProfile();
  const { posts } = usePosts();

  const combinedPosts = [...posts, ...profileFeed];

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push("/profile/edit")} style={styles.profileSection} accessibilityRole="button">
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      </Pressable>
      <Text style={styles.username}>{username}</Text>

      {combinedPosts.length === 0 ? (
        <Text style={styles.emptyText}>No posts yet. Add some!</Text>
      ) : (
        <FlatList
          data={combinedPosts}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="cover"
              accessibilityLabel={`Post: ${item.caption || "No caption"}`}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={3}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", backgroundColor: "#ECEDEE" },
  profileSection: { alignItems: "center", marginVertical: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  username: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  emptyText: { fontSize: 16, color: "#687076", marginTop: 20 },
  image: { width: imageSize, height: imageSize },
});
