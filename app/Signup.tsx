import React, { useState } from "react";
import { router } from "expo-router";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";

export default function SpotifySignUpScreen() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState({ day: "", month: "", year: "" });
  const [gender, setGender] = useState("");

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={{
          uri: "https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png",
        }}
        style={styles.logo}
      />
      <Text style={styles.title}>Spotify</Text>

      {/* Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#aaa"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Date of Birth */}
      <Text style={styles.label}>Date Of Birth :</Text>
      <View style={styles.dobRow}>
        <TextInput
          style={styles.dobInput}
          placeholder="DD"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={dob.day}
          onChangeText={(day) => setDob({ ...dob, day })}
        />
        <TextInput
          style={styles.dobInput}
          placeholder="MM"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={dob.month}
          onChangeText={(month) => setDob({ ...dob, month })}
        />
        <TextInput
          style={styles.dobInput}
          placeholder="YY"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={dob.year}
          onChangeText={(year) => setDob({ ...dob, year })}
        />
      </View>

      {/* Gender Selection */}
      <View style={styles.genderRow}>
        <TouchableOpacity onPress={() => setGender("Male")}>
          <Text style={[styles.genderText, gender === "Male" && styles.selected]}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setGender("Female")}>
          <Text style={[styles.genderText, gender === "Female" && styles.selected]}>Female</Text>
        </TouchableOpacity>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton} onPress={() => router.replace("/LandingPage")}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Divider */}
      <Text style={styles.orText}>Sign Up With</Text>
      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialText}>f</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialText}>G</Text>
        </TouchableOpacity>
      </View>

      {/* Sign In Link */}
      <View style={styles.signInRow}>
        <Text style={styles.signInText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/LandingPage")}>
          <Text style={styles.signInLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#fff",
    fontSize: 16,
    marginBottom: 14,
  },
  label: {
    color: "#1DB954",
    fontSize: 14,
    fontWeight: "600",
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  dobRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
    width: "100%",
  },
  dobInput: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: "#fff",
    fontSize: 16,
    marginHorizontal: 4,
    textAlign: "center",
  },
  genderRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: 20,
  },
  genderText: {
    fontSize: 16,
    color: "#aaa",
    fontWeight: "600",
  },
  selected: {
    color: "#1DB954",
  },
  signUpButton: {
    backgroundColor: "#1DB954",
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 60,
    marginBottom: 20,
  },
  signUpText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  orText: {
    color: "#1DB954",
    fontSize: 12,
    marginBottom: 10,
  },
  socialRow: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 30,
  },
  socialButton: {
    backgroundColor: "#1e1e1e",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  socialText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  signInRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  signInText: {
    color: "#aaa",
    fontSize: 13,
  },
  signInLink: {
    color: "#1DB954",
    fontSize: 13,
    fontWeight: "600",
  },
});
