import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const GENRES = ["Pop", "Rock", "Jazz", "Classical", "Hip-Hop"];

export default function ProfileForm({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [genre, setGenre] = useState(GENRES[0]);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [errors, setErrors] = useState({ username: "", email: "" });

  useEffect(() => {
    (async () => {
      const savedProfiles = await AsyncStorage.getItem("profiles");
      if (savedProfiles) {
        const profiles = JSON.parse(savedProfiles);
        // optional: prefill with the last profile
        const last = profiles[profiles.length - 1];
        if (last) {
          setUsername(last.username);
          setEmail(last.email);
          setGenre(last.genre);
          setImageUri(last.imageUri || null);
        }
      }
    })();
  }, []);

  const validateUsername = (name: string) => /^[\w]{3,20}$/.test(name);
  const validateEmail = (mail: string) => /\S+@\S+\.\S+/.test(mail);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!username || !email || errors.username || errors.email) {
      alert("Please fix errors before submitting");
      return;
    }

    const savedProfiles = await AsyncStorage.getItem("profiles");
    let profiles = savedProfiles ? JSON.parse(savedProfiles) : [];

    profiles.push({ username, email, genre, imageUri });
    await AsyncStorage.setItem("profiles", JSON.stringify(profiles));

    alert("Profile added successfully!");
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Profile</Text>

      {/* Profile Picture */}
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={{
            uri: imageUri || `https://via.placeholder.com/120?text=${genre}`,
          }}
          style={styles.avatar}
        />
        <Text style={styles.changePhotoText}>Change Profile Picture</Text>
      </TouchableOpacity>

      {/* Username */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          placeholder="Enter username"
          placeholderTextColor="#bbb"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            setErrors((prev) => ({
              ...prev,
              username: validateUsername(text)
                ? ""
                : "3–20 characters, letters/numbers/_ only",
            }));
          }}
          style={[styles.input, errors.username ? { borderColor: "red" } : {}]}
        />
        {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
      </View>

      {/* Email */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Enter email"
          placeholderTextColor="#bbb"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrors((prev) => ({
              ...prev,
              email: validateEmail(text) ? "" : "Enter a valid email address",
            }));
          }}
          keyboardType="email-address"
          style={[styles.input, errors.email ? { borderColor: "red" } : {}]}
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
      </View>

      {/* Genre */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Favorite Genre</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {GENRES.map((g) => (
            <TouchableOpacity
              key={g}
              style={[
                styles.genreButton,
                genre === g ? styles.genreButtonSelected : {},
              ]}
              onPress={() => setGenre(g)}
            >
              <Text
                style={[
                  styles.genreButtonText,
                  genre === g ? styles.genreButtonTextSelected : {},
                ]}
              >
                {g}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Add Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#121212", padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 10,
  },
  changePhotoText: { color: "#1DB954", textAlign: "center", marginBottom: 20 },
  inputContainer: { marginBottom: 20 },
  label: { color: "#aaa", marginBottom: 6 },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#1DB954",
  },
  errorText: { color: "red", marginTop: 4, fontSize: 12 },
  genreButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#1DB954",
    marginRight: 10,
  },
  genreButtonSelected: { backgroundColor: "#1DB954" },
  genreButtonText: { color: "#fff" },
  genreButtonTextSelected: { color: "#121212", fontWeight: "bold" },
  submitButton: {
    backgroundColor: "#1DB954",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  submitText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
