<div align="center">

# Lumigram - Mobile Full Stack

![Lumigram pug](https://github.com/user-attachments/assets/e8977cc0-e387-4648-be68-8a0dc90f17be)


## Project Overview

This project is **Lumigram**, an Instagram clone built with React Native using Expo. Part 1 focuses on building the frontend using React Native, while Part 2 integrates Firebase as the backend.

</div>

---

## Table of Contents

- [Resources](#resources)
- [Learning Objectives](#learning-objectives)
- [Usage Instructions](#usage-instructions)
- [App Features](#app-features)
- [Task 0: Getting Started](#task-0-getting-started)
- [Troubleshooting Connectivity Issues](#troubleshooting-connectivity-issues)
- [Task 1: Application Routing](#task-1-application-routing)
- [Task 2: Login & Register Screens](#task-2-login--register-screens)
- [Task 3: Home Tab](#task-3-home-tab)
- [Task 4: Add Post Tab](#task-4-add-post-tab)
- [Task 5: Favorites Tab](#task-5-favorites-tab)
- [Task 6: Profile Tab](#task-6-profile-tab)
- [Task 7: Search Tab](#task-7-search-tab)
- [Task 8: Authentication (Firebase Integration)](#task-8-authentication-firebase-integration)  
- [Task 9: Add Post](#task-9-add-post)  
- [Task 10: Home Feed](#task-10-home-feed)  
- [Task 11: Gestures](#task-11-gestures)  
- [Task 12: Favorites Feed](#task-12-favorites-feed)  
- [Task 13: User Profile](#task-13-user-profile)  
- [Task 14: User Search](#task-14-user-search)  
- [Reflection](#reflection)

---

## Resources

### **Watch**
- **React Native in 100 Seconds**  
  [Watch on YouTube](https://www.youtube.com/watch?v=gvkqT_Uoahw) – A quick introduction to React Native, its capabilities, and how it works.

### **Read**
- **Expo Documentation**  
  [Expo.dev](https://expo.dev/) – Official documentation for Expo, the framework used in this project.

- **Learn Expo Tutorial**  
  [Read the tutorial](https://docs.expo.dev/tutorial/introduction/) – Step-by-step guide for building cross-platform apps with Expo.

- **React Native Directory**  
  [Explore Libraries](https://reactnative.directory/) – A directory of useful third-party libraries for React Native.

### **Tools**
- **Radon IDE**  
  [Radon IDE VS Code Extension](https://ide.swmansion.com/) – A dedicated IDE extension for building React Native apps (30-day free trial).

### **Development & Debugging**
- **Setting Up Development Builds**  
  [Development Builds Guide](https://docs.expo.dev/develop/development-builds/introduction/) – Learn how to create and manage development builds in Expo.

- **Android Emulator Setup**  
  [Android Emulator Guide](https://docs.expo.dev/workflow/android-studio-emulator/) – Instructions for running your app on an Android emulator.

- **iOS Simulator Setup**  
  [iOS Simulator Guide](https://docs.expo.dev/workflow/ios-simulator/) – Instructions for testing your app on an iOS simulator.

- **Expo Go (Mobile Testing)**  
  [Expo Go](https://expo.dev/go) – A sandbox environment for testing Expo apps without a full development build.

- **Project Structure & Routing**  
  This project uses **file-based routing**, meaning that the structure of  files inside the `app` directory determines the routes in the application.  
  [Learn more about file-based routing](https://docs.expo.dev/router/introduction/).

### **Community & Support**
- **Expo on GitHub**  
  [Expo GitHub Repository](https://github.com/expo/expo) – Browse source code, report issues, and contribute to Expo.

- **Expo Developer Guides**  
  [View Expo Guides](https://docs.expo.dev/guides/) – Explore detailed guides on advanced topics like push notifications, authentication, and performance optimization.

- **Expo Discord Community**  
  [Join Expo Discord](https://chat.expo.dev) – Connect with other Expo developers, ask questions, and get support.


---

## Learning Objectives

- Utilize a cross-platform framework to build applications that can run on mobile devices.
- Understand how to work with mobile-specific UI patterns and native APIs.
- Gain hands-on experience in developing a React Native app using Expo.

---

##  Usage Instructions

### 1. Cloning the Repository
To get started with the project, clone the repository from GitHub:

```bash
git clone https://github.com/ThatsVie/atlas-lumigram.git
```

Then navigate into the project directory:

```bash
cd atlas-lumigram
```

---

### 2. Installing Dependencies
Ensure you have **Node.js** installed. Then, install the required dependencies:

```bash
npm install
```

---

### 3. Setting Up Expo
This project uses [Expo](https://expo.dev/), a framework for building React Native apps. If you haven’t installed Expo globally, do so with:

```bash
npm install -g expo-cli
```

Alternatively, you can use `npx` to run Expo without installing it globally.

---

### 4. Running the Project
To start the project locally, use the following command:

```bash
npx expo start
```

If you are running on a physical device and facing connectivity issues, use **tunnel mode**:

```bash
npx expo start --tunnel
```

This will generate a QR code you can scan using the **Expo Go** app (available on iOS and Android) to run the app on your mobile device.


---

## App Features 

### 1. Creating an Account & Logging In
- When you first open the app, you'll be prompted to **log in** or **register a new account**.
- After successful login, you will be redirected to the **Home Feed**.

---

### 2. Adding a Post
- Navigate to the **Add Post tab**.
- Select an image from your device.
- Enter a caption.
- Press **Save** to upload your post.
- Your post will now appear in the **Home Feed** and your **Profile Feed**.

---

### 3. Home Feed: Viewing & Interacting with Posts
- The **Home Feed** displays posts from all users in **reverse chronological order** (newest first).
- **Long Press** on a post to **see its caption**.
- **Double Tap** on a post to **add it to favorites**.

---

### 4. Favorites Tab
- The **Favorites tab** shows the posts you've favorited.
- **Double Tap** a post to **remove it from favorites**.

---

### 5. Profile Tab
- The **Profile tab** displays your profile picture, username, and all your posts.
- **Press on a post** to **enlarge it**.
- **Tap the trash can icon** in the enlarged view to **delete a post**.
- **Only you can delete your own posts**.
- **Tap on your profile image to change it.**
  - The default profile picture is of a **dog**.
  - Clicking on the image will allow you to select a new profile picture from your device.
- **Tap on your username to edit it.**
  - Enter a new username and save the changes.

---

### **6. Searching for Users**
- Navigate to the **Search tab**.
- Enter a **username** in the search bar.
- The results will update dynamically as you type.
- Clicking on a user will take you to their **profile and posts**.
- **You cannot edit or delete another user's posts**.
- **You can press on their posts to enlarge them**, but there will be no delete button.
- **TIP:** Searching for **"t"** will display most of the current accounts, as many usernames contain the letter "t".

---

### **7. Logging Out**
- Press the **Logout button** in the top right corner.
- This will **clear your session** and redirect you to the login screen.

---

## 🎯 Troubleshooting & Tips

- **App not connecting?** Try running `npx expo start --tunnel` if your device is not on the same network as your computer.

- **Gestures not working?** Ensure you're using the correct gestures:
  - **Long Press (Home Feed)**: Show caption.
  - **Double Tap (Home Feed & Favorites)**: Add/remove favorite.
  - **Press to Enlarge (Profile & User Profile Feeds)**: Enlarge post.
  - **Trash Can Icon (Profile Feed)**: Delete your own post.
  - **Tap Profile Picture (Profile Tab)**: Change profile image.
  - **Tap Username (Profile Tab)**: Edit username.

---


## Task 0: Getting Started

### Resources

- **Setting Up Your Environment:**  
  [Expo Environment Setup](https://docs.expo.dev/get-started/set-up-your-environment/)

### What I Did

1. **Created and Cloned the Repository:**
   - Went to [the template repository](https://github.com/atlas-jswank/atlas-lumigram) and pressed **"Use this template"**.
   - Named the new repository `atlas-lumigram` on GitHub.
   - Cloned it locally:


2. **Installed Dependencies:**
   ```bash
   npm install
   ```

3. **Started the App:**
   ```bash
   npx expo start
   ```
   *If you encounter the error `expo: not found`, install Expo CLI globally:*
   ```bash
   npm install -g expo-cli
   ```
   *or run:*
   ```bash
   npx expo start
   ```

4. **View the App:**
   - **On Your Device:**  
     Use the Expo Go app (available on iOS and Android) to scan the QR code from the Expo Developer Tools.
   - **On an Emulator:**  
     Set up an Android emulator or iOS simulator following the [Expo documentation](https://docs.expo.dev/workflow/android-studio-emulator/).

---

## Troubleshooting Connectivity Issues

If you encounter network connectivity issues while trying to run the app on your device, follow these steps:

1. **Check Local Network Connection:**
   - Ensure both your computer and mobile device are on the same Wi-Fi network.
   - Verify that no firewall is blocking port `8081`.

2. **Use Tunnel Mode:**
   If accessing the app via local IP doesn’t work, switch to tunnel mode:
   ```bash
   npx expo start --tunnel
   ```
   - If prompted, install `@expo/ngrok` globally:
     ```bash
     sudo npm install -g @expo/ngrok@^4.1.0
     ```
   - The tunnel mode will generate a URL that you can manually enter in Expo Go.

3. **Alternative Testing with an Emulator:**
   - If issues persist with a physical device, consider using an Android emulator via Android Studio.

---

## Task 1: Application Routing  

### Resources
- **Expo Routing Walkthrough**: [Watch Video](https://www.loom.com/share/5348cee096b04b16a149fde8a8fc064b?sid=c0d3c509-2535-499f-95f4-1f1bb2de2bf9)
- **Expo Tabs**: [Docs](https://docs.expo.dev/router/advanced/tabs/)
- **Expo Stack Navigation**: [Docs](https://docs.expo.dev/router/advanced/stack/)

---

### What I Did

1. **Implemented Stack Router for Authentication**
   - Ensured the app starts on `login.tsx`.
   - Created a stack router that allows users to navigate between login, register, and home.

2. **Created Tab Router for Logged-in Users**
   - Implemented five main tabs:
     - **Home** 🏠  
     - **Search** 🔍  
     - **Add Post** ➕  
     - **Favorites** ❤️  
     - **My Profile** 👤  
   - Ensured that the **profile tab title is "My Profile"** and it correctly loads `profile/index.tsx`.

3. **Implemented Profile Dynamic Routing**
   - **Profile Tab (`profile/index.tsx`)**: Displays "My Profile" but does not navigate anywhere.
   - **User Profiles (`profile/[id].tsx`)**: Clicking a user profile link in the **Search tab** dynamically navigates to `/profile/[id]`.
   - **Ensured `profile/[id]` does not appear as a tab** by setting `href: null` in `_layout.tsx`.

4. **Updated Search Tab with Profile Links**
   - Clicking on **Profile 1, Profile 2, and Profile 3** in the **Search tab** navigates to `/profile/1`, `/profile/2`, `/profile/3` dynamically.

5. **Ensured Logout Button Appears on All Pages**
   - `LogoutComponent.tsx` is included in all screens.
   - Clicking **Logout** redirects the user back to the login screen.

6. **Updated Tab Icons to Change When Selected**
   - **Profile Tab**: `person-outline` (inactive), `person` (active).  
   - **Search Tab**: `search-outline` (inactive), `search` (active).  
   - **Favorites Tab**: `heart-outline` (inactive), `heart` (active).  
   - **Add Post Tab**: `add-outline` (inactive), `add-circle` (active).  
   - **Home Tab**: `home-outline` (inactive), `home` (active).  

---

## Task 2: Login & Register Screens 

### What I Did  

1. **Created the Login Screen (`login.tsx`)**
   - **Login screen is the first screen when the app opens**.
   - **Added two input fields**:
     - **Email field** (keyboard type: email-address)
     - **Password field** (secure entry enabled)
   - **Styled input fields** to match the provided screenshots.
   - **Implemented Sign In button**:
     - Pressing **Sign In** navigates the user to `/(tabs)/home`.
     - Button has **animated press effect**.
   - **Implemented Create Account link**:
     - Pressing **Create a new account** navigates the user to `/register`.
     - Link has **animated press effect**.
   - **Ensured Accessibility**
     - Inputs, buttons, and links have correct accessibility roles.

2. **Created the Register Screen (`register.tsx`)**
   - **Added two input fields**:
     - **Email field** (keyboard type: email-address)
     - **Password field** (secure entry enabled)
   - **Styled input fields** to match the provided screenshots.
   - **Implemented Create Account button**:
     - Pressing **Create Account** navigates the user to `/(tabs)/home`.
     - Button has **animated press effect**.
   - **Implemented Login Link**:
     - Pressing **Login to an existing account** navigates the user to `/login`.
     - Link has **animated press effect**.
   - **Ensured Accessibility**
     - Inputs, buttons, and links have correct accessibility roles.

3. **Ensured Design Consistency**
   - **All text is white** for readability.
   - **Teal border on inputs** for visual clarity.
   - **Black border & shadow effect on secondary buttons** (`Login to existing account`, `Create a new account`).
   - **Logo is fully visible and does not get cut off**.
   - **Buttons are evenly spaced and match the provided screenshots**.

---

## Task 3: Home Tab  

### Resources
- **Flash List (for optimized scrolling)**: [Docs](https://shopify.github.io/flash-list/)  
- **React Native Gesture Handler (for touch interactions)**: [Docs](https://docs.swmansion.com/react-native-gesture-handler/)  

---

### What I Did

1. **Implemented a scrollable image feed using `FlashList`.**  
   - Used `placeholder.tsx` to display a **list of images**.  
   - Ensured images maintain a **square aspect ratio**.  
   - Optimized performance with `estimatedItemSize`.  

2. **Implemented Long Press Gesture for Captions**  
   - **Long pressing an image toggles the caption.**  
   - **Captions stay visible until long-pressed again.**  
   - Applied **Haptic feedback** for user confirmation.  

3. **Implemented Double Tap Gesture for Favoriting**  
   - **Double tapping an image triggers an alert.**  
   - Applied **Success Haptic feedback** to confirm action.  
   - In the next phase, this will be used for **favoriting**.  

---

### Troubleshooting & Fixes  
At first, long press did not update the UI. The state was changing, but React was not re-rendering the captions. To fix this, I used **functional updates** in `setVisibleCaptions` to ensure proper state changes.  

Captions were also not appearing because of absolute positioning issues. Instead of placing them outside the image, I positioned them inside the image container.  

Another issue was that long press and double tap gestures were interfering with each other. To resolve this, I used `Gesture.Simultaneous(longPress, doubleTap)`, allowing both gestures to function properly.  

---

## Task 4: Add Post Tab

### Resources
- **Expo Image Picker**: [Docs](https://docs.expo.dev/versions/latest/sdk/imagepicker/) – Used for selecting images from the device.
- **Expo Media Library**: [Docs](https://docs.expo.dev/versions/latest/sdk/media-library/) – Handles media permissions and storage.
- **Walkthrough Video**: [Watch](https://www.loom.com/share/4b0e3d52f319461199428131dd2588ab?sid=dc806fef-73cc-4b36-a646-df03033942fb) – Guide for implementing image selection.

---

### What I Did

1. **Implemented Image Selection**
   - Used **`expo-image-picker`** to allow users to select an image from their device.
   - Ensured images are **cropped to a square format** (400x400).

2. **Handled Permissions for Image Access**
   - Used **`expo-media-library`** to request media access permissions.
   - If permission is not granted, the user is alerted.
   - (Note: On some devices, permission may be automatically granted.)

3. **Created UI Components**
   - **Before selecting an image:**
     - Displayed a **placeholder image** (`assets/images/placeholder.png`).
     - Showed a **"Choose a Photo"** button.
   - **After selecting an image:**
     - Displayed the **selected image**.
     - Added a **caption input field** with a teal border.
     - Included a **"Save" button**, which triggers a success notification.
     - Included a **"Reset" button**, which clears the image and caption.

4. **Ensured Accessibility**
   - All buttons have appropriate **`accessibilityRole`** attributes.
   - **`accessibilityLabel`** and **`accessibilityHint`** added to interactive elements.

---

### Troubleshooting & Challenges

- **Permission Prompt Not Appearing**
  - Initially, the app was supposed to **ask for media access permission** before opening the image picker.
  - On some devices, the permission prompt was skipped, and access was granted automatically.
  - **Solution:** Added explicit permission handling, but behavior may vary across devices.
  
- **Deprecated `MediaTypeOptions`**
  - `ImagePicker.MediaTypeOptions.Images` was **deprecated**.
  - **Solution:** Used `"Images"` as the value for `mediaTypes` instead.

- **Image Crop Issue**
  - The cropping tool was allowing **non-square** selections.
  - **Solution:** Used `aspect: [1, 1]` to enforce a **square crop (400x400)**.

---

## Task 5: Favorites Tab 

### Resources 
- **Flash List:** [Shopify Flash List Docs](https://shopify.github.io/flash-list/) – Efficient list rendering for large data sets.  
- **React Native Gesture Handler:** [Docs](https://docs.swmansion.com/react-native-gesture-handler/) – Gesture detection for long press & double tap.  

---

### What I Did  

1. **Implemented Scrollable List of Images**  
   - Used `FlashList` to display images from `favoritesFeed` in `placeholder.tsx`.  
   - Ensured **fast rendering** with `estimatedItemSize`.  

2. **Added Long Press Gesture for Captions**  
   - Users **long press** an image to show its caption.  
   - Caption **appears on top of the image** in a semi-transparent overlay.  
   - **Haptic feedback added** for better interaction.  

3. **Added Double Tap Gesture for Favoriting**  
   - Users **double tap** an image to favorite it (future functionality).  
   - For now, it **shows an alert** confirming the action.  
   - **Haptic success feedback added** on double tap.  

4. **Fixed Scrolling Issue on Long Press**  
   - **Used `extraData={visibleCaptions}`** to prevent list from resetting on caption updates.  
   - This ensures captions appear without affecting scroll position.  

5. **Ensured Accessibility**  
   - **Screen reader labels** added for images and captions.  
   - **Gestures are responsive** with adequate timing for long press.  

---

### Troubleshooting & Fixes 

- **Issue:** Caption was not appearing after long press.  
  - **Fix:** Used `useState` to track `visibleCaptions` for each image.  

- **Issue:** Scrolling back to top when long pressing an image.  
  - **Fix:** Used `extraData` in `FlashList` to prevent rerendering the entire list.  

- **Issue:** Console error `Text strings must be rendered within a <Text> component`.  
  - **Fix:** Wrapped captions inside `<Text>` to properly render.  

---

## Task 6: Profile Tab

### What I Did

1. **Updated Profile Tab (`profile/index.tsx`)**
- Displays profile picture and username.
- Fetches current user’s posts from `profileFeed`.
- Implemented grid layout with three images per row using `FlatList`.
- Clicking the profile image navigates to the edit profile screen.

2. **Updated Profile Detail Page (`profile/[id].tsx`)**
- Used `useLocalSearchParams` to fetch the correct user profile.
- Displays correct username and profile image from `userSearch`.
- Shows user’s uploaded posts in a three-column grid.
- If user ID does not exist, displays "User not found".

3. **Created Edit Profile Screen (`profile/edit.tsx`)**
- Users can select a new profile image using `expo-image-picker`.
- Users can update their username with an input field.
- Clicking save profile:
  - Displays an alert confirming the update.
  - Navigates back to the profile screen.
  - Updates local state but does not persist changes yet.

5 **Updated `_layout.tsx` to Hide `profile/edit` from Tabs**
- Ensured Edit Profile screen does not appear in the bottom tab navigation.

---

### Troubleshooting

- **Profile picture was not updating after saving**
  - Used `useImagePicker()` correctly to store the new image in state.
- **Edit profile screen was showing in tabs**
  - Added `options={{ href: null }}` in `_layout.tsx` to hide it.

---

## Task 7: Search Tab

### What I Did

1. **Updated Search Tab (`search.tsx`)**
- Implemented a search input field using `TextInput`.
- Used state to track user’s input.
- Filtered users dynamically from `userSearch` based on input.
- Displayed matching users in a `FlatList` with avatars and usernames.

2. **Enabled Profile Navigation**
- Clicking a user in the search results navigates to `/profile/[id]`.
- Updated `profile/[id].tsx` to load the correct user profile dynamically.

---

## Task 8: Authentication (Firebase Integration) 

#### Resources  
- **React Native: Firebase Authentication**  
  [Watch Video](https://www.loom.com/share/630ecd3e27554c60baeda84f1f23ff02?sid=33b89349-d4c7-474e-98d8-37ba3b132f53) – Walkthrough of Firebase Authentication integration in React Native.  
- **Firebase Auth Getting Started**  
  [Firebase Documentation](https://firebase.google.com/docs/auth/web/start) – Official Firebase guide for setting up authentication.  

---

### What I Did 

1. **Integrated Firebase Authentication**  
   - Configured Firebase Authentication in the project.  
   - Used **`firebase/auth`** to handle user authentication.  
   - Ensured authentication state persistence for better user experience.  

2. **Implemented Login Functionality**  
   - Users can log in using a **valid email and password**.  
   - Upon successful login, the user is redirected to the **Home tab**.  
   - If login fails (e.g., wrong credentials), an error message is displayed.  

3. **Implemented User Registration**  
   - Users can register a **new email and password**.  
   - Upon successful registration, the user is automatically logged in and redirected to the **Home tab**.  
   - The user’s profile is initialized in Firestore with a **default username and profile image**.  

4. **Implemented Logout Functionality**  
   - Clicking the logout button **clears the session** and redirects the user back to the **Login screen**.  
   - Used **`signOut`** from Firebase Authentication to properly end the session.  
   - Ensured session cleanup in **AsyncStorage** to prevent unintended automatic login.  

---

## Task 9: Add Post  

### Resources  
- **React Native: Firebase Storage, Firestore**  
  [Watch Video](https://www.loom.com/share/65f2b08e1de6406e935ca69cd844a41b?sid=ef2564a8-7dee-41c7-9699-cfa221ea7b81) – Walkthrough of Firebase Storage and Firestore integration.  
- **Firebase Storage: Upload Files**  
  [Firebase Documentation](https://firebase.google.com/docs/storage/web/upload-files) – Official Firebase guide on uploading files to storage.  
- **Firestore: Add Documents**  
  [Firestore Documentation](https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document) – Guide for adding structured data to Firestore.  

---

### What I Did  

1. **Implemented Image Uploading to Firebase Storage**  
   - Used **`expo-image-picker`** to allow users to select an image from their device.  
   - Uploaded the selected image to **Firebase Storage** under `posts/{userId}/{timestamp}.jpg`.  
   - Retrieved the **download URL** after a successful upload.  

2. **Stored Post Metadata in Firestore**  
   - Created a **new document in Firestore** under the `posts` collection.  
   - Stored the following details:  
     - **Image URL** (from Firebase Storage)  
     - **Caption text**  
     - **Timestamp** (created at)  
     - **User ID** (who created the post)  

3. **Created the Add Post Screen**  
   - Users can **select an image** using `expo-image-picker`.  
   - After selecting an image, a **caption input field** appears.  
   - A **"Post" button** uploads the image and saves the post in Firestore.  
   - Displayed a **success notification** once the post is created.  

4. **Ensured Data Consistency**  
   - Prevented duplicate uploads by disabling the **"Post" button** while uploading.  
   - Ensured **users cannot post without selecting an image and entering a caption**.  
   - Used **state management** to track upload progress.  

---

## Task 10: Home Feed 

### Resources  
- **Firestore: Querying Data**  
  [Firestore Queries Documentation](https://firebase.google.com/docs/firestore/query-data/queries) – Guide on fetching and filtering data in Firestore.  
- **Firestore: Order and Limit Data for Pagination**  
  [Firestore Pagination Documentation](https://firebase.google.com/docs/firestore/query-data/order-limit-data) – Explains how to implement efficient data pagination.  

---

### What I Did  

1. **Fetched Posts from Firestore in Chronological Order**  
   - Updated the **home feed** to fetch posts from the Firestore `posts` collection.  
   - Ordered posts by `createdAt` in **descending order** to display the newest posts first.  
   - Ensured that only **published posts** are displayed to users.  

2. **Implemented Pull-to-Refresh Functionality**  
   - Used **FlashList with RefreshControl** to allow users to **pull down to refresh the feed**.  
   - When refreshed, the app **fetches the latest posts** from Firestore.  

3. **Implemented Infinite Scroll Pagination**  
   - Used Firestore’s **pagination techniques** to fetch posts in batches.  
   - Loaded the **first 10 posts** initially.  
   - When the user **scrolls to the bottom**, the next batch of posts is fetched.  
   - Used **startAfter(lastVisibleDoc)** to ensure new posts are **appended without duplicates**.  

4. **Ensured Real-Time Updates for New Posts**  
   - Subscribed to **real-time Firestore updates** with `onSnapshot()`.  
   - Any newly created post **automatically appears** without requiring a manual refresh.  

---

## Task 11: Gestures  


### What I Did

1. **Implemented Double Tap Gesture to Add Favorites**  
   - Used **React Native Gesture Handler** to detect **double-tap interactions**.  
   - When double-tapped:  
     - The post’s ID, image URL, and caption are stored in **Firestore's `favorites` collection**.  
     - The favorite is **associated with the logged-in user**.   
   - Added **Haptic feedback (Success Notification)** to confirm the favorite action.  

2. **Implemented Long Press Gesture to Show Captions**  
   - Used **Long Press Gesture** to toggle captions over post images.  
   - If a post has a caption, **long pressing reveals it** in an overlay.  
   - The caption disappears when the user **long presses again**.  
   - Used **semi-transparent background styling** for readability.  

---

## Task 12: Favorites Feed 


### What I Did 

1. **Implemented Favorites Storage in Firestore**  
   - Created a **favorites collection** in Firestore.  
   - When a user **double taps** a post, the post’s **ID, image URL, and caption** are saved to Firestore under the **logged-in user’s favorites list**.  
   - Added a **checkIfFavorite function** to prevent duplicate favorites.  

2. **Fetched User’s Favorited Posts**  
   - Used **Firestore queries** to retrieve only the **favorited posts** of the logged-in user.  
   - Implemented a **real-time listener (`onSnapshot`)** to **sync the favorites feed live** when posts are added or removed.  

3. **Implemented Pull-to-Refresh for Favorites**  
   - Used **`RefreshControl`** in the `FlashList` to allow users to **pull down** and manually refresh their favorites feed.  
   - When the user refreshes, the app **fetches the latest favorites from Firestore**.  

4. **Implemented Pagination for Infinite Scrolling**  
   - When the user **scrolls to the bottom**, the next batch of **favorited posts** is **automatically fetched**.  
   - Used **`startAfter`** in Firestore queries to load more posts dynamically.  
   - Ensured **efficient performance** by limiting the number of posts fetched at a time.  

---

## Task 13: User Profile 

### What I Did 

1. **Implemented User Profile Display**  
   - Fetched the **logged-in user's profile data** from Firestore.  
   - Displayed the **profile image and username** at the top of the profile screen.  
   - Implemented a **grid layout using `FlatList`** to show all posts made by the user.  

2. **Added Profile Editing Functionality**  
   - Implemented an **Edit Profile screen** (`profile/edit.tsx`).  
   - Allowed users to **update their username**, which is stored in **Firestore**.  
   - Allowed users to **change their profile image** using `expo-image-picker`.  
   - **Uploaded new profile images to Firebase Storage** and updated Firestore with the image URL.  

3. **Enabled Image Enlarging on Click**  
   - Implemented an **image modal** that allows users to click on any post to view it in a **larger size**.  
   - Clicking on an image **opens a full-screen modal**, displaying the **post at 80% of the screen width**.  
   - Users can **tap outside the image to close the modal**.  

4. **Implemented Real-Time Profile Updates**  
   - Subscribed to Firestore updates so that **changes to the profile image and username reflect immediately**.  
   - Used `onSnapshot` to **sync the user’s posts in real-time**, ensuring the profile feed updates automatically when new posts are added.  

5. **Implemented Pull-to-Refresh for Profile Posts**  
   - Added a **pull-to-refresh feature** to allow users to manually refresh their profile feed.  
   - Fetches the **latest posts from Firestore** when refreshed.  

---

## Task 14: User Search

## What I Did  

1. **Implemented Real-Time User Search**  
   - Used Firestore’s **querying capabilities** to **filter usernames dynamically**.  
   - As the user types, the **search results update in real time** to show matching users.  
   - Limited the number of results to **10 users per search** for efficiency.  

2. **Displayed Usernames and Profile Images**  
   - Retrieved **profile images and usernames** from Firestore for each matching result.  
   - Used `FlatList` to **display the results in a scrollable list**.  

3. **Enabled Profile Navigation**  
   - Clicking on a **search result** navigates to the selected user’s profile page.  
   - Used **dynamic routing** with `profile/[id].tsx` to load the correct profile.  

4. **Restricted Profile Editing**  
   - If a user visits their **own profile**, they can edit it.  
   - If a user visits **someone else’s profile**, the edit options are **hidden**.  
   - Ensured the **profile screen layout remains consistent** for all users.  

---

## Reflection
Developing Lumigram was a valuable experience that deepened my understanding of React Native, Firebase, and mobile app development. I learned how to implement authentication, real-time data updates, and gesture-based interactions while improving the user experience with features like post deletion, profile customization, and infinite scrolling. One of the biggest challenges was ensuring seamless state updates across different screens, particularly for the profile feed, which required optimizing Firestore queries and implementing real-time listeners. I enjoyed refining the app’s functionality, troubleshooting issues, and enhancing user interactions to create a smooth and engaging social media experience.

With love, 
<br>
**[Vie P.](https://whatdoyouknowaboutlove.com/viepaula/)**