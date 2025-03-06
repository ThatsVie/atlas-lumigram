import { createContext, useState, useContext, useEffect } from "react";
import {
  doc, getDoc, setDoc, updateDoc, collection, query, where, onSnapshot, getDocs, orderBy
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/firebaseConfig";
import { useAuth } from "./AuthProvider";

interface ProfileContextType {
  username: string;
  profileImage: string;
  posts: { id: string; imageUrl: string; caption: string }[];
  setUsername: (username: string) => Promise<void>;
  setProfileImage: (imageUri: string) => Promise<void>;
  refreshProfilePosts: () => Promise<void>;
  loading: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [username, setUsernameState] = useState("loading...");
  const [profileImage, setProfileImageState] = useState("");
  const [posts, setPosts] = useState<{ id: string; imageUrl: string; caption: string }[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch profile data
  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;

      setLoading(true);
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const { username, profileImage } = userDoc.data();
          setUsernameState(username || "User");
          setProfileImageState(profileImage || "https://placedog.net/400/400");
        } else {
          await setDoc(doc(db, "users", user.uid), {
            username: `User-${user.uid.substring(0, 5)}`,
            profileImage: "https://placedog.net/400/400",
          });
          setUsernameState(`User-${user.uid.substring(0, 5)}`);
          setProfileImageState("https://placedog.net/400/400");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
      setLoading(false);
    }

    fetchProfile();
  }, [user]);

  // Subscribe to real-time profile posts updates
  useEffect(() => {
    if (!user) return;

    const postsQuery = query(
      collection(db, "posts"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const updatedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as { imageUrl: string; caption: string }),
      }));
      setPosts(updatedPosts);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  async function setUsername(newUsername: string) {
    if (!user) return;
    try {
      await updateDoc(doc(db, "users", user.uid), { username: newUsername });
      setUsernameState(newUsername);
    } catch (error) {
      console.error("Error updating username:", error);
    }
  }

  async function setProfileImage(imageUri: string) {
    if (!user) return;

    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const storageRef = ref(storage, `profileImages/${user.uid}.jpg`);

      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      await updateDoc(doc(db, "users", user.uid), { profileImage: downloadURL });
      setProfileImageState(downloadURL);
    } catch (error) {
      console.error("Error uploading profile image:", error);
    }
  }

  async function refreshProfilePosts() {
    if (!user) return;
    setLoading(true);
    try {
      const postsQuery = query(
        collection(db, "posts"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(postsQuery);
      const updatedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as { imageUrl: string; caption: string }),
      }));
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error refreshing posts:", error);
    }
    setLoading(false);
  }

  return (
    <ProfileContext.Provider value={{ username, profileImage, posts, setUsername, setProfileImage, refreshProfilePosts, loading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfile must be used within a ProfileProvider");
  return context;
};
