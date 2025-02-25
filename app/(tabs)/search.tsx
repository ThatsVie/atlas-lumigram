import { useState } from "react";
import { View, TextInput, FlatList, Text, Image, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { userSearch } from "@/placeholder";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const filteredUsers = userSearch.filter((user) =>
    user.username.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a user..."
        placeholderTextColor="#687076"
        value={query}
        onChangeText={setQuery}
        accessibilityLabel="Search Input"
      />

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.userContainer}
            onPress={() => router.push(`/profile/${item.id}`)}
            accessibilityRole="button"
          >
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <Text style={styles.username}>{item.username}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ECEDEE", padding: 10 },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 2,
    borderColor: "#1ED2AF",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  username: { fontSize: 16, fontWeight: "bold" },
});
