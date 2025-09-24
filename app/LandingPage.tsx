import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

export default function WelcomePage() {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <TouchableOpacity>
        <Image
          source={require("@/assets/images/logoSpotify.png")}
          resizeMode="contain"
          style={styles.logo}
        />
      </TouchableOpacity>

      {/* Spotify Text */}
      <TouchableOpacity>
        <Text style={styles.spotifyText}>Spotify</Text>
      </TouchableOpacity>

      {/* Inputs */}
      <TextInput placeholder="Username" placeholderTextColor="#aaa" style={styles.input} />
      <TextInput placeholder="Password" placeholderTextColor="#aaa" secureTextEntry style={styles.input} />

      {/* Forgot Password */}
      <TouchableOpacity style={styles.forgotContainer}>
        <Text style={styles.forgotText}>Forgot password?</Text>
      </TouchableOpacity>

      {/* Sign In */}
      <TouchableOpacity style={styles.signInButton} onPress={() => router.replace("/(drawer)/Playlist")}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      {/* Social Section */}
      <Text style={styles.correctText}>Be Connected with</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Sign Up */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => router.replace("/Signup")}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black", justifyContent: "center", alignItems: "center", paddingHorizontal: 20 },
  logo: { width: 200, height: 200, marginBottom: 5 },
  spotifyText: { color: "white", fontSize: 48, fontWeight: "bold", marginBottom: 25 },
  input: { width: "100%", backgroundColor: "#1a1a1a", borderRadius: 25, paddingHorizontal: 20, paddingVertical: 15, color: "white", fontSize: 16, marginBottom: 15 },
  forgotContainer: { width: "100%", alignItems: "flex-end", marginBottom: 20 },
  forgotText: { color: "gray", fontSize: 14 },
  signInButton: { backgroundColor: "#1DB954", paddingVertical: 15, borderRadius: 30, width: "100%", alignItems: "center", marginBottom: 20, boxShadow: "0px 2px 5px rgba(0,0,0,0.2)" },
  signInText: { color: "white", fontSize: 18, fontWeight: "bold" },
  correctText: { color: "#1DB954", fontSize: 16, marginBottom: 15 },
  socialContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 20, marginBottom: 25 },
  socialButton: { backgroundColor: "black", width: 50, height: 50, borderRadius: 25, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#1DB954" },
  signupContainer: { flexDirection: "row", alignItems: "center" },
  signupText: { color: "white", fontSize: 14 },
  signupLink: { color: "#1DB954", fontSize: 14, fontWeight: "bold" },
});
