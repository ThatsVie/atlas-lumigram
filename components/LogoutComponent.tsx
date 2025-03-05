import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { useAuth } from "@/context/AuthProvider";

export default function LogoutComponent() {
  const { logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.replace("/login");
  }

  return (
    <Pressable 
      onPress={handleLogout} 
      style={{ padding: 10 }}
      accessibilityRole="button"
      accessibilityLabel="Logout"
    >
      <Ionicons name="log-out-outline" size={24} color="#1ED2AF" />
    </Pressable>
  );
}
