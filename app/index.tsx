import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomePage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/Cooking Ina.png')}
        resizeMode="contain"
        style={styles.logo}
      />
      <TouchableOpacity style={styles.button} onPress={() => router.push("/Signup")}>
        <Text style={styles.buttonText}>Start Cooking</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 450,
    height: 450,
    marginBottom: 80,
  },
  button: {
    backgroundColor: '#CF520E',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    width: '80%',
    alignItems: 'center',
    // Mobile shadows
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    // Web shadow
    boxShadow: Platform.OS === 'web' ? '0px 2px 5px rgba(0,0,0,0.2)' : undefined,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
