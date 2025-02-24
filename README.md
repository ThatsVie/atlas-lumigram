<div align="center">

# Lumigram - Mobile Full Stack Part 1

## Project Overview

This project is **Lumigram**, an Instagram clone built with React Native using Expo. It is the first part of a two-part project. Part 1 focuses on building the frontend using React Native, while Part 2 will integrate Firebase as the backend.

**Project Overview Video:**  
[Watch on Loom](https://www.loom.com/share/aa46d4ede4a140348c75c7c141d899a1?sid=8ff29724-0055-4570-8c49-0f975dfab634)

</div>

---

## Table of Contents

- [Resources](#resources)
- [Learning Objectives](#learning-objectives)
- [Task 0: Getting Started](#task-0-getting-started)
- [Troubleshooting Connectivity Issues](#troubleshooting-connectivity-issues)
- [Task 1: Application Routing](#task-1-application-routing)
- [Task 2: Login & Register Screens](#task-2-login--register-screens)
- [Task 3: Home Tab](#task-3-home-tab)
- [Reflection](#reflection)

---

## **Resources**

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

## **Task 1: Application Routing**  

### **Resources**
- **Expo Routing Walkthrough**: [Watch Video](https://www.loom.com/share/5348cee096b04b16a149fde8a8fc064b?sid=c0d3c509-2535-499f-95f4-1f1bb2de2bf9)
- **Expo Tabs**: [Docs](https://docs.expo.dev/router/advanced/tabs/)
- **Expo Stack Navigation**: [Docs](https://docs.expo.dev/router/advanced/stack/)

---

### **What I Did**  

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

## **Task 2: Login & Register Screens**  

### **What I Did**  

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

### ** Task 3: Home Tab**  

### **Resources**
- **Flash List (for optimized scrolling)**: [Docs](https://shopify.github.io/flash-list/)  
- **React Native Gesture Handler (for touch interactions)**: [Docs](https://docs.swmansion.com/react-native-gesture-handler/)  

---

### ** What I Did**
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

### ** Troubleshooting & Fixes**  
At first, long press did not update the UI. The state was changing, but React was not re-rendering the captions. To fix this, I used **functional updates** in `setVisibleCaptions` to ensure proper state changes.  

Captions were also not appearing because of absolute positioning issues. Instead of placing them outside the image, I positioned them inside the image container.  

Another issue was that long press and double tap gestures were interfering with each other. To resolve this, I used `Gesture.Simultaneous(longPress, doubleTap)`, allowing both gestures to function properly.  

---

## Reflection