import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import * as Haptics from 'expo-haptics';

export default function LogoutComponent() {
  const router = useRouter();

  function handleLogout() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.replace('/login');
  }

  return (
    <Pressable 
      onPress={handleLogout} 
      style={{ padding: 10 }}
      accessibilityRole="button"
      accessibilityLabel="Logout"
    >
      <Ionicons name="log-out-outline" size={24} color={Colors.light.tint} />
    </Pressable>
  );
}
