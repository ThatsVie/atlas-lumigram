import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
  Pressable,
} from "react-native";
import { collection, doc, getDoc, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import ImageModal from "@/components/ImageModal";
import { useAuth } from "@/context/AuthProvider";

const screenWidth = Dimensions.get("window").width;
const imageSize = screenWidth / 3;

export default function UserProfile() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const [profileUser, setProfileUser] = useState<{ username: string; profileImage: string } | null>(null);
  const [posts, setPosts] = useState<{ id: string; imageUrl: string; userId: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<{ imageUrl: string; postId: string; userId: string } | null>(null);

  useEffect(() => {
    async function fetchUserProfile() {
      if (!id) {
        Alert.alert("Error", "Invalid user profile.");
        return;
      }

      setLoading(true);
      try {
        // Fetch user profile
        const userRef = doc(db, "users", id as string);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data() as { username: string; profileImage: string };
          setProfileUser(userData);
        } else {
          setProfileUser(null);
        }

        // Fetch user posts
        const postsRef = collection(db, "posts");
        const q = query(postsRef, where("userId", "==", id), orderBy("createdAt", "desc"));
        const postSnapshots = await getDocs(q);
        const userPosts = postSnapshots.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as { imageUrl: string; userId: string }),
        }));

        setPosts(userPosts);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        Alert.alert("Error", "Failed to load user profile. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#1ED2AF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {profileUser ? (
        <>
          <Image source={{ uri: profileUser.profileImage }} style={styles.profileImage} />
          <Text style={styles.username}>{profileUser.username}</Text>
          {posts.length === 0 ? (
            <Text style={styles.emptyText}>No posts yet.</Text>
          ) : (
            <FlatList
              data={posts}
              renderItem={({ item }) => (
                <Pressable onPress={() => setSelectedImage({ imageUrl: item.imageUrl, postId: item.id, userId: item.userId })}>
                  <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
                </Pressable>
              )}
              keyExtractor={(item) => item.id}
              numColumns={3}
            />
          )}
        </>
      ) : (
        <Text style={styles.errorText}>User not found.</Text>
      )}

      {/* Image Modal for Enlarged View */}
      <ImageModal
        visible={!!selectedImage}
        imageUrl={selectedImage?.imageUrl || null}
        postId={selectedImage?.postId || ""}
        userId={selectedImage?.userId || ""}
        onClose={() => setSelectedImage(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", backgroundColor: "#ECEDEE", padding: 10 },
  centeredContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#ECEDEE" },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  username: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  image: { width: imageSize, height: imageSize },
  emptyText: { fontSize: 16, color: "#687076", marginTop: 20 },
  errorText: { fontSize: 18, color: "red", marginTop: 20 },
});
