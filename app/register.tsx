import { View, Text, TextInput, Pressable, Image, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import * as Haptics from 'expo-haptics';

export default function RegisterScreen() {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const linkScaleAnim = useRef(new Animated.Value(1)).current;

  function handlePressIn() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true }).start();
  }

  function handlePressOut() {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start(() => {
      router.replace("/(tabs)/home");
    });
  }

  function handleLinkPressIn() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.spring(linkScaleAnim, { toValue: 0.97, useNativeDriver: true }).start();
  }

  function handleLinkPressOut(route: "/register" | "/login") {
    Animated.spring(linkScaleAnim, { toValue: 1, useNativeDriver: true }).start(() => {
      router.push(route);
    });
  }

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/logo.png')} style={styles.logo} resizeMode="contain" />

      <Text accessibilityRole="header" style={styles.header}>Register</Text>

      <TextInput placeholder="Email" placeholderTextColor="#FFFFFF" style={styles.input} keyboardType="email-address" autoCapitalize="none" />
      <TextInput placeholder="Password" placeholderTextColor="#FFFFFF" style={styles.input} secureTextEntry />

      <Animated.View style={[styles.buttonContainer, { transform: [{ scale: scaleAnim }] }]}>
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.button}
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Create Account</Text>
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
  logo: { width: '100%', height: 120, marginBottom: 30 },
  header: { fontSize: 24, fontWeight: 'bold', color: "#ECEDEE", marginBottom: 20 },
  input: { width: '90%', padding: 12, borderWidth: 2, borderColor: "#1ED2AF", borderRadius: 8, marginVertical: 8, color: "#ECEDEE", backgroundColor: "#00003C" },
  buttonContainer: { width: '90%', alignItems: 'center', marginTop: 20 },
  button: { width: '100%', backgroundColor: "#1ED2AF", padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
  linkContainer: { width: '90%', alignItems: 'center', marginTop: 10 },
  link: { width: '100%', padding: 12, borderWidth: 2, borderColor: '#000000', borderRadius: 8, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3 },
  linkText: { color: '#FFFFFF', fontSize: 16 },
});
