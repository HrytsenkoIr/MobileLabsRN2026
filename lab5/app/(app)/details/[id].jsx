import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

import { useLocalSearchParams } from 'expo-router';
import { products } from '../../../data/products';

export default function Details() {
  const { id } = useLocalSearchParams();

  const product = products.find((item) => item.id === id);

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <Text style={styles.title}>{product.title}</Text>

      <Text style={styles.price}>{product.price}</Text>

      <Text style={styles.description}>
        {product.description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },

  image: {
    width: '100%',
    height: 300,
    borderRadius: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
  },

  price: {
    fontSize: 24,
    marginTop: 10,
  },

  description: {
    fontSize: 18,
    marginTop: 20,
  },
});