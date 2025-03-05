import { useState } from "react";
import { 
  View, Text, TextInput, Pressable, Image, 
  StyleSheet, ActivityIndicator, Alert 
} from "react-native";
import { useRouter } from "expo-router";
import { useImagePicker } from "@/hooks/useImagePicker";
import { useProfile } from "@/context/ProfileContext";

export default function EditProfileScreen() {
  const router = useRouter();
  const { image, openImagePicker } = useImagePicker();
  const { username, setUsername, profileImage, setProfileImage, loading } = useProfile();
  const [tempUsername, setTempUsername] = useState(username);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!tempUsername.trim()) {
      Alert.alert("Error", "Username cannot be empty.");
      return;
    }

    setSaving(true);
    try {
      await setUsername(tempUsername.trim());
      if (image) await setProfileImage(image);
      Alert.alert("Success", "Profile Updated!");
      router.push("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    }
    setSaving(false);
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={openImagePicker}>
        <Image
          source={{ uri: image || profileImage }}
          style={styles.profileImage}
          accessibilityRole="imagebutton"
          accessibilityLabel="Change Profile Picture"
        />
      </Pressable>
      <TextInput
        style={styles.input}
        value={tempUsername}
        onChangeText={setTempUsername}
        placeholder="Enter username"
        placeholderTextColor="#687076"
      />
      <Pressable onPress={handleSave} style={styles.saveButton} disabled={saving || loading}>
        {saving ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Save profile</Text>}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#ECEDEE" },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
  input: {
    width: "80%",
    padding: 12,
    borderWidth: 2,
    borderColor: "#1ED2AF",
    borderRadius: 8,
    marginBottom: 10,
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: "#1ED2AF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
