import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthProvider";
import { addFavoriteToFirestore, removeFavoriteFromFirestore,
  getUserFavorites, checkIfFavorite,
} from "@/lib/firestore";

export type Favorite = {
  id: string;
  postId: string;
  userId: string;
  imageUrl: string;
  caption: string;
  createdAt: number;
};

type FavoritesContextType = {
  favorites: Favorite[];
  addFavorite: (postId: string, imageUrl: string, caption: string) => Promise<void>;
  removeFavorite: (favId: string) => Promise<void>;
  fetchFavorites: (reset?: boolean) => Promise<void>;
  isFavorite: (postId: string) => boolean;
  loadMoreFavorites: () => Promise<void>;
  loading: boolean;
  refreshing: boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [lastFavorite, setLastFavorite] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch user's favorites with pagination.
  async function fetchFavorites(reset = false) {
    if (!user?.uid) return;
    setRefreshing(true);

    try {
      const { favorites: userFavorites, lastDoc } = await getUserFavorites(user.uid, reset ? null : lastFavorite);

      if (reset) {
        setFavorites(userFavorites);
      } else {
        setFavorites((prev) => [...prev, ...userFavorites]);
      }

      setLastFavorite(lastDoc);
      console.log(`Loaded ${userFavorites.length} favorites`);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }

  // Adds a post to the user's favorites.
  async function addFavorite(postId: string, imageUrl: string, caption: string) {
    if (!user?.uid) return;

    try {
      // Prevent duplicate favoriting
      const alreadyFavorited = await checkIfFavorite(user.uid, postId);
      if (alreadyFavorited) {
        console.warn("Post is already in favorites.");
        return;
      }

      const newFavorite = await addFavoriteToFirestore(user.uid, postId, imageUrl, caption);
      setFavorites((prev) => [newFavorite, ...prev]);
      console.log("Post added to favorites.");
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  }

  // Removes a favorite from Firestore.
  async function removeFavorite(favId: string) {
    try {
      await removeFavoriteFromFirestore(favId);
      setFavorites((prev) => prev.filter((fav) => fav.id !== favId));
      console.log("Favorite removed.");
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  }

  // Checks if a post is already favorited.
  function isFavorite(postId: string) {
    return favorites.some((fav) => fav.postId === postId);
  }

  // Fetches more favorites for pagination.
  async function loadMoreFavorites() {
    if (!lastFavorite || !user) return;
    await fetchFavorites(false);
  }

  useEffect(() => {
    if (user) fetchFavorites(true);
  }, [user]);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, fetchFavorites, isFavorite, loadMoreFavorites, loading, refreshing }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
