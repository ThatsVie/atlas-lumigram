import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { uploadImage } from "@/lib/storage";
import { createPost, getUserPosts, getHomeFeed, Post } from "@/lib/firestore";
import { auth } from "@/firebaseConfig";
import { DocumentData } from "firebase/firestore";

type PostContextType = {
  posts: Post[];
  homeFeed: Post[];
  addPost: (imageUri: string, caption: string) => Promise<void>;
  fetchUserPosts: (reset?: boolean) => Promise<void>;
  fetchHomeFeed: (reset?: boolean) => Promise<void>;
  loading: boolean;
};

const PostContext = createContext<PostContextType | undefined>(undefined);

export function PostProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [homeFeed, setHomeFeed] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUserPost, setLastUserPost] = useState<DocumentData | null>(null);
  const [lastHomePost, setLastHomePost] = useState<DocumentData | null>(null);

  // Fetch paginated user posts. If true refreshes and resets the list.
  async function fetchUserPosts(reset = false) {
    if (!auth.currentUser) {
      console.warn("User not authenticated, cannot fetch posts.");
      return;
    }

    const userId = auth.currentUser.uid;

    try {
      setLoading(true);
      console.log(`Fetching posts for user: ${userId}`);

      const { posts: userPosts, lastDoc } = await getUserPosts(userId, reset ? null : lastUserPost);

      setPosts(reset ? userPosts : [...posts, ...userPosts]);
      setLastUserPost(lastDoc);

      console.log(`Loaded ${userPosts.length} posts.`);
    } catch (error) {
      console.error("Failed to fetch user posts:", error);
    } finally {
      setLoading(false);
    }
  }

  // Fetch paginated home feed posts.
  async function fetchHomeFeed(reset = false) {
    try {
      setLoading(true);
      console.log("Fetching home feed...");

      const { posts: newPosts, lastDoc } = await getHomeFeed(reset ? null : lastHomePost);

      setHomeFeed(reset ? newPosts : [...homeFeed, ...newPosts]);
      setLastHomePost(lastDoc);

      console.log(`Loaded ${newPosts.length} home feed posts.`);
    } catch (error) {
      console.error("Failed to fetch home feed:", error);
    } finally {
      setLoading(false);
    }
  }

  // Runs when the authenticated user changes- makes sure the post feed updates when a new user logs in.
  useEffect(() => {
    fetchUserPosts(true);
  }, [auth.currentUser]);

  // Handles adding a new post.
  async function addPost(imageUri: string, caption: string) {
    if (!auth.currentUser) {
      throw new Error("User not authenticated.");
    }

    const userId = auth.currentUser.uid;

    try {
      setLoading(true);
      console.log("🔄 Uploading image...");

      // Upload image to Firebase Storage and get the image URL
      const imageUrl = await uploadImage(userId, imageUri);

      console.log("Image uploaded. Creating post...");

      // Save post in Firestore and get the full post object
      const newPost = await createPost(userId, imageUrl, caption);

      // Update state immediately with new post
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setHomeFeed((prevFeed) => [newPost, ...prevFeed]);

      console.log("Post successfully created!");
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return (
    <PostContext.Provider value={{ posts, homeFeed, addPost, fetchUserPosts, fetchHomeFeed, loading }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostProvider");
  }
  return context;
}
