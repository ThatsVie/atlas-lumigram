import { useState } from "react";
import { View, StyleSheet, Image, TextInput, Pressable, Text, Alert } from "react-native";
import { useImagePicker } from "@/hooks/useImagePicker";
import * as Haptics from "expo-haptics";
import { usePosts } from "@/context/PostContext";

export default function AddPostScreen() {
  const { image, openImagePicker, reset } = useImagePicker();
  const { addPost } = usePosts();
  const [caption, setCaption] = useState("");

  async function handleChoosePhoto() {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    openImagePicker();
  }

  function handleSave() {
    if (!image) {
      Alert.alert("Error", "Please select an image before saving.");
      return;
    }

    if (!caption.trim()) {
      Alert.alert(
        "Add a Caption?",
        "Would you like to save this post without a caption?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Save without Caption", onPress: () => savePost("") },
        ]
      );
    } else {
      savePost(caption);
    }
  }

  function savePost(finalCaption: string) {
    if (!image) {
      Alert.alert("Error", "No image selected.");
      return;
    }
  
    addPost(image, finalCaption || ""); 
    Alert.alert("Success", "Post saved to your profile!");
    reset();
    setCaption("");
  }
  
  function handleReset() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    reset();
    setCaption("");
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <>
          <Image source={require("@/assets/images/placeholder.png")} style={styles.image} />
          <Pressable onPress={handleChoosePhoto} style={styles.choosePhotoButton} accessibilityRole="button">
            <Text style={styles.buttonText}>Choose a photo</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Image source={{ uri: image }} style={styles.image} accessibilityLabel="Selected Image Preview" />
          <TextInput
            style={styles.input}
            placeholder="Add a caption"
            placeholderTextColor="#687076"
            value={caption}
            onChangeText={setCaption}
            accessibilityLabel="Caption Input"
            accessibilityHint="Enter a caption for your post"
          />
          <Pressable onPress={handleSave} style={styles.saveButton} accessibilityRole="button">
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
          <Pressable onPress={handleReset} style={styles.resetButton} accessibilityRole="button">
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
});
