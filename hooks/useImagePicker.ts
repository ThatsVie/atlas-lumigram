import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";

export function useImagePicker() {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

  useEffect(() => {
    async function requestPermissions() {
      const { status } = await MediaLibrary.getPermissionsAsync();
      if (status !== "granted") {
        const { status: newStatus } = await MediaLibrary.requestPermissionsAsync();
        setPermissionGranted(newStatus === "granted");
      } else {
        setPermissionGranted(true);
      }
    }

    requestPermissions();
  }, []);

  async function openImagePicker() {
    if (!permissionGranted) {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("You need to grant permission to access your images.");
        return;
      }
      setPermissionGranted(true);
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setImage(result.assets[0].uri);
    }
  }


  function reset() {
    setImage(undefined);
  }

  return { image, openImagePicker, reset };
}
