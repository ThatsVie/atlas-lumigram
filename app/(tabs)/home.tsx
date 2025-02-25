import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Alert, Dimensions } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import { usePosts } from "@/context/PostContext";
import { homeFeed } from "@/placeholder";

const screenWidth = Dimensions.get("window").width;
const imageSize = screenWidth - 20;

export default function HomeScreen() {
  const [visibleCaptions, setVisibleCaptions] = useState<{ [key: string]: boolean }>({});
  const { posts } = usePosts();

  const handleLongPress = (id: string) => {
    setVisibleCaptions((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleDoubleTap = (id: string) => {
    Alert.alert("Image Favorited", `You favorited image ${id}`);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const renderItem = ({ item }: { item: { id: string; image: string; caption: string } }) => {
    const doubleTapGesture = Gesture.Tap()
      .numberOfTaps(2)
      .runOnJS(true)
      .onEnd(() => handleDoubleTap(item.id));

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
          <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
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
      {posts.length === 0 && homeFeed.length === 0 ? (
        <Text style={styles.emptyText}>No posts yet. Add some!</Text>
      ) : (
        <FlashList
          data={[...posts, ...homeFeed]}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          estimatedItemSize={imageSize}
          extraData={visibleCaptions}
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
