import { storage } from "@/firebaseConfig";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";

// Upload an image to Firebase Storage and return its URL.
export async function uploadImage(userId: string, uri: string): Promise<string> {
  try {
    console.log(`Starting upload for user: ${userId}`);

    // Fetch image and convert to Blob
    const response = await fetch(uri);
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);

    const blob = await response.blob();

    // Generate a unique filename with timestamp
    const timestamp = Date.now();
    const imageRef = ref(storage, `posts/${userId}/${timestamp}.jpg`);

    // Set metadata for correct MIME type handling
    const metadata = { contentType: blob.type };

    console.log(`Uploading image to storage path: ${imageRef.fullPath}`);

    // Upload the image
    await uploadBytes(imageRef, blob, metadata);
    
    // Get the download URL
    const downloadUrl = await getDownloadURL(imageRef);
    console.log("Image uploaded successfully:", downloadUrl);

    return downloadUrl;
  } catch (error) {
    console.error("Failed to upload image:", error);
    throw new Error("Image upload failed.");
  }
}

// Delete an image from Firebase Storage.

export async function deleteImage(imagePath: string): Promise<void> {
  try {
    console.log(`Attempting to delete image: ${imagePath}`);

    const imageRef = ref(storage, imagePath);
    await deleteObject(imageRef);

    console.log("Image deleted successfully:", imagePath);
  } catch (error) {
    console.error("Failed to delete image:", error);
    throw new Error("Image deletion failed.");
  }
}
