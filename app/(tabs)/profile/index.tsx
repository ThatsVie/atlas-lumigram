import { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  FlatList,
  Dimensions,
  RefreshControl,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useProfile } from "@/context/ProfileContext";
import { useAuth } from "@/context/AuthProvider";
import ImageModal from "@/components/ImageModal";
import { deletePost } from "@/lib/firestore";
import * as Haptics from "expo-haptics"; 

const screenWidth = Dimensions.get("window").width;
const imageSize = screenWidth / 3;

export default function ProfileScreen() {
  const router = useRouter();
  const { profileImage, username, posts, refreshProfilePosts } = useProfile();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ imageUrl: string; postId: string; userId: string } | null>(null);

  // Pull-to-refresh action
  async function handleRefresh() {
    setRefreshing(true);
    await refreshProfilePosts();
    setRefreshing(false);
  }

  // Handle post deletion with haptic feedback
  async function handleDeletePost(postId: string, imageUrl: string) {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deletePost(postId, imageUrl);
              await refreshProfilePosts(); // Refresh after deletion
              await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); //  Haptic success feedback
              Alert.alert("Success", "Post deleted.");
            } catch (error) {
              await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error); //  Haptic error feedback
              Alert.alert("Error", "Failed to delete the post. Please try again.");
            }
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile Info */}
      <Pressable
        onPress={() => router.push("/profile/edit")}
        style={styles.profileSection}
        accessibilityRole="button"
      >
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      </Pressable>
      <Text style={styles.username}>{username}</Text>

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <Text style={styles.emptyText}>No posts yet. Add some!</Text>
      ) : (
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <Pressable onPress={() => setSelectedImage({ imageUrl: item.imageUrl, postId: item.id, userId: user?.uid || "" })}>
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.image}
                resizeMode="cover"
                accessibilityLabel={`Post: ${item.caption || "No caption"}`}
              />
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
          numColumns={3}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        />
      )}

      {/* Image Modal for Enlarged View */}
      <ImageModal
        visible={!!selectedImage}
        imageUrl={selectedImage?.imageUrl || null}
        postId={selectedImage?.postId || ""}
        userId={selectedImage?.userId || ""}
        onClose={() => setSelectedImage(null)}
        refreshPosts={refreshProfilePosts}
      />
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
