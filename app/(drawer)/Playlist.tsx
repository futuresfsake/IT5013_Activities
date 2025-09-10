import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const playlists = [
  {
    id: "1",
    title: "9INE/NONE",
    image:
      "https://static.wikia.nocookie.net/twicenation/images/4/4d/THIS_IS_FOR_-_Digital_Cover.jpg/revision/latest/scale-to-width-down/1000?cb=20250520162612",
  },
  {
    id: "2",
    title: "OSCS",
    image:
      "https://i.pinimg.com/736x/7c/49/07/7c4907757f675f5a9af7f73efb1aba60.jpg",
  },
  {
    id: "3",
    title: "CRASH",
    image:
      "https://i.pinimg.com/736x/ea/5f/65/ea5f65226903ddf52f54bdf6814d3fba.jpg",
  },
  {
    id: "4",
    title: "MIXnMATCH",
    image:
      "https://i.pinimg.com/736x/a4/75/de/a475de8ae14e15170d2a7e37557fae13.jpg",
  },
];

export default function PlaylistsScreen() {
  return (
    <LinearGradient
      colors={["#1DB954", "#121212"]}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="musical-notes" size={30} color="#fff" />
          <Text style={styles.headerText}>Your Playlists</Text>
        </View>

        {/* Playlist List */}
        <FlatList
          data={playlists}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.playlistCard}>
              <Image source={{ uri: item.image }} style={styles.coverImage} />
              <View style={styles.textContainer}>
                <Text style={styles.playlistTitle}>{item.title}</Text>
                <Text style={styles.playlistSubtitle}>Playlist • 20 songs</Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color="#aaa" />
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  headerText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginLeft: 12,
  },
  playlistCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  coverImage: {
    width: 65,
    height: 65,
    borderRadius: 8,
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  playlistTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  playlistSubtitle: {
    color: "#bbb",
    fontSize: 14,
    marginTop: 2,
  },
});
