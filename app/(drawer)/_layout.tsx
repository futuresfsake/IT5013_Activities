import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import ProfileScreen from "./Profile_Screen";
import ProfileForm from "./ProfileForm";
import Settings from "./Settings";
import Playlists from "./Playlist";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Custom Drawer Menu
function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView
      {...props}
      style={{
        backgroundColor: "#121212",
        ...(Platform.OS === "web" ? { boxShadow: "2px 0px 5px rgba(0,0,0,0.2)" } : {}),
      }}
    >
      <DrawerItem
        label="Profile"
        labelStyle={{ color: "white" }}
        icon={({ size }) => <Ionicons name="person-circle-outline" size={size} color="#1DB954" />}
        onPress={() => props.navigation.navigate("ProfileScreen")}
      />
      <DrawerItem
        label="Settings"
        labelStyle={{ color: "white" }}
        icon={({ size }) => <Ionicons name="settings-outline" size={size} color="#1DB954" />}
        onPress={() => props.navigation.navigate("Settings")}
      />
      <DrawerItem
        label="Playlists"
        labelStyle={{ color: "white" }}
        icon={({ size }) => <Ionicons name="musical-notes-outline" size={size} color="#1DB954" />}
        onPress={() => props.navigation.navigate("Playlists")}
      />
    </DrawerContentScrollView>
  );
}

// Drawer Navigator
function DrawerLayout() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: "#121212" },
        headerTintColor: "#fff",
        drawerStyle: {
          backgroundColor: "#121212",
          width: 240,
          ...(Platform.OS === "web" ? { boxShadow: "2px 0px 5px rgba(0,0,0,0.2)" } : {}),
        },
        sceneContainerStyle: { backgroundColor: "#121212" },
        drawerType: "slide",
        overlayColor: "rgba(0,0,0,0.6)",
        drawerHideStatusBarOnOpen: true,
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginLeft: 15 }}>
            <Ionicons name="menu" size={28} color="#fff" />
          </TouchableOpacity>
        ),
      })}
    >
      <Drawer.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: "Profile" }} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Playlists" component={Playlists} />
    </Drawer.Navigator>
  );
}

// Root Stack wrapping Drawer + ProfileForm
export default function RootLayout() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Drawer" component={DrawerLayout} />
      <Stack.Screen name="ProfileForm" component={ProfileForm} />
    </Stack.Navigator>
  );
}
