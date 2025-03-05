import React, { useState, useEffect } from "react";
import { 
  View, Text, Image, StyleSheet, Dimensions, ActivityIndicator, RefreshControl, Alert 
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import { useFavorites } from "@/context/FavoritesContext";

import { Favorite } from "@/context/FavoritesContext";

const screenWidth = Dimensions.get("window").width;
const imageSize = screenWidth - 20;

export default function FavoritesScreen() {
  const { favorites, fetchFavorites, addFavorite, removeFavorite, isFavorite, refreshing, loading, loadMoreFavorites } = useFavorites();
  const [visibleCaptions, setVisibleCaptions] = useState<{ [key: string]: boolean }>({});

  // Fetches favorites when the screen loads.
  useEffect(() => {
    fetchFavorites(true);
  }, []);

  // Toggles caption visibility when a post is long-pressed.
  const handleLongPress = (id: string) => {
    setVisibleCaptions((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  // Handles double tap to toggle favorite status.
  const handleDoubleTap = async (favId: string, postId: string, imageUrl: string, caption: string) => {
    if (!isFavorite(postId)) {
      await addFavorite(postId, imageUrl, caption);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert("Success", "Image added to favorites!");
    } else {
      await removeFavorite(favId);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      Alert.alert("Removed", "Image removed from favorites.");
    }
  };

  // Renders each favorite item with gesture detection.
  const renderItem = ({ item }: { item: Favorite }) => {
    const doubleTapGesture = Gesture.Tap()
      .numberOfTaps(2)
      .runOnJS(true)
      .onEnd(() => handleDoubleTap(item.id, item.postId, item.imageUrl, item.caption));

    const longPressGesture = Gesture.LongPress()
      .minDuration(500)
      .runOnJS(true)
      .onEnd((_, success) => {
        if (success) {
          handleLongPress(item.id);
        }
      });

    return (
      <GestureDetector gesture={Gesture.Simultaneous(doubleTapGesture, longPressGesture)}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
          {visibleCaptions[item.id] && item.caption ? (
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
      {loading ? (
        <ActivityIndicator size="large" color="#1ED2AF" />
      ) : favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorites yet.</Text>
      ) : (
        <FlashList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          estimatedItemSize={imageSize}
          extraData={visibleCaptions}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => fetchFavorites(true)} />}
          onEndReached={loadMoreFavorites} // supports infinite scroll
          onEndReachedThreshold={0.1}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ECEDEE", paddingHorizontal: 10 },
  emptyText: { textAlign: "center", fontSize: 18, color: "#687076", marginTop: 20 },
  imageContainer: {
    marginBottom: 15,
    position: "relative",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 10,
  },
  image: { width: imageSize, height: imageSize, borderRadius: 10 },
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
