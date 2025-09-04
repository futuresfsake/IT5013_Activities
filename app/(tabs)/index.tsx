import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function WelcomePage() {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/Cooking Ina.png')}
        style={styles.logo}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log('Continue pressed')}
      >
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
    resizeMode: 'contain',
    marginBottom: 80, // push button lower
  },
  button: {
    backgroundColor: '#CF520E', // pastel yellow
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000', // optional: soft shadow
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#000', // dark text for contrast
    fontSize: 18,
    fontWeight: 'bold',
  },
});
