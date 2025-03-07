import React from "react";
import { 
  Modal, View, Image, TouchableOpacity, StyleSheet, 
  Dimensions, Alert 
} from "react-native";
import { useAuth } from "@/context/AuthProvider";
import { deletePost } from "@/lib/firestore";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const enlargedSize = screenWidth * 0.8;

interface ImageModalProps {
  visible: boolean;
  imageUrl: string | null;
  onClose: () => void;
  postId: string | null;
  userId: string | null; // Owner of the post
  refreshPosts?: () => void; // Function to refresh posts after deletion
}

const ImageModal: React.FC<ImageModalProps> = ({ 
  visible, imageUrl, onClose, postId, userId, refreshPosts 
}) => {
  const { user } = useAuth();
  const isOwner = user?.uid === userId; // Check if logged-in user is the owner

  async function handleDelete() {
    if (!postId || !imageUrl) return;

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
              await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
              await deletePost(postId, imageUrl);
              await refreshPosts?.(); // Refresh posts after deletion
              onClose();
              Alert.alert("Success", "Post deleted successfully.");
            } catch (error) {
              Alert.alert("Error", "Failed to delete the post. Please try again.");
            }
          },
        },
      ]
    );
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBackground}>
        <TouchableOpacity onPress={onClose} style={styles.modalCloseArea}>
          {imageUrl && <Image source={{ uri: imageUrl }} style={styles.enlargedImage} />}
        </TouchableOpacity>

        {/* Show delete button only if user owns the post */}
        {isOwner && (
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Ionicons name="trash" size={28} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  modalCloseArea: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  enlargedImage: {
    width: enlargedSize,
    height: enlargedSize,
    borderRadius: 10,
  },
  deleteButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(255, 0, 0, 0.8)",
    padding: 12,
    borderRadius: 50,
  },
});

export default ImageModal;
