import { useState } from "react";
import { View, Text, TextInput, Pressable, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useImagePicker } from "@/hooks/useImagePicker";
import { Colors } from "@/constants/Colors";
import { useProfile } from "@/context/ProfileContext";

export default function EditProfileScreen() {
  const router = useRouter();
  const { image, openImagePicker } = useImagePicker();
  const { username, setUsername, profileImage, setProfileImage } = useProfile();
  const [tempUsername, setTempUsername] = useState(username);

  function handleSave() {
    setUsername(tempUsername);
    if (image) {
      setProfileImage(image);
    }
    alert("Profile Updated!");
    router.push("/profile");
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={openImagePicker}>
        <Image
          source={image ? { uri: image } : { uri: profileImage }}
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
        placeholderTextColor={Colors.light.icon}
      />
      <Pressable onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.buttonText}>Save profile</Text>
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
    borderColor: Colors.light.tint,
    borderRadius: 8,
    marginBottom: 10,
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: Colors.light.tint,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
