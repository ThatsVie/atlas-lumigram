import { useState, useEffect, useRef } from "react";
import { 
  View, StyleSheet, Image, TextInput, Pressable, Text, 
  Alert, ActivityIndicator 
} from "react-native";
import { useImagePicker } from "@/hooks/useImagePicker";
import * as Haptics from "expo-haptics";
import { usePosts } from "@/context/PostContext";

export default function AddPostScreen() {
  const { image, openImagePicker, reset } = useImagePicker();
  const { addPost, loading } = usePosts();
  const [caption, setCaption] = useState("");
  const isSubmitting = useRef(false); // Prevents duplicate submissions

  // Ensures UI resets after a successful post
  useEffect(() => {
    if (!loading) {
      reset();
      setCaption("");
      isSubmitting.current = false; // Unlock submission after completion
    }
  }, [loading]);

  // Handles selecting a photo
  async function handleChoosePhoto() {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    openImagePicker();
  }

  // Handles post submission.
  async function handleSave() {
    if (!image || loading || isSubmitting.current) {
      Alert.alert("Error", "Please select an image before saving.");
      return;
    }

    isSubmitting.current = true; // Lock to prevent duplicates

    if (!caption.trim()) {
      Alert.alert(
        "Add a Caption?",
        "Would you like to save this post without a caption?",
        [
          { text: "Cancel", style: "cancel", onPress: () => (isSubmitting.current = false) },
          { text: "Save without Caption", onPress: () => savePost("") },
        ]
      );
    } else {
      await savePost(caption);
    }
  }

  // Saves the post by uploading the image and storing post details.
  async function savePost(finalCaption: string) {
    if (!image || loading) {
      Alert.alert("Error", "No image selected or upload in progress.");
      isSubmitting.current = false; // Unlock if canceled
      return;
    }

    try {
      console.log("Uploading post...");
      await addPost(image, finalCaption || "");

      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert("Success", "Post saved to your profile!");

      // Ensuring UI resets properly
      setTimeout(() => {
        reset();
        setCaption("");
        isSubmitting.current = false; // Unlock for next post
      }, 500);
    } catch (error) {
      console.error("Error saving post:", error);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert("Upload Failed", "Something went wrong. Please try again.");
      isSubmitting.current = false; // Unlock in case of failure
    }
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <>
          <Image source={require("@/assets/images/placeholder.png")} style={styles.image} />
          <Pressable 
            onPress={handleChoosePhoto} 
            style={[styles.choosePhotoButton]} 
            accessibilityRole="button"
            disabled={loading}
          >
            <Text style={styles.buttonText}>Choose a photo</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Image 
            source={{ uri: image }} 
            style={styles.image} 
            accessibilityLabel="Selected Image Preview" 
          />
          <TextInput
            style={styles.input}
            placeholder="Add a caption"
            placeholderTextColor="#687076"
            value={caption}
            onChangeText={setCaption}
            accessibilityLabel="Caption Input"
            accessibilityHint="Enter a caption for your post"
            editable={!loading}
          />
          <Pressable 
            onPress={handleSave} 
            style={[styles.saveButton, loading && styles.disabledButton]} 
            accessibilityRole="button"
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Save</Text>
            )}
          </Pressable>
          <Pressable 
            onPress={() => { reset(); setCaption(""); isSubmitting.current = false; }} // reset
            style={styles.resetButton} 
            accessibilityRole="button"
            disabled={loading}
          >
            <Text style={styles.resetButtonText}>Reset</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#ECEDEE", padding: 20 },
  image: { width: 300, height: 300, borderRadius: 10, marginBottom: 20 },
  choosePhotoButton: { backgroundColor: "#1ED2AF", padding: 12, borderRadius: 8, alignItems: "center", width: "80%" },
  input: { width: "100%", padding: 10, borderWidth: 2, borderColor: "#1ED2AF", borderRadius: 8, marginBottom: 10 },
  saveButton: { backgroundColor: "#1ED2AF", padding: 12, borderRadius: 8, alignItems: "center", width: "60%", marginBottom: 10 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  resetButton: { backgroundColor: "#ECEDEE", padding: 12, borderRadius: 8, alignItems: "center", width: "60%" },
  resetButtonText: { color: "#000", fontSize: 16 },
  disabledButton: { opacity: 0.5 },
});
