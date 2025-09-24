// app/(drawer)/Settings.tsx
import React, { useState } from "react";
import { StyleSheet, Text, View, Switch, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? "#121212" : "#fff" }]}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="settings" size={28} color="#1DB954" />
        <Text style={[styles.headerTitle, { color: isDarkMode ? "#fff" : "#121212" }]}>
          Settings
        </Text>
      </View>

      {/* Dark Mode Toggle */}
      <View style={[styles.settingRow, { backgroundColor: isDarkMode ? "#1e1e1e" : "#eee" }]}>
        <Text style={[styles.settingText, { color: isDarkMode ? "#fff" : "#121212" }]}>
          Dark Mode
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
          thumbColor={isDarkMode ? "#1DB954" : "#aaa"}
          trackColor={{ false: "#555", true: "#1DB954" }}
        />
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => router.replace("/LandingPage")}
      >
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  settingText: {
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: "#1DB954",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    ...(Platform.OS === "web"
      ? { boxShadow: "0px 6px 10px rgba(29, 185, 84, 0.5)" }
      : { shadowColor: "#1DB954", shadowOpacity: 0.5, shadowRadius: 6, elevation: 5 }),
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
