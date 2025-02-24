import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import LogoutComponent from '@/components/LogoutComponent';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        tabBarInactiveTintColor: Colors.light.icon,
        headerRight: () => <LogoutComponent />,
      }}
    >
      <Tabs.Screen 
        name="home" 
        options={{ 
          title: 'Home Feed', 
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              size={28} 
              color={focused ? Colors.light.tint : Colors.light.icon}
            />
          ) 
        }} 
      />
      <Tabs.Screen 
        name="search" 
        options={{ 
          title: 'Search', 
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? "search" : "search-outline"} 
              size={28} 
              color={focused ? Colors.light.tint : Colors.light.icon}
            />
          ) 
        }} 
      />
      <Tabs.Screen 
        name="add-post" 
        options={{ 
          title: 'Add Post', 
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? "add" : "add-outline"} 
              size={28} 
              color={focused ? Colors.light.tint : Colors.light.icon}
            />
          ) 
        }} 
      />
      <Tabs.Screen 
        name="favorites" 
        options={{ 
          title: 'Favorites', 
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? "heart" : "heart-outline"} 
              size={28} 
              color={focused ? Colors.light.tint : Colors.light.icon}
            />
          ) 
        }} 
      />
      <Tabs.Screen 
        name="profile/index" 
        options={{ 
          title: 'Profile', 
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? "person" : "person-outline"} 
              size={28} 
              color={focused ? Colors.light.tint : Colors.light.icon}
            />
          ) 
        }} 
      />
      <Tabs.Screen name="profile/[id]" options={{ href: null, title: "My Profile" }} />
    </Tabs>
  );
}
