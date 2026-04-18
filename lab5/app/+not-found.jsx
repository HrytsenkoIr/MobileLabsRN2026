import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { router } from 'expo-router';

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Екран не знайдено</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/')}
      >
        <Text style={styles.buttonText}>На головну</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 28,
    marginBottom: 20,
  },

  button: {
    backgroundColor: 'black',
    padding: 16,
    borderRadius: 10,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});