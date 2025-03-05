import { useState, useEffect, useRef } from "react";
import { 
  View, TextInput, FlatList, Text, Image, Pressable, StyleSheet, ActivityIndicator 
} from "react-native";
import { useRouter } from "expo-router";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export default function SearchScreen() {
  const [queryText, setQueryText] = useState("");
  const [users, setUsers] = useState<{ id: string; username: string; profileImage: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const lastQueryText = useRef<string>(""); // Store last query to avoid redundant API calls
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUsers() {
      if (!queryText.trim() || queryText === lastQueryText.current) return;
      lastQueryText.current = queryText; // Store the latest query to prevent redundant API calls

      setLoading(true);
      try {
        const usersRef = collection(db, "users");
        const userQuery = query(usersRef, orderBy("username"), limit(20)); // Order by username

        const snapshot = await getDocs(userQuery);
        const usersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as { username: string; profileImage: string }),
        }));

        // apply case-insensitive filtering locally
        const filteredUsers = usersList.filter((user) =>
          user.username.toLowerCase().includes(queryText.toLowerCase())
        );

        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
      setLoading(false);
    }

    //  Debounce API calls - aait 300ms after typing stops
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(fetchUsers, 300);

    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, [queryText]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a user..."
        placeholderTextColor="#687076"
        value={queryText}
        onChangeText={setQueryText}
        accessibilityLabel="Search Input"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#1ED2AF" />
      ) : users.length === 0 ? (
        <Text style={styles.noResults}>No users found.</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              style={styles.userContainer}
              onPress={() => router.push(`/profile/${item.id}`)}
              accessibilityRole="button"
            >
              <Image source={{ uri: item.profileImage }} style={styles.avatar} />
              <Text style={styles.username}>{item.username}</Text>
            </Pressable>
          )}
        />
      )}
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
  noResults: { textAlign: "center", fontSize: 16, color: "#687076", marginTop: 20 },
});
