import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function UserProfile() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text accessibilityRole="header" style={{ fontSize: 24, fontWeight: 'bold' }}>My Profile</Text>
      <Text>User Profile for ID: {id}</Text>
    </View>
  );
}

export const screenOptions = {
  title: "My Profile",
};
