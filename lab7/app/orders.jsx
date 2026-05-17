import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";

import { useSelector } from "react-redux";

export default function OrdersScreen() {
  const orders = useSelector(
    (state) => state.orders.orders
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>
              Дата: {item.date}
            </Text>

            <Text>
              Сума: {item.total} грн
            </Text>

            {item.items.map((product) => (
              <Text key={product.id}>
                {product.title} x{" "}
                {product.quantity}
              </Text>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },

  card: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 15,
  },
});