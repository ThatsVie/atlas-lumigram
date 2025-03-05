import { useRouter } from "expo-router";
import { 
  View, Text, Image, Pressable, StyleSheet, FlatList, Dimensions, ActivityIndicator 
} from "react-native";
import { useProfile } from "@/context/ProfileContext";
import { useAuth } from "@/context/AuthProvider";
import { getUserPosts } from "@/lib/firestore";
import { useEffect, useState } from "react";

const screenWidth = Dimensions.get("window").width;
const imageSize = screenWidth / 3;

export default function ProfileScreen() {
  const router = useRouter();
  const { profileImage, username } = useProfile();
  const { user } = useAuth();
  const [posts, setPosts] = useState<{ id: string; imageUrl: string; caption?: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      if (!user) return;
      setLoading(true);
      try {
        const { posts } = await getUserPosts(user.uid, null);
        setPosts(posts);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
      setLoading(false);
    }

    fetchPosts();
  }, [user]);

  return (
    <View style={styles.container}>
      <Pressable 
        onPress={() => router.push("/profile/edit")} 
        style={styles.profileSection} 
        accessibilityRole="button"
      >
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      </Pressable>
      <Text style={styles.username}>{username}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#1ED2AF" />
      ) : posts.length === 0 ? (
        <Text style={styles.emptyText}>No posts yet. Add some!</Text>
      ) : (
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.imageUrl }}
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