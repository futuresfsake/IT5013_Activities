import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function TabTwoScreen() {
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header Section */}
        <View style={styles.titleContainer}>
          <ThemedText type="title">Explore Recipes</ThemedText>
        </View>
        <ThemedText style={styles.subtitle}>
          Browse tasty recipes, learn new skills, and start cooking today!
        </ThemedText>

        {/* Image Buttons Section */}
        <View style={styles.grid}>
          {/* Savory Meals */}
          <TouchableOpacity style={styles.card} onPress={() => console.log('Savory Meals pressed')}>
            <Image
              source={require('@/assets/images/savory.png')}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Savory Meals</Text>
          </TouchableOpacity>

          {/* Desserts */}
          <TouchableOpacity style={styles.card} onPress={() => console.log('Desserts pressed')}>
            <Image
              source={require('@/assets/images/desserts.png')}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Pinoy Desserts</Text>
          </TouchableOpacity>

          {/* Drinks */}
          <TouchableOpacity style={styles.card} onPress={() => console.log('Drinks pressed')}>
            <Image
              source={require('@/assets/images/drinks.png')}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Drinks</Text>
          </TouchableOpacity>

          {/* Snacks & Streetfoods */}
          <TouchableOpacity style={styles.card} onPress={() => console.log('Snacks pressed')}>
            <Image
              source={require('@/assets/images/snaks.png')}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Snacks & Streetfoods</Text>
          </TouchableOpacity>

          {/* Filipino Breakfast */}
          <TouchableOpacity style={styles.card} onPress={() => console.log('Breakfast pressed')}>
            <Image
              source={require('@/assets/images/FilBreakFast.png')}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Filipino Breakfasts</Text>
          </TouchableOpacity>

          {/* Healthy Choices */}
          <TouchableOpacity style={styles.card} onPress={() => console.log('Healthy pressed')}>
            <Image
              source={require('@/assets/images/streetfood.png')}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Healthy Choices</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff', // ✅ forced white background for the whole screen
  },
  container: {
    padding: 20,
  },
  titleContainer: {
      marginTop: 100,
    marginBottom: 10,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#555',
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // 2 per row
  },
  card: {
    width: '45%', // two per row
    alignItems: 'center',
    marginBottom: 25,
  },
  cardImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 16,
  },
  cardText: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
});
