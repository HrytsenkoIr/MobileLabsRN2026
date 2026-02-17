import React from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';
import Footer from '../components/Footer';

const NEWS_DATA = Array.from({ length: 8 }, (_, index) => ({
  id: index,
  title: `Пес Патрон закінчив 1000 магістратуру! #${index + 1}`,
  date: `17.02.2026`,
  text: `Пес Патрон, найрозумніший учень університету, нарешті закінчив його 1000-ну магістратуру!.`,
}));

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionHeader}>Новини</Text>

        {NEWS_DATA.map((item) => (
          <View key={item.id} style={styles.newsCard}>

            <View style={styles.imagePlaceholder}>
              <View style={styles.innerIconMount} />
              <View style={styles.innerIconCircle} />
            </View>

            <View style={styles.newsContent}>
              <Text style={styles.newsTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.newsDate}>{item.date}</Text>
              <Text style={styles.newsText} numberOfLines={2}>{item.text}</Text>
            </View>

          </View>
        ))}
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
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'normal',
    textAlign: 'center',
    marginVertical: 10,
    color: '#000',
  },
  newsCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eaeaea',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  imagePlaceholder: {
    width: 70,
    height: 70,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e8e8e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  innerIconCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    position: 'absolute',
    top: 22,
    left: 22,
  },
  innerIconMount: {
    width: 40,
    height: 20,
    backgroundColor: '#ccc',
    position: 'absolute',
    bottom: 10,
    transform: [{ rotate: '45deg' }],
    opacity: 0.4,
  },
  newsContent: {
    flex: 1,
    justifyContent: 'center',
  },
  newsTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  newsDate: {
    fontSize: 11,
    color: '#999',
    marginBottom: 3,
  },
  newsText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 16,
  },
});