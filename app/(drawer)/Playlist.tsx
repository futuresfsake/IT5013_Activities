import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const playlists = [
  {
    id: "1",
    title: "Taylor Swift",
    image: "https://www.usmagazine.com/wp-content/uploads/2025/08/taylor-swift-album-2.jpg?w=1000&quality=40&strip=all",
  },
  {
    id: "2",
    title: "Lana Del Rey",
    image: "https://i.scdn.co/image/ab67616d0000b273cb76604d9c5963544cf5be64",
  },
  {
    id: "3",
    title: "Sad Girl Hours",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToySAUn__ylhgs1jvmUzARq_q1dafanN0jmA&s",
  },
  {
    id: "4",
    title: "Random",
    image: "https://i.pinimg.com/236x/8d/a4/9a/8da49a25c6126e44e28e4b16f3891afc.jpg",
  },
];

export default function PlaylistsScreen() {
  return (
    <LinearGradient colors={["#121212", "#1DB954"]} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="musical-notes" size={28} color="#fff" />
        <Text style={styles.headerText}>Playlists</Text>
      </View>

      {/* Playlist List */}
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.playlistItem} activeOpacity={0.8}>
            <Image source={{ uri: item.image }} style={styles.coverImage} />
            <View style={styles.playlistInfo}>
              <Text style={styles.playlistTitle}>{item.title}</Text>
              <Text style={styles.playlistSubtitle}>20 songs</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#fff" />
          </TouchableOpacity>
        )}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  headerText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 12,
  },
  playlistItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  coverImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },
  playlistInfo: {
    flex: 1,
    marginLeft: 15,
  },
  playlistTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  playlistSubtitle: {
    color: "#b3b3b3",
    fontSize: 14,
  },
});
