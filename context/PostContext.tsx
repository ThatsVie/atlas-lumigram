import { createContext, useContext, useState, ReactNode } from "react";

type Post = {
  id: string;
  image: string;
  caption: string;
};

type PostContextType = {
  posts: Post[];
  addPost: (image: string, caption: string) => void;
};

const PostContext = createContext<PostContextType | undefined>(undefined);

export function PostProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);

  function addPost(image: string, caption: string) {
    const newPost = { id: Date.now().toString(), image, caption };
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  }

  return (
    <PostContext.Provider value={{ posts, addPost }}>
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
