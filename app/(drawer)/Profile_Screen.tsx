// app/(drawer)/Profile_Screen.tsx
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [genre, setGenre] = useState("Pop");
  const [imageUri, setImageUri] = useState<string | null>(null);

  // Load the last saved profile from AsyncStorage
  useEffect(() => {
    (async () => {
      const savedProfiles = await AsyncStorage.getItem("profiles");
      if (savedProfiles) {
        const profiles = JSON.parse(savedProfiles);
        const lastProfile = profiles[profiles.length - 1];
        if (lastProfile) {
          setUsername(lastProfile.username || "John Doe");
          setEmail(lastProfile.email || "johndoe@example.com");
          setGenre(lastProfile.genre || "Pop");
          setImageUri(lastProfile.imageUri || null);
        }
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={30} color="#fff" />
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* Profile Picture */}
      <Image
        source={{
          uri: imageUri || `https://via.placeholder.com/140?text=${genre}`,
        }}
        style={styles.profilePic}
      />

      {/* User Info */}
      <Text style={styles.name}>{username}</Text>
      <Text style={styles.email}>{email}</Text>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Playlists</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>256</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>180</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      {/* Edit Button */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => router.push("/(drawer)/ProfileForm")}
      >
        <Ionicons name="pencil" size={18} color="#fff" style={{ marginRight: 6 }} />
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    paddingTop: 80,
  },
  header: {
    position: "absolute",
    top: 40,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 8,
  },
  profilePic: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 20,
  },
  name: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },
  email: {
    color: "#bbb",
    fontSize: 15,
    marginBottom: 25,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    marginBottom: 30,
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#aaa",
    fontSize: 13,
    marginTop: 2,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1DB954",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    ...(Platform.OS === "web"
      ? { boxShadow: "0px 6px 10px rgba(29, 185, 84, 0.5)" }
      : {
          shadowColor: "#1DB954",
          shadowOpacity: 0.5,
          shadowRadius: 6,
          elevation: 5,
        }),
  },
  editText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
