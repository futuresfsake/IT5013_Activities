// app/(drawer)/Playlist.tsx
import React, { useState, useReducer, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { nanoid } from "nanoid/non-secure"; // for unique song IDs

// --- Initial static playlists ---
const initialPlaylists = [
  {
    id: "1",
    title: "Taylor Swift",
    image:
      "https://www.usmagazine.com/wp-content/uploads/2025/08/taylor-swift-album-2.jpg?w=1000&quality=40&strip=all",
  },
  {
    id: "2",
    title: "Lana Del Rey",
    image: "https://i.scdn.co/image/ab67616d0000b273cb76604d9c5963544cf5be64",
  },
  {
    id: "3",
    title: "Sad Girl Hours",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToySAUn__ylhgs1jvmUzARq_q1dafanN0jmA&s",
  },
];

// --- Reducer for undo/redo ---
type Action =
  | { type: "ADD"; song: { id: string; title: string; image: string } }
  | { type: "REMOVE"; id: string }
  | { type: "CLEAR" }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "LOAD"; payload: typeof initialPlaylists };

type State = {
  past: typeof initialPlaylists[];
  present: typeof initialPlaylists;
  future: typeof initialPlaylists[];
};

const initialState: State = {
  past: [],
  present: initialPlaylists,
  future: [],
};

function reducer(state: State, action: Action): State {
  const { past, present, future } = state;
  switch (action.type) {
    case "ADD":
      return {
        past: [...past, present],
        present: [...present, action.song],
        future: [],
      };
    case "REMOVE":
      return {
        past: [...past, present],
        present: present.filter((s) => s.id !== action.id),
        future: [],
      };
    case "CLEAR":
      return { past: [...past, present], present: [], future: [] };
    case "UNDO":
      if (past.length === 0) return state;
      const previous = past[past.length - 1];
      return { past: past.slice(0, -1), present: previous, future: [present, ...future] };
    case "REDO":
      if (future.length === 0) return state;
      const next = future[0];
      return { past: [...past, present], present: next, future: future.slice(1) };
    case "LOAD":
      return { ...state, present: action.payload };
    default:
      return state;
  }
}

// --- Playlist item component (optimized) ---
const PlaylistItem = React.memo(({ item, onRemove }: any) => (
  <Animated.View entering={FadeIn} exiting={FadeOut}>
    <TouchableOpacity style={styles.playlistItem} activeOpacity={0.8}>
      <Image source={{ uri: item.image }} style={styles.coverImage} />
      <View style={styles.playlistInfo}>
        <Text style={styles.playlistTitle}>{item.title}</Text>
        <Text style={styles.playlistSubtitle}>20 songs</Text>
      </View>
      <TouchableOpacity onPress={() => onRemove(item.id)}>
        <Ionicons name="trash-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  </Animated.View>
));

export default function PlaylistsScreen() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [songName, setSongName] = useState("");

  // --- Persist state ---
  useEffect(() => {
    AsyncStorage.setItem("playlist", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("playlist");
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: "LOAD", payload: parsed.present });
      }
    })();
  }, []);

  // --- Handlers ---
  const handleAdd = () => {
    if (!songName.trim()) return;
    const newSong = {
      id: nanoid(),
      title: songName,
      image: "https://i.imgur.com/0y0y0y0.png", // default image
    };
    dispatch({ type: "ADD", song: newSong });
    setSongName("");
  };

  const handleRemove = (id: string) => dispatch({ type: "REMOVE", id });
  const handleClear = () => dispatch({ type: "CLEAR" });
  const handleUndo = () => dispatch({ type: "UNDO" });
  const handleRedo = () => dispatch({ type: "REDO" });

  return (
    <LinearGradient colors={["#121212", "#1DB954"]} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="musical-notes" size={28} color="#fff" />
        <Text style={styles.headerText}>Playlists</Text>
      </View>

      {/* Input + buttons */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter song name"
          value={songName}
          onChangeText={setSongName}
          placeholderTextColor="#b3b3b3"
          style={styles.input}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.undoRedoButton} onPress={handleUndo}>
          <Text style={styles.addButtonText}>Undo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.undoRedoButton} onPress={handleRedo}>
          <Text style={styles.addButtonText}>Redo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.undoRedoButton} onPress={handleClear}>
          <Text style={styles.addButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {/* Playlist List */}
      <FlatList
        data={state.present}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => <PlaylistItem item={item} onRemove={handleRemove} />}
      />
    </LinearGradient>
  );
}

// --- Styles ---
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
    ...(Platform.OS === "web"
      ? { boxShadow: "0px 3px 5px rgba(0,0,0,0.3)" }
      : {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 5,
        }),
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
  inputContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: "#2a2a2a",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: "#1DB954",
    marginLeft: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  undoRedoButton: {
    backgroundColor: "#1e1e1e",
    padding: 8,
    borderRadius: 8,
    minWidth: 70,
    alignItems: "center",
  },
});
