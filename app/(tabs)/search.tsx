import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function SearchScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Search</Text>

      <Link href="/profile/1">
        <Text>Profile 1</Text>
      </Link>

      <Link href="/profile/2">
        <Text>Profile 2</Text>
      </Link>

      <Link href="/profile/3">
        <Text>Profile 3</Text>
      </Link>
    </View>
  );
}
