import React, { useState, useEffect, useRef } from "react";
import {
  View, Text, Image, StyleSheet,
  Alert, Dimensions, RefreshControl, ActivityIndicator,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import { useAuth } from "@/context/AuthProvider";
import { usePosts } from "@/context/PostContext";
import { useFavorites } from "@/context/FavoritesContext";

const screenWidth = Dimensions.get("window").width;
const imageSize = screenWidth - 20;

export default function HomeScreen() {
  const { homeFeed, fetchHomeFeed, loading } = usePosts();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { user } = useAuth();
  const [visibleCaption, setVisibleCaption] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const listRef = useRef<FlashList<any>>(null);

  // Fetches posts when the screen loads and when the user changes.
  useEffect(() => {
    async function loadFeed() {
      setInitialLoading(true);
      if (user) {
        console.log("Fetching home feed for user:", user.uid);
        await fetchHomeFeed(true);
      }
      setInitialLoading(false);
    }
    loadFeed();
  }, [user]);

  // Pull-to-refresh-Fetch new posts when user pulls down.
  async function handleRefresh() {
    setRefreshing(true);
    await fetchHomeFeed(true);
    setRefreshing(false);
  }

  // Toggles caption visibility when a post is long-pressed and scrolls it into view
  const handleLongPress = (id: string, index: number) => {
    console.log(`Long press triggered for post ID: ${id} at index ${index}`);

    setVisibleCaption((prevCaption) => (prevCaption === id ? null : id));

    // Ensure the long-pressed item stays in view
    listRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  // Handles double tap to toggle favorite status.
  const handleDoubleTap = async (postId: string, imageUrl: string, caption: string) => {
    if (!user) {
      Alert.alert("Error", "You must be logged in to favorite posts.");
      return;
    }

    if (isFavorite(postId)) {
      Alert.alert("Already Favorited", "Go to the favorites tab to remove it.");
      return;
    }

    await addFavorite(postId, imageUrl, caption);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Added", "Post added to favorites.");
  };

  // Renders each post with gestures
  const renderItem = ({ item, index }: { item: { id: string; imageUrl: string; caption: string }; index: number }) => {
    const doubleTapGesture = Gesture.Tap()
      .numberOfTaps(2)
      .runOnJS(true)
      .onEnd(() => handleDoubleTap(item.id, item.imageUrl, item.caption));

    const longPressGesture = Gesture.LongPress()
      .minDuration(500)
      .runOnJS(true)
      .onEnd((_, success) => {
        if (success) {
          handleLongPress(item.id, index);
        }
      });

    return (
      <GestureDetector gesture={Gesture.Simultaneous(doubleTapGesture, longPressGesture)}>
        <View style={styles.imageContainer}>
          {item.imageUrl ? (
            <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={[styles.image, styles.placeholder]}>
              <Text style={styles.placeholderText}>Image not available</Text>
            </View>
          )}
          {visibleCaption === item.id && item.caption ? (
            <View style={styles.captionContainer}>
              <Text style={styles.caption}>{item.caption || "No caption available"}</Text>
            </View>
          ) : null}
        </View>
      </GestureDetector>
    );
  };

  return (
    <View style={styles.container}>
      {user ? (
        <Text style={styles.userEmail}>Logged in as: {user.email}</Text>
      ) : (
        <Text style={styles.userEmail}>Please log in to view posts.</Text>
      )}

      {initialLoading && <ActivityIndicator size="large" color="#1ED2AF" style={styles.loadingIndicator} />}

      {!initialLoading && homeFeed.length === 0 ? (
        <Text style={styles.noPostsText}>No posts yet. Start by uploading one!</Text>
      ) : (
        <FlashList
          ref={listRef}
          data={homeFeed}
          extraData={visibleCaption} // Re-renders list when caption changes
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          estimatedItemSize={imageSize}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
          onEndReached={() => fetchHomeFeed(false)} // infinite scrolling
          onEndReachedThreshold={0.1} //Fetch more when close to bottom
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ECEDEE", paddingHorizontal: 10 },
  userEmail: { fontSize: 16, fontWeight: "bold", color: "#1ED2AF", textAlign: "center", marginVertical: 10 },
  loadingIndicator: { marginTop: 20 },
  noPostsText: { textAlign: "center", fontSize: 16, color: "#687076", marginTop: 20 },
  imageContainer: {
    marginBottom: 15,
    position: "relative",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 10,
  },
  image: { width: imageSize, height: imageSize, borderRadius: 10 },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c2c2c",
  },
  placeholderText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
  captionContainer: {
    position: "absolute",
    top: 10,
    left: "10%",
    right: "10%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  caption: { color: "#fff", fontSize: 14, textAlign: "center", fontWeight: "bold" },
});
