import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
} from "react-native";

import { useDispatch } from "react-redux";

import { addToCart } from "../redux/slices/cartSlice";

export default function ProductCard({ item }) {
  const dispatch = useDispatch();

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
      />

      <Text style={styles.title}>
        {item.title}
      </Text>

      <Text>
        {item.description}
      </Text>

      <Text>
        {item.price} грн
      </Text>

      <Button
        title="Додати до кошика"
        onPress={() =>
          dispatch(addToCart(item))
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },

  image: {
    width: "100%",
    height: 200,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});