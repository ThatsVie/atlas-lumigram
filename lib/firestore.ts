import { db, storage } from "@/firebaseConfig";
import {
  collection, addDoc, getDocs, getDoc, setDoc, updateDoc,
  deleteDoc, query, where, orderBy,
  serverTimestamp, doc, DocumentData,
  startAfter, limit,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

export type Post = {
  id: string;
  userId: string;
  imageUrl: string;
  caption: string;
  createdAt: any;
};

export type Favorite = {
  id: string;
  postId: string;
  userId: string;
  imageUrl: string;
  caption: string;
  createdAt: number;
};

export type UserProfile = {
  username: string;
  profileImage: string;
};

const POSTS_PER_PAGE = 10;
const FAVORITES_PER_PAGE = 10;

// Make sure Firestore is online before making queries.
async function ensureFirestoreOnline() {
  try {
    console.log("Checking Firestore connection...");
    await getDocs(query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(1)));
  } catch (error) {
    console.warn("Firestore might be offline. Retrying connection...");
  }
}

// Fetch a user profile
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    console.log(`Fetching profile for user: ${userId}`);
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return null;
  }
}

// Create or update a user's profile
export async function updateUserProfile(userId: string, updates: Partial<UserProfile>) {
  try {
    console.log(`Updating profile for user: ${userId}`);
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, updates, { merge: true });
    console.log("Profile updated successfully.");
  } catch (error) {
    console.error("Failed to update user profile:", error);
    throw new Error("Profile update failed.");
  }
}

// Searches for users by username.
export async function searchUsersByUsername(queryText: string): Promise<(UserProfile & { id: string })[]> {
  try {
    console.log(`Searching users by username: ${queryText}`);
    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      where("username", ">=", queryText),
      where("username", "<=", queryText + "\uf8ff"),
      limit(10)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs
      .map((doc) => {
        const data = doc.data();
        if (data.username && data.profileImage) {
          return { id: doc.id, ...data } as UserProfile & { id: string };
        } else {
          console.warn(`Missing profile fields for user ${doc.id}`);
          return null;
        }
      })
      .filter((user): user is UserProfile & { id: string } => user !== null);
  } catch (error) {
    console.error("Failed to search users:", error);
    return [];
  }
}

// Create a new post
export async function createPost(userId: string, imageUrl: string, caption: string): Promise<Post> {
  await ensureFirestoreOnline();
  try {
    console.log("Creating post...");
    const docRef = await addDoc(collection(db, "posts"), {
      userId,
      imageUrl,
      caption,
      createdAt: serverTimestamp(),
    });

    console.log(`Post created with ID: ${docRef.id}`);
    const postSnapshot = await getDoc(docRef);

    return { id: docRef.id, ...(postSnapshot.data() as Omit<Post, "id">) };
  } catch (error) {
    console.error("Failed to create post:", error);
    throw new Error("Post creation failed.");
  }
}

// Fetch paginated posts for the home feed.
export async function getHomeFeed(lastPost: DocumentData | null) {
  try {
    console.log("Fetching home feed...");
    let postsQuery = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      limit(POSTS_PER_PAGE)
    );

    if (lastPost) {
      postsQuery = query(postsQuery, startAfter(lastPost));
    }

    const querySnapshot = await getDocs(postsQuery);
    const posts: Post[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Post, "id">),
    }));

    console.log(`Fetched ${posts.length} posts for home feed.`);
    return { posts, lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1] || null };
  } catch (error) {
    console.error("Failed to fetch home feed posts:", error);
    throw new Error("Failed to load home feed.");
  }
}

// Get all posts for a specific user with pagination.
export async function getUserPosts(userId: string, lastPost: DocumentData | null) {
  try {
    console.log(`Fetching posts for user: ${userId}`);

    let postsQuery = query(
      collection(db, "posts"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(POSTS_PER_PAGE)
    );

    if (lastPost) {
      postsQuery = query(postsQuery, startAfter(lastPost));
    }

    const querySnapshot = await getDocs(postsQuery);
    const posts: Post[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Post, "id">),
    }));

    console.log(`Fetched ${posts.length} posts for user: ${userId}`);
    return { posts, lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1] || null };
  } catch (error) {
    console.error("Failed to get user posts:", error);
    throw new Error("Failed to fetch posts.");
  }
}

// Add a post to favorites
export async function addFavoriteToFirestore(userId: string, postId: string, imageUrl: string, caption: string) {
  try {
    console.log("Adding favorite...");

    const newFavorite = {
      postId, userId, imageUrl, caption,
      createdAt: Date.now(),
    };

    const docRef = await addDoc(collection(db, "favorites"), newFavorite);
    console.log(`Favorite added with ID: ${docRef.id}`);

    return { id: docRef.id, ...newFavorite };
  } catch (error) {
    console.error("Failed to add favorite:", error);
    throw new Error("Failed to favorite post.");
  }
}

// Remove a favorite from Firestore.
export async function removeFavoriteFromFirestore(favoriteId: string) {
  try {
    console.log("Removing favorite...");
    await deleteDoc(doc(db, "favorites", favoriteId));
    console.log("Favorite removed successfully.");
  } catch (error) {
    console.error("Failed to remove favorite:", error);
    throw new Error("Failed to remove favorite.");
  }
}

// Fetch a user's favorites with pagination.
export async function getUserFavorites(userId: string, lastFavorite: DocumentData | null) {
  try {
    console.log(`Fetching favorites for user: ${userId}`);

    let favoritesQuery = query(
      collection(db, "favorites"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(FAVORITES_PER_PAGE)
    );

    if (lastFavorite) {
      favoritesQuery = query(favoritesQuery, startAfter(lastFavorite));
    }

    const querySnapshot = await getDocs(favoritesQuery);
    const favorites: Favorite[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Favorite, "id">),
    }));

    console.log(`Fetched ${favorites.length} favorites for user: ${userId}`);
    return { favorites, lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1] || null };
  } catch (error) {
    console.error("Failed to fetch favorites:", error);
    throw new Error("Failed to load favorites.");
  }
}

// Check if a post is already favorited by a user.
export async function checkIfFavorite(userId: string, postId: string): Promise<boolean> {
  try {
    console.log("Checking if post is already favorited...");
    const q = query(
      collection(db, "favorites"),
      where("userId", "==", userId),
      where("postId", "==", postId)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking favorite status:", error);
    return false;
  }
}


// Deletes a post from Firestore and removes the image from Firebase Storage.

export async function deletePost(postId: string, imageUrl: string): Promise<void> {
  try {
    console.log(`Deleting post: ${postId}`);

    // Delete post from Firestore
    await deleteDoc(doc(db, "posts", postId));
    console.log(`Post ${postId} deleted from Firestore.`);

    // Delete image from Firebase Storage
    if (imageUrl) {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
      console.log(`Image deleted from storage: ${imageUrl}`);
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    throw new Error("Failed to delete post.");
  }
}

export default {
  createPost, getUserPosts, getHomeFeed,
  addFavoriteToFirestore, removeFavoriteFromFirestore,
  getUserFavorites, checkIfFavorite,
  getUserProfile, updateUserProfile, searchUsersByUsername,
  deletePost,
};