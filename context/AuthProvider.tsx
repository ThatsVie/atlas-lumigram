import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {
  User, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { auth, db } from "@/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";

type AuthContextType = {
  user: User | null;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function fetchUserProfile(userId: string) {
    const userDocRef = doc(db, "users", userId);

    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) return;

    try {
      const userSnap = await getDoc(userDocRef);
      if (!userSnap.exists()) {
        await setDoc(userDocRef, { username: "NewUser", profileImage: "" });
      }
    } catch (error) {
      console.error("Firestore profile fetch failed:", error);
    }
  }

  // Initialize Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log("User logged in:", currentUser.uid);
        setUser(currentUser);
        await fetchUserProfile(currentUser.uid);
        await AsyncStorage.setItem("user", JSON.stringify(currentUser));
        router.replace("/(tabs)/home");
      } else {
        console.log("No user found. Staying on login page.");
        setUser(null);
        await AsyncStorage.removeItem("user");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function register(email: string, password: string) {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;
      setUser(newUser);
      await AsyncStorage.setItem("user", JSON.stringify(newUser));

      await setDoc(doc(db, "users", newUser.uid), {
        username: email.split("@")[0],
        profileImage: "https://placedog.net/400/400",
      });

      Alert.alert("Success", "Account created successfully!");
      setTimeout(() => {
        router.replace("/(tabs)/home");
      }, 1000);
    } catch (error) {
      Alert.alert("Error", "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    setLoading(true);
    try {
      console.log("🔹 Attempting login...");
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      console.log("Login successful:", userCredential.user.uid);
      setUser(userCredential.user);
      await AsyncStorage.setItem("user", JSON.stringify(userCredential.user));
      router.replace("/(tabs)/home");
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/invalid-credential") {
          Alert.alert("Invalid Login", "Email or password is incorrect. Please try again.");
        } else if (error.code === "auth/user-not-found") {
          Alert.alert("Invalid Login", "User not found. Please check your email.");
        } else if (error.code === "auth/wrong-password") {
          Alert.alert("Invalid Login", "Incorrect password. Please try again.");
        } else {
          Alert.alert("Login Failed", `Error: ${error.message}`);
        }
      } else {
        Alert.alert("Login Failed", "An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      await AsyncStorage.removeItem("user");
      router.replace("/login");
    } catch (error) {
      Alert.alert("Error", "Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
