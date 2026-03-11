import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, StatusBar } from 'react-native';

export default function DetailsScreen({ route }) {
  const { title, description, image } = route.params;

  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden={true} />
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 250 },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  description: { fontSize: 16, lineHeight: 24, color: '#444' },
});