import { createContext, useState, useContext } from "react";

interface ProfileContextType {
  username: string;
  profileImage: string;
  setUsername: (username: string) => void;
  setProfileImage: (image: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState("pink-flowers23131");
  const [profileImage, setProfileImage] = useState("https://placedog.net/400/400");

  return (
    <ProfileContext.Provider value={{ username, profileImage, setUsername, setProfileImage }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
