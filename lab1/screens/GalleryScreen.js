import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions, StatusBar } from 'react-native';
import Footer from '../components/Footer';

const { width } = Dimensions.get('window');
const cardWidth = (width - 45) / 2;

export default function GalleryScreen() {
  const blocks = Array.from({ length: 10 });

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.grid}>
          {blocks.map((_, index) => (
            <View key={index} style={styles.photoBlock} />
          ))}
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  photoBlock: {
    width: cardWidth,
    height: cardWidth * 1.2,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
});