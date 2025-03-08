import { useState, useRef } from "react";
import { 
  View, Text, TextInput, Pressable, Image, 
  StyleSheet, Animated, Alert, ActivityIndicator 
} from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { useAuth } from "@/context/AuthProvider";

export default function RegisterScreen() {
  const { register } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const linkScaleAnim = useRef(new Animated.Value(1)).current;

  function isValidEmail(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
  }

  async function handleRegister() {
    if (loading) return;

    const trimmedEmail = email.trim();
    
    if (!trimmedEmail || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    console.log("Register button pressed.");

    try {
      await register(trimmedEmail, password);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      console.log("Registration successful. Navigating...");
      Alert.alert("Success", "Account Created!", [
        {
          text: "OK",
          onPress: () => {
            setLoading(false);
            router.replace("/(tabs)/home");
          },
        },
      ]);
    } catch (error: any) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      console.error("Registration failed:", error);
      Alert.alert("Registration Failed", error.message || "Unable to create account.");
      setLoading(false);
    }
  }

  function handlePressIn() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true }).start();
  }

  function handlePressOut() {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start(handleRegister);
  }

  function handleLinkPressIn() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.spring(linkScaleAnim, { toValue: 0.97, useNativeDriver: true }).start();
  }

  function handleLinkPressOut(route: "/login") {
    Animated.spring(linkScaleAnim, { toValue: 1, useNativeDriver: true }).start(() => {
      router.push(route);
    });
  }

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/LumigramPug.webp")} style={styles.logo} resizeMode="contain" />
      <Text accessibilityRole="header" style={styles.header}>Register</Text>
      
      <TextInput 
        placeholder="Email" 
        placeholderTextColor="#FFFFFF" 
        style={styles.input} 
        keyboardType="email-address" 
        autoCapitalize="none" 
        value={email}
        onChangeText={setEmail}
      />
      <TextInput 
        placeholder="Password" 
        placeholderTextColor="#FFFFFF" 
        style={styles.input} 
        secureTextEntry 
        value={password}
        onChangeText={setPassword}
      />

      <Animated.View style={[styles.buttonContainer, { transform: [{ scale: scaleAnim }] }]}>
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.button}
          accessibilityRole="button"
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Create Account</Text>}
        </Pressable>
      </Animated.View>

      <Animated.View style={[styles.linkContainer, { transform: [{ scale: linkScaleAnim }] }]}>
        <Pressable
          onPressIn={handleLinkPressIn}
          onPressOut={() => handleLinkPressOut("/login")}
          style={styles.link}
          accessibilityRole="link"
        >
          <Text style={styles.linkText}>Login to existing account</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#00003C", paddingHorizontal: 20 },
  logo: { width: '100%', height: 200, marginBottom: 30 },
  header: { fontSize: 24, fontWeight: 'bold', color: "#ECEDEE", marginBottom: 20 },
  input: { width: '90%', padding: 12, borderWidth: 2, borderColor: "#1ED2AF", borderRadius: 8, marginVertical: 8, color: "#ECEDEE", backgroundColor: "#00003C" },
  buttonContainer: { width: '90%', alignItems: 'center', marginTop: 20 },
  button: { width: '100%', backgroundColor: "#1ED2AF", padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
  linkContainer: { width: '90%', alignItems: 'center', marginTop: 10 },
  link: { width: '100%', padding: 12, borderWidth: 2, borderColor: '#000000', borderRadius: 8, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3 },
  linkText: { color: '#FFFFFF', fontSize: 16 },
});
