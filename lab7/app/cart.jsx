import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
} from "react-native";

import { useSelector } from "react-redux";

import CartItem from "../components/CartItem";

import { router } from "expo-router";

export default function CartScreen() {
  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (
          <CartItem item={item} />
        )}
      />

      <Text style={styles.total}>
        Загальна сума: {total} грн
      </Text>

      <Button
        title="Оформити замовлення"
        onPress={() =>
          router.push("/checkout")
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },

  total: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 15,
  },
});