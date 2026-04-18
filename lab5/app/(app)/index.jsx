import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Link } from 'expo-router';
import { products } from '../../data/products';
import { useAuth } from '../../context/AuthContext';

export default function Home() {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logout} onPress={logout}>
        <Text style={styles.logoutText}>Вийти</Text>
      </TouchableOpacity>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/details/${item.id}`} asChild>
            <TouchableOpacity style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />

              <Text style={styles.title}>{item.title}</Text>

              <Text style={styles.price}>{item.price}</Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  logout: {
    backgroundColor: 'black',
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 40,
  },

  logoutText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 4,
  },

  image: {
    width: '100%',
    height: 220,
    borderRadius: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },

  price: {
    fontSize: 18,
    marginTop: 5,
  },
});