import { useState, useEffect } from "react";
import { 
  View, Text, Image, Pressable, StyleSheet, 
  FlatList, Dimensions, ActivityIndicator, RefreshControl, Modal, TouchableOpacity 
} from "react-native";
import { useRouter } from "expo-router";
import { useProfile } from "@/context/ProfileContext";
import { useAuth } from "@/context/AuthProvider";

const screenWidth = Dimensions.get("window").width;
const imageSize = screenWidth / 3;
const enlargedSize = screenWidth * 0.8;

export default function ProfileScreen() {
  const router = useRouter();
  const { profileImage, username, posts, refreshProfilePosts } = useProfile();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // pull-to-refresh action
  async function handleRefresh() {
    setRefreshing(true);
    await refreshProfilePosts();
    setRefreshing(false);
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
            <Pressable onPress={() => setSelectedImage(item.imageUrl)}>
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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      )}

      {/* Image Modal for Enlarged View */}
      <Modal visible={!!selectedImage} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <TouchableOpacity onPress={() => setSelectedImage(null)} style={styles.modalCloseArea}>
            <Image source={{ uri: selectedImage! }} style={styles.enlargedImage} />
          </TouchableOpacity>
        </View>
      </Modal>
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
  modalBackground: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.8)" },
  modalCloseArea: { width: "100%", height: "100%", justifyContent: "center", alignItems: "center" },
  enlargedImage: { width: enlargedSize, height: enlargedSize, borderRadius: 10 },
});
