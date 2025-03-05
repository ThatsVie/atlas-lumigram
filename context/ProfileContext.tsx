import { createContext, useState, useContext, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/firebaseConfig";
import { useAuth } from "./AuthProvider";

interface ProfileContextType {
  username: string;
  profileImage: string;
  setUsername: (username: string) => Promise<void>;
  setProfileImage: (imageUri: string) => Promise<void>;
  loading: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [username, setUsernameState] = useState("loading...");
  const [profileImage, setProfileImageState] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;

      setLoading(true);
      try {
        console.log("🔍 Fetching profile data...");
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const { username, profileImage } = userDoc.data();
          setUsernameState(username || "User");
          setProfileImageState(profileImage || "https://placedog.net/400/400");
        } else {
          console.warn("No profile found, creating default profile.");
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

  async function setUsername(newUsername: string) {
    if (!user) return;
    try {
      console.log(`Updating username to: ${newUsername}`);
      await updateDoc(doc(db, "users", user.uid), { username: newUsername });
      setUsernameState(newUsername);
    } catch (error) {
      console.error("Error updating username:", error);
    }
  }

  async function setProfileImage(imageUri: string) {
    if (!user) return;

    try {
      console.log("Uploading new profile image...");
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const storageRef = ref(storage, `profileImages/${user.uid}.jpg`);

      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      await updateDoc(doc(db, "users", user.uid), { profileImage: downloadURL });
      setProfileImageState(downloadURL);

      console.log("Profile image updated successfully!");
    } catch (error) {
      console.error("Error uploading profile image:", error);
    }
  }

  return (
    <ProfileContext.Provider value={{ username, profileImage, setUsername, setProfileImage, loading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfile must be used within a ProfileProvider");
  return context;
};
